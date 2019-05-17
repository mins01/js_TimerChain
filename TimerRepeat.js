"use strict";
/**
 * TimerRepeat
 * http://mins01.com
 * https://github.com/mins01/js_TimerChain
 * Date : 2019-05-17
 */
var TimerRepeat = (function(){
	var TimerRepeat = function(){	
	};
	var trp = TimerRepeat.prototype;
	trp.tm = null;
	trp.lastCallback = null;
	trp.lastInterval = null;
	trp.start = function(callback,interval){
			if(callback==null){ callback = this.lastCallback; }
			if(interval==null){ interval = this.lastInterval; }
			return this.run(callback,interval);
	}
	trp.changeCallback = function(callback){
		this.lastCallback = callback;
		return this
	}
	trp.changeInterval = function(interval){
		this.lastInterval = interval;
		return this
	}
	trp.run = function(callback,interval){
		this.stop();
		if(callback===null){
			console.error("arg callback is null ");
			return this;
		}
		if(interval===null){
			console.error("arg interval is null ");
			return this;
		}
		this.lastCallback = callback;
		this.lastInterval = interval;
		this.tm = setInterval((function(){
			return function(){
					callback()
			}
		})(callback),interval);
		return this;
	}
	trp.stop = function(){
		if(this.tm !== null){clearInterval(this.tm);}
		this.tm = null;
		return this;
	}

	return TimerRepeat;
})()