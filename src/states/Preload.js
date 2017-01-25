class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		// Examples
		//this.game.load.image('myImage', 'assets/my-image.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');

		// Levels
		this.game.load.image('forest-back', 'assets/levels/forest/layers/parallax-forest-back-trees.png');
        this.game.load.image('forest-lights', 'assets/levels/forest/layers/parallax-forest-lights.png');
        this.game.load.image('forest-middle', 'assets/levels/forest/layers/parallax-forest-middle-trees.png');
        this.game.load.image('forest-front', 'assets/levels/forest/layers/parallax-forest-front-trees.png');

        // Enemies
		this.game.load.image('aerocephal', 'assets/sprites/aerocephal.png');
	    this.game.load.image('arcana_drake', 'assets/sprites/arcana_drake.png');
	    this.game.load.image('aurum-drakueli', 'assets/sprites/aurum-drakueli.png');
	    this.game.load.image('bat', 'assets/sprites/bat.png');
	    this.game.load.image('daemarbora', 'assets/sprites/daemarbora.png');
	    this.game.load.image('deceleon', 'assets/sprites/deceleon.png');
	    this.game.load.image('demonic_essence', 'assets/sprites/demonic_essence.png');
	    this.game.load.image('dune_crawler', 'assets/sprites/dune_crawler.png');
	    this.game.load.image('green_slime', 'assets/sprites/green_slime.png');
	    this.game.load.image('nagaruda', 'assets/sprites/nagaruda.png');
	    this.game.load.image('rat', 'assets/sprites/rat.png');
	    this.game.load.image('scorpion', 'assets/sprites/scorpion.png');
	    this.game.load.image('skeleton', 'assets/sprites/skeleton.png');
	    this.game.load.image('snake', 'assets/sprites/snake.png');
	    this.game.load.image('spider', 'assets/sprites/spider.png');
	    this.game.load.image('stygian_lizard', 'assets/sprites/stygian_lizard.png');

	    // Icons
	    this.game.load.image('gold_coin', 'assets/icons/I_GoldCoin.png');
        this.game.load.image('dagger', 'assets/icons/W_Dagger002.png');
        this.game.load.image('swordIcon1', 'assets/icons/S_Sword15.png');

        // Panel
        var bmd = this.game.add.bitmapData(250, 500);
        bmd.ctx.fillStyle = '#9a783d';
        bmd.ctx.strokeStyle = '#35371c';
        bmd.ctx.lineWidth = 12;
        bmd.ctx.fillRect(0, 0, 250, 500);
        bmd.ctx.strokeRect(0, 0, 250, 500);
        this.game.cache.addBitmapData('upgradePanel', bmd);

        // Button
        var buttonImage = this.game.add.bitmapData(476, 48);
        buttonImage.ctx.fillStyle = '#e6dec7';
        buttonImage.ctx.strokeStyle = '#35371c';
        buttonImage.ctx.lineWidth = 4;
        buttonImage.ctx.fillRect(0, 0, 225, 48);
        buttonImage.ctx.strokeRect(0, 0, 225, 48);
        this.game.cache.addBitmapData('button', buttonImage);

        // world progression
        this.level = 1;
        // how many monsters have we killed during this level
        this.levelKills = 0;
        // how many monsters are required to advance a level
        this.levelKillsRequired = 10;
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("Main");
	}

}

export default Preload;
