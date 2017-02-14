// Imports
import Player from 'objects/Player';

class Main extends Phaser.State {

	// Constructor to initialize our objects
	constructor() {
		super();
		// the main player
        this.player = {
            clickDmg: 1,
            gold: 50,
        }
        // the world stats
        this.area = {
        	level: 1,
        	levelKills: 0,
        	levelKillsRequired: 10
        }
	}

	create() {
		// Create state
		let state = this;
		// Create the background
        this.background = this.game.add.group();
        // setup each of our background layers to take the full screen
        ['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
            .forEach(function(image) {
                var bg = state.game.add.tileSprite(0, 0, state.game.world.width,
                    state.game.world.height, image, '', state.background);
                bg.tileScale.setTo(4,4);
            });

         // Create the upgrade panel
        this.upgradePanel = this.game.add.image(10, 70, this.game.cache.getBitmapData('upgradePanel'));
        var upgradeButtons = this.upgradePanel.addChild(this.game.add.group());
        upgradeButtons.position.setTo(8, 8);
        // Upgrade Button
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

        // Monster data
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

        // Load monster
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
            monster.events.onInputDown.add(state.onClickMonster, state);

            // hook into health and lifecycle events
            monster.events.onKilled.add(state.onKilledMonster, state);
            monster.events.onRevived.add(state.onRevivedMonster, state);
        });

        // Display the monster front and center
        this.currentMonster = this.monsters.getRandom();
        this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY + 50);

        this.monsterInfoUI = this.game.add.group();
        this.monsterInfoUI.position.setTo(this.currentMonster.x - 80, this.currentMonster.y + 20);
        this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
        this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 40, this.currentMonster.health + ' HP', {
            font: '20px Arial Black',
            fill: '#ff0000',
            strokeThickness: 4
        }));

        // Damage numbers
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

        // Create a pool of gold coins
        this.coins = this.add.group();
        this.coins.createMultiple(50, 'gold_coin', '', false);
        this.coins.setAll('inputEnabled', true);
        this.coins.callAll('events.onInputDown.add', 'events.onInputDown', this.onClickCoin, this);

        this.playerGoldText = this.add.text(30, 30, 'Gold: ' + this.player.gold, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        });

        // Setup the world progression display
        this.levelUI = this.game.add.group();
        this.levelUI.position.setTo(this.game.world.centerX, 30);
        this.levelText = this.levelUI.addChild(this.game.add.text(0, 0, 'Level: ' + this.area.level, {
            font: '24px Arial Black',
            fill: '#fff',
            strokeThickness: 4
        }));
        this.levelKillsText = this.levelUI.addChild(this.game.add.text(0, 30, 'Kills: ' + this.area.levelKills + '/' + this.area.levelKillsRequired, {
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

        if (this.player.gold - getAdjustedCost() >= 0) {
            this.player.gold -= getAdjustedCost();
            this.playerGoldText.text = 'Gold: ' + this.player.gold;
            button.details.level++;
            button.text.text = button.details.name + ': ' + button.details.level;
            button.costText.text = 'Cost: ' + getAdjustedCost();
            button.details.purchaseHandler.call(this, button, this.player);
        }
    }

    onClickCoin(coin) {
        if (!coin.alive) {
            return;
        }
        // set gold value
        let goldValue = 1 * this.area.level;
        // give the player gold
        this.player.gold += goldValue;
        // update UI
        this.playerGoldText.text = 'Gold: ' + this.player.gold;
        // remove the coin
        coin.kill();
    }

    onKilledMonster(monster) {

        // move the monster off screen again
        monster.position.set(1000, this.game.world.centerY);

        let coin;
        // spawn a coin on the ground
        coin = this.coins.getFirstExists(false);
        coin.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 100), this.game.world.centerY);
        coin.goldValue = Math.round(this.world.level * 1.33);
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.onClickCoin, this, coin);

        this.area.levelKills++;

        if (this.area.levelKills >= this.area.levelKillsRequired) {
            this.area.level++;
            this.area.levelKills = 0;
        }

        this.levelText.text = 'Level: ' + this.area.level;
        this.levelKillsText.text = 'Kills: ' + this.area.levelKills + '/' + this.area.levelKillsRequired;

        // pick a new monster
        this.currentMonster = this.monsters.getRandom();
        // upgrade the monster based on level
        this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + ((this.area.level - 1) * 10.6));
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
        this.currentMonster.damage(this.player.clickDmg);

        // grab a damage text from the pool to display what happened
        let dmgText = this.dmgTextPool.getFirstExists(false);
        if (dmgText) {
            dmgText.text = this.player.clickDmg;
            dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
            dmgText.alpha = 1;
            dmgText.tween.start();
        }

        // update the health text
        this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + ' HP' : 'DEAD';
    }
}

export default Main;