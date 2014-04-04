function Character() {

	this._instanceInit = function() {};
	this._instanceAct = function() {};

	this._x = null;
	this._y = null;
	this._draw = function() {
		Game.display.draw(this._x, this._y, this.symbol, this.fgColor, this.bgColor);
	}

}

Character.prototype.name = 'Trainor the Great';

Character.prototype.symbol = '@';

Character.prototype.fgColor = '#FFF';

Character.prototype.bgColor = '#000';

Character.prototype.hp = 4;

Character.prototype.attack = 1;

Character.prototype.init = function(opts) {
	// expected inputs:
	// 	x: x position,
	// 	y: y position

	this._instanceInit(opts);
	this._x = opts.x;
	this._y = opts.y;
	this._draw();
};

Character.prototype.getPosition = function() {
	return this._x + "," + this._y;
};

Character.prototype.damage = function(attack) {
	this.hp -= attack;
	if(this.hp <= 0) {
		this.die();
	}
};

Character.prototype.die = function() {
	Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
	// TODO remove from scheduler and enemies array
};

Character.prototype.act = function() {
	this._instanceAct();
};
