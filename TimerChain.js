var TimerChain = (function(){
	var TimerChain = function(){	
	};
	TimerChain.prototype = Object.create(Array.prototype,{
		"tm":{ writable: true, value: null },
		"isStop":{ writable: true, value: false },
		"push":{
			value:function(fn,timeout){
				this.constructor.prototype.push.call(this,[fn,timeout]);
				return this;
			}
		},
		"clear":{
			value:function(){
				while(this.length){
					this.shift();
				}
				return this;
			}
		},
		"start":{
			value:function(){
				this.isStop = false;		
				if(this.tm!=null){ 
					// console.log("failed .start() : not end setTimeout()");
					return this;
				}
				if(this.length>0){
					var arr = this.shift();
					this.tm = setTimeout(function(fn,thisC){
						return function(){
							fn();
							thisC.clearTm();
							if(!thisC.isStop){
								thisC.start();
							}
						}
					}(arr[0],this),arr[1]);
				}
				return this;
			}
		},
		"stop":{
			value:function(){
				this.isStop = true;
				this.clearTm();
				return this;
			}
		},
		"clearTm":{
			enumerable:false,
			value:function(){
				if(this.tm!=null) clearTimeout(this.tm);
				this.tm = null;
			}
		},
	});

	return TimerChain;
})()