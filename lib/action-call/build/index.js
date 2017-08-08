(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.actionCall = factory());
}(this, (function () { 'use strict';

function actionCall(addArgument){
    return function (ref,next,action){
        var dispatch = ref.dispatch;
        var getState = ref.getState;

        return typeof action === 'function' ? 
               action( dispatch, getState, addArgument):
               next( action );
    }
}

return actionCall;

})));
