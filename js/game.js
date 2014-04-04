var Game = {
	//private methods
	_generateMap: function() {
		var mapGenerator = new ROT.Map.Digger();
		var freeCells = [ ];

		var mapGeneratorCallback = function(x, y, value) {
			if(value) { return; } //do not store walls
			
			var key = x + "," + y;
			freeCells.push(key);
			this.map[key] = ".";
		};

		mapGenerator.create(mapGeneratorCallback.bind(this));
		this._generateBoxes(freeCells);
		this._drawMap();
		this.player = this._createActor(Player, freeCells);
		this.enemies.push(this._createActor(Snake, freeCells));
		console.log(this.enemies);
	},

	_drawMap: function() {
		for(var key in this.map) {
			var parts = key.split(",");
			var x = parseInt(parts[0]);
			var y = parseInt(parts[1]);
			this.display.draw(x, y, this.map[key]);
		}
	},

	_generateBoxes: function(freeCells) {
		for(var i=0; i<10; i++) {
			var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
			var key = freeCells.splice(index, 1)[0];
			this.map[key] = "*";

			if(!i) { this.ananas = key; }
		}
	},

	_createActor: function(actor, freeCells) {
		var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
		var key = freeCells.splice(index, 1)[0];
		var parts = key.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		var newActor = new actor({
			x: x,
			y: y
		});
		console.log(newActor);
		return newActor;
  },

	//properties
	display: null,

	map: {},

	player: null,

	enemies: [],

	defeatedEnemies: [],

	items: [],

	engine: null,

	ananas: null,

	//methods
	init: function() {
		this.display = new ROT.Display();
		document.body.appendChild(this.display.getContainer());
		this._generateMap();

		var scheduler = new ROT.Scheduler.Simple();
		scheduler.add(this.player, true);
		for(var i=0;i<this.enemies.length;i++) {
			scheduler.add(this.enemies[i], true);
		}
		this.engine = new ROT.Engine(scheduler);
		this.engine.start();
	},

	getEnemyPositions: function() {
		var positions = [];
		for(var i=0; i<this.enemies.length; i++) {
			positions.push(this.enemies[i]._x + "," + this.enemies[i]._y);
		}
		return positions;
	},

	getItemPositions: function() {
		var positions = [];
		for(var i=0; i<this.itmes.length; i++) {
			positions.push(this.items[i]._x + "," + this.items[i]._y);
		}
		return positions;
	}

};

Game.init();
