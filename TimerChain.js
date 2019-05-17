/**
 * TimerChain
 * http://mins01.com
 * https://github.com/mins01/js_TimerChain
 * Date : 2019-05-17
 */
var TimerChain = (function(){
	"use strict";
	var TimerChain = function(){	
	};
	TimerChain.prototype = Object.create(Array.prototype,{
		"tm":{ writable: true, value: null },
		"isRunning":{ writable: true, value: false },
		"lastCallback":{ writable: true, value: null },
		"lastTimeout":{ writable: true, value: null },
		"push":{
			value:function(fn,timeout){
				this.constructor.prototype.push.call(this,[fn,timeout]);
				return this;
			}
		},
		"unshift":{
			value:function(fn,timeout){
				this.constructor.prototype.unshift.call(this,[fn,timeout]);
				return this;
			}
		},
		"splice":{
			value:function(start,deleteCount,fn,timeout){
				if(arguments.length<2){
					console.error("arguments.length < 2");
				}
				var start = arguments[0];
				var deleteCount = arguments[1];
				var args = [start,deleteCount];
				for(var i=2,m=arguments.length;i<m;i+=2){
					args.push([arguments[i],arguments[i+1]])
				}
				this.constructor.prototype.splice.apply(this,args);
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
				if(this.isRunning){ 
					// console.log("failed .start() : not end setTimeout()");
					return this;
				}
				this.isRunning = true;
				return this.run();
			}
		},
		"run":{
			value:function(){
				if(this.length>0){
					var arr = this.shift();
					this.tm = setTimeout(function(cb,thisC){
						return function(){
							cb();
							thisC.run();
						}
					}(arr[0],this),arr[1]);
					this.lastCallback = arr[0];
					this.lastTimeout = arr[1];
				}else{
					this.isRunning = false;
				}
				return this;
			}
		},
		"stop":{
			value:function(){
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