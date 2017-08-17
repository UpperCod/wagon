(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.objectToReducer = factory());
}(this, (function () { 'use strict';

function objectToReducer(instance){
    if( typeof instance === 'object' ){
        return function (state,action){ return (
            typeof instance[action.type]  === 'function' ? instance[action.type]( state,action ) :
            typeof instance.reducer === 'function'       ? instance.reducer( state,action )      :
            typeof instance.default === 'function'       ? instance.default( state,action )      :
            state
        ); }
    }else{
        throw new Error( 'The reduce method must exist on the instantiated object' );
    }
}

return objectToReducer;

})));
