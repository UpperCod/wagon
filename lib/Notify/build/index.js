(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Notify = factory());
}(this, (function () { 'use strict';

var Notify = function Notify(notify){
    if ( notify === void 0 ) notify = {};

    this.notify = notify;
};
Notify.prototype.on = function on (name,callback){
    (
        this.notify[ name ] = this.notify[ name ] || []
    ).push(callback);
};
Notify.prototype.off = function off (name,callback){
    this.notify[name] && this.notify[name].splice(
        this.notify[name].indexOf( callback )>>>0,1
    );
};
Notify.prototype.emit = function emit (name){
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    this.notify[name] && this.notify[name].forEach(
        function (callback){ return callback.apply(void 0, args); }
    );
};

return Notify;

})));
