var TimerChain = (function(){
	var TimerChain = function(){	
	};
	TimerChain.prototype = Object.create(Array.prototype,{
		"tm":{ writable: true, configurable: true, value: null },
		"isStop":{ writable: true, configurable: true, value: false }
	})
	var proto = TimerChain.prototype
	proto.push = function(fn,timeout){
		this.constructor.prototype.push.call(this,[fn,timeout]);
		return this;
	}
	proto.clear = function(){
		while(this.length){
			this.shift();
		}
		return this;
	}
	proto.start = function(){
		this.isStop = false;		
		if(this.tm!=null){ 
			// console.log("failed .start() : not end setTimeout()");
			return false;
		}
		if(this.length>0){
				var arr = this.shift();
				this.tm = setTimeout(function(fn,thisC){
					return function(){
						fn();
						thisC._stop();
						if(!thisC.isStop){
							thisC.start();
						}
						
					}
				}(arr[0],this),arr[1]);
		}
		return this;
	}
	proto.stop = function(){
		this.isStop = true;
		this._stop();
		return this;
	}	
	proto._stop = function(){
		if(this.tm!=null) clearTimeout(this.tm);
		this.tm = null;
	}
	return TimerChain;
})()