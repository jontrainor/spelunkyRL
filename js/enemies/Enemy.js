function Enemy() {
	this.name = "generic enemy";
}

Enemy.prototype = new Character();

Enemy.prototype.getAdjSpaces = function() {
	var me = this;
	var adjSpaces = _.map(this._directions, function(dir) {
		var space = {};
		var diff = ROT.DIRS[8][dir];
		space.newX = me._x + diff[0];
		space.newY = me._y + diff[1];
		var newKey = space.newX + "," + space.newY;
		if(newKey in Game.map) {
			if(newKey === (Game.player._x + "," + Game.player._y)) {
				space.contents = '@';
			} else {
				space.contents = Game.map[newKey];
			}
			return space;
		}
	});
	var filteredAdjSpaces = _.filter(adjSpaces, function(space) { return space; });
	return filteredAdjSpaces;
};
