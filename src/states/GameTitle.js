class GameTitle extends Phaser.State {

	create() {
		//Set the games background colour
		this.game.stage.backgroundColor = '#000000';

		this.game.debug.text('Adventure Awaits!', 250, 290);
		let skeletonSprite = this.game.add.sprite(450, 290, 'skeleton');
		skeletonSprite.anchor.setTo(0.5, 0.5);

        let button;
        let text;
        button = this.game.add.button(300, 400, this.game.cache.getBitmapData('button'),
        	function start() {
        		this.startGame();
        	}, this);
        text = this.game.add.text(40, 10, "Start Game", {font: "24px Arial Black"});
        button.addChild(text);
        button.input.useHandCursor = true;

	}

	startGame() {
		this.game.state.start("Main");
	}

}

export default GameTitle;
