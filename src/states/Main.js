// Imports
import Player from 'objects/Player';

class Main extends Phaser.State {

	create() {

		// Instantiate player
		let player = new Player(this.game);
		// Create state
		let state = this;

        this.background = this.game.add.group();
        // setup each of our background layers to take the full screen
        ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
            .forEach(function(image) {
                var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                    state.game.world.height, image, '', state.background);
                bg.tileScale.setTo(4,4);
            });

        this.upgradePanel = this.game.add.image(10, 70, this.game.cache.getBitmapData('upgradePanel'));
        var upgradeButtons = this.upgradePanel.addChild(this.game.add.group());
        upgradeButtons.position.setTo(8, 8);

        var upgradeButtonsData = [
            {icon: 'dagger', name: 'Attack', level: 0, cost: 5, purchaseHandler: function(button, player) {
                player.clickDmg += 1;
            }},
        ];

        var button;
        upgradeButtonsData.forEach(function(buttonData, index) {
            button = state.game.add.button(0, (50 * index), state.game.cache.getBitmapData('button'));
            button.icon = button.addChild(state.game.add.image(6, 6, buttonData.icon));
            button.text = button.addChild(state.game.add.text(42, 6, buttonData.name + ': ' + buttonData.level, {font: '16px Arial Black'}));
            button.details = buttonData;
            button.costText = button.addChild(state.game.add.text(42, 24, 'Cost: ' + buttonData.cost, {font: '16px Arial Black'}));
            button.events.onInputDown.add(state.onUpgradeButtonClick, state);

            upgradeButtons.addChild(button);
        });

        var monsterData = [
            {name: 'Aerocephal',        image: 'aerocephal',        maxHealth: 10},
            {name: 'Arcana Drake',      image: 'arcana_drake',      maxHealth: 20},
            {name: 'Aurum Drakueli',    image: 'aurum-drakueli',    maxHealth: 30},
            {name: 'Bat',               image: 'bat',               maxHealth: 5},
            {name: 'Daemarbora',        image: 'daemarbora',        maxHealth: 10},
            {name: 'Deceleon',          image: 'deceleon',          maxHealth: 10},
            {name: 'Demonic Essence',   image: 'demonic_essence',   maxHealth: 15},
            {name: 'Dune Crawler',      image: 'dune_crawler',      maxHealth: 8},
            {name: 'Green Slime',       image: 'green_slime',       maxHealth: 3},
            {name: 'Nagaruda',          image: 'nagaruda',          maxHealth: 13},
            {name: 'Rat',               image: 'rat',               maxHealth: 2},
            {name: 'Scorpion',          image: 'scorpion',          maxHealth: 2},
            {name: 'Skeleton',          image: 'skeleton',          maxHealth: 6},
            {name: 'Snake',             image: 'snake',             maxHealth: 4},
            {name: 'Spider',            image: 'spider',            maxHealth: 4},
            {name: 'Stygian Lizard',    image: 'stygian_lizard',    maxHealth: 20}
        ];
        this.monsters = this.game.add.group();

        var monster;
        monsterData.forEach(function(data) {
            // create a sprite for them off screen
            monster = state.monsters.create(1000, state.game.world.centerY, data.image);
            // use the built in health component
            monster.health = monster.maxHealth = data.maxHealth;
            // center anchor
            monster.anchor.setTo(0.5, 1);
            // reference to the database
            monster.details = data;

            //enable input so we can click it!
            monster.inputEnabled = true;
            monster.events.onInputDown.add(state.onClickMonster, state, player);

            // hook into health and lifecycle events
            monster.events.onKilled.add(state.onKilledMonster, state);
            monster.events.onRevived.add(state.onRevivedMonster, state);
        });

