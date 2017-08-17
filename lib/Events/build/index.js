(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Events = factory());
}(this, (function () { 'use strict';

var Events = function Events(notify){
    if ( notify === void 0 ) notify = {};

    this.notify = notify;
};
Events.prototype.on = function on (name,callback){
    (
        this.notify[ name ] = this.notify[ name ] || []
    ).push(callback);
};
Events.prototype.off = function off (name,callback){
    this.notify[name] && this.notify[name].splice(
        this.notify[name].indexOf( callback )>>>0,1
    );
};
Events.prototype.emit = function emit (name){
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    this.notify[name] && this.notify[name].forEach(
        function (callback){ return callback.apply(void 0, args); }
    );
};

return Events;

})));
