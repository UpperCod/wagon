(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.storeToReducer = factory());
}(this, (function () { 'use strict';

function storeToReducer(store,merge){
    return function (state,action){
        if( !merge && action.type == '@AUTORUN' ){
            merge = true; action = {type:'@AUTORUN_FROM_PARENT',state: state};
        }
        store.dispatch(action);
        return store.getState();
    }
}

return storeToReducer;

})));
