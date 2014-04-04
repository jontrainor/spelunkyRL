function Player(opts) {
	this._instanceInit = function(opts) {};

	this._instanceAct = function(){
		console.log('player act');
		Game.engine.lock();
		window.addEventListener("keydown", this);
	};

	this._checkBox = function() {
		var key = this._x + "," + this._y;
		if(Game.map[key] != "*") {
			alert("There is no box here");
		} else if(key == Game.ananas) {
			alert("You found the ananas!");
			Game.engine.lock();
			window.removeEventListener("keydown", this);
		} else {
			alert("This box is empty");
		}
	};

	this.name = 'Trainor the Great';

	this.symbol = '@';

	this.fgColor = '#FF0';

	this.hp = 4;

	this.init(opts);
}

Player.prototype = new Character();

Player.prototype.handleEvent = function(e) {
	var keyMap = {
		38: 0,
		33: 1,
		39: 2,
		34: 3,
		40: 4,
		35: 5,
		37: 6,
		36: 7
	};

	var code = e.keyCode;

	//spacebar or enter
	if(code == 13 || code == 32) {
		this._checkBox();
		return;
	}

	if(!(code in keyMap)) { return; }

	var diff = ROT.DIRS[8][keyMap[code]];
	var newX = this._x + diff[0];
	var newY = this._y + diff[1];
	var newKey = newX + "," + newY;

	if(!(newKey in Game.map)) { return; }

	Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
	this._x = newX;
	this._y = newY;
	this._draw();
	window.removeEventListener("keydown", this);
	Game.engine.unlock();
};