        // display the monster front and center
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY + 50);

        this.monsterInfoUI = this.game.add.group();
        this.monsterInfoUI.position.setTo(this.currentMonster.x - 220, this.currentMonster.y + 120);
        this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name, {
            font: '48px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
        this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 80, this.currentMonster.health + ' HP', {
            font: '32px Arial Black',
            fill: '#ff0000',
            strokeThickness: 4
        }));

        this.dmgTextPool = this.add.group();
        var dmgText;
        for (var d=0; d<50; d++) {
            dmgText = this.add.text(0, 0, '1', {
                font: '64px Arial Black',
                fill: '#fff',
                strokeThickness: 4
            });
            // start out not existing, so we don't draw it yet
            dmgText.exists = false;
            dmgText.tween = this.game.add.tween(dmgText)
                .to({
                    alpha: 0,
                    y: 100,
                    x: this.game.rnd.integerInRange(100, 700)
                }, 1000, Phaser.Easing.Cubic.Out);

            dmgText.tween.onComplete.add(function(text, tween) {
                text.kill();
            });
            this.dmgTextPool.add(dmgText);
        }

        // create a pool of gold coins
        this.coins = this.add.group();
        this.coins.createMultiple(50, 'gold_coin', '', false);
        this.coins.setAll('inputEnabled', true);
        this.coins.setAll('goldValue', 1);
        this.coins.callAll('events.onInputDown.add', 'events.onInputDown', this.onClickCoin, this);

        this.playerGoldText = this.add.text(30, 30, 'Gold: ' + player.gold, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        });

        // setup the world progression display
        this.levelUI = this.game.add.group();
        this.levelUI.position.setTo(this.game.world.centerX, 30);
        this.levelText = this.levelUI.addChild(this.game.add.text(0, 0, 'Level: ' + this.level, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
        this.levelKillsText = this.levelUI.addChild(this.game.add.text(0, 30, 'Kills: ' + this.levelKills + '/' + this.levelKillsRequired, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
    }

    onUpgradeButtonClick(button, pointer) {
        // make this a function so that it updates after we buy
        function getAdjustedCost() {
            return Math.ceil(button.details.cost + (button.details.level * 1.46));
        }

        if (player.gold - getAdjustedCost() >= 0) {
            player.gold -= getAdjustedCost();
            playerGoldText.text = 'Gold: ' + player.gold;
            button.details.level++;
            button.text.text = button.details.name + ': ' + button.details.level;
            button.costText.text = 'Cost: ' + getAdjustedCost();
            button.details.purchaseHandler.call(this, button, player);
        }
    }

    onClickCoin(coin) {
        if (!coin.alive) {
            return;
        }
        // give the player gold
        //player.gold += coin.goldValue;
        // update UI
        this.playerGoldText.text = 'Gold: ' + 1;
        // remove the coin
        coin.kill();
    }

    onKilledMonster(monster) {
        // move the monster off screen again
        monster.position.set(1000, this.game.world.centerY);

        var coin;
        // spawn a coin on the ground
        coin = this.coins.getFirstExists(false);
        coin.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 100), this.game.world.centerY);
        coin.goldValue = Math.round(this.level * 1.33);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.onClickCoin, this, coin);

        this.levelKills++;

        if (this.levelKills >= this.levelKillsRequired) {
            this.level++;
            this.levelKills = 0;
        }

        this.levelText.text = 'Level: ' + this.level;
        this.levelKillsText.text = 'Kills: ' + this.levelKills + '/' + this.levelKillsRequired;

        // pick a new monster
        this.currentMonster = this.monsters.getRandom();
        // upgrade the monster based on level
        this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + ((this.level - 1) * 10.6));
        // make sure they are fully healed
        this.currentMonster.revive(this.currentMonster.maxHealth);
    }

    onRevivedMonster(monster) {
        monster.position.set(this.game.world.centerX + 100, this.game.world.centerY + 50);
        // update the text display
        this.monsterNameText.text = monster.details.name;
        this.monsterHealthText.text = monster.health + 'HP';
    }

    onClickMonster(monster, pointer) {
        // apply click damage to monster
        this.currentMonster.damage(1);

        // grab a damage text from the pool to display what happened
        var dmgText = this.dmgTextPool.getFirstExists(false);
        if (dmgText) {
            dmgText.text = 1;
            dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
            dmgText.alpha = 1;
            dmgText.tween.start();
        }

        // update the health text
        this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + ' HP' : 'DEAD';
    }
}

export default Main;