function Snake(opts) {
	this._instanceInit = function(opts) {
		var _directions = [];
		var i = 0;
		while(i<8) {
			_directions.push(i);
			i++;
		}
		this._directions = _directions;
	};

	this._instanceAct = function() {
		Game.engine.lock();

		var adjSpaces = this.getAdjSpaces();

		// check for player and attack
		var adjPlayerSpace = _.find(adjSpaces, function(space) {
			return space.contents === '@';
		});
		if(adjPlayerSpace) {
			Game.player.damage(this.attack);
		} else {
			// move to random space
			var newSpaceIndex = Math.floor(ROT.RNG.getUniform() * adjSpaces.length);
			var newSpace = adjSpaces[newSpaceIndex];
			Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
			this._x = newSpace.newX;
			this._y = newSpace.newY;
			this._draw();
		}

		Game.engine.unlock();
	};

	// public properties
	this.name = 'Snake';

	this.symbol = 's';

	this.hp = 1;

	this.attack = 1;

	this.init(opts);
}

Snake.prototype = new Enemy();

