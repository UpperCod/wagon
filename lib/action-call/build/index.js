(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.actionCall = factory());
}(this, (function () { 'use strict';

function actionCall(addArgument){
    return function (store,next,action){
        return typeof action === 'function' ? 
               action( store, addArgument ):
               next( action );
    }
}

return actionCall;

})));
