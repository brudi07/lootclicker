// Imports
import Player from 'objects/Player';

class Main extends Phaser.State {

	create() {

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Set the games background colour
		this.game.stage.backgroundColor = '#000000';

		//Instantiate player object
		let player = new Player(this.game);

		this.game.debug.text('Adventure Awaits ' + player.name + '!', 250, 290);
	}

}

export default Main;
