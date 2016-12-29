if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop];
			this[prop] = val;
		}
	});
}

var vault = {
	_load: function() {
		if (localStorage.vault) {
			o = JSON.parse(localStorage.vault);
			this._variables = o.variables;
			this._pages = o.pages;
			this.domain.new = false;
			this.domain.returning = true;
		} else {
			localStorage.vault = JSON.stringify({pages:[],variables:{}});
		};
		l = window.location.pathname;
		if (this._pages.indexOf(l) < 0) {
			this._pages.push(l);
		} else {
			this.page.new = false;
			this.page.returning = true;
		};
	},
	_save: function() {
		localStorage.vault = JSON.stringify({pages:this._pages,variables:this._variables});
	},
	_variables: {
	},
	_names: [
	],
	_pages: [
	],
	domain: {
		new: true,
		returning: false
	},
	page: {
		new: true,
		returning: false
	},
	sync: function() {
		for (i=0;i<arguments.length;i++) {
			n = arguments[i];
			if (n) {
				this._names.push(n);
				if (this._variables[n] != undefined) {
					window[n] = this._variables[n];
				} else {
					this._variables[n] = window[n];
				};
			};
			this._save();
			window.watch(n,function(n,v1,v2) {
				if (vault._names.indexOf(n) > -1) {
					vault._variables[n] = v2;
					vault._save();
				};
				return v2;
			});
		};
	},
	wipe: function() {
		this._variables = {};
		this._names = [];
		this.domain.new = true;
		this.domain.returning = false;
		this.page.new = true;
		this.page.returning = false;
		delete localStorage.vault;
	}
};
vault._load();
