(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Wagon = global.Wagon || {})));
}(this, (function (exports) { 'use strict';

/**
 * Create a line of middlewares, these will receive as the first parameter next, 
 * in this way protect the last function of the line of middlewares
 * @return {function} 
 */

function createMiddleware(){
    var middleware = [], len = arguments.length;
    while ( len-- ) middleware[ len ] = arguments[ len ];

    return middleware.reduceRight(function (before,after){ return function (){
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return after.apply(void 0, [ before ].concat( args ));
 }        });
}

/**
 * Create a context for subscribers, middlewares and dispatch
 * Being useful when managing notifications o procesos de linea
 */
var Dispatcher = function Dispatcher(notify,mdd){
    if ( notify === void 0 ) notify=[];
    if ( mdd === void 0 ) mdd=[];

    this.notify = notify;
    (ref = this).middleware.apply(ref, mdd);
    var ref;
};
/**
 * Subscriber to notifications that are issued by the dispatch method
 * @param {function} callback 
 */
Dispatcher.prototype.subscribe = function subscribe (callback){
    if( typeof callback === 'function' ){
        this.notify.push(callback);
    }else{
        throw new Error('Expected the subscriber to be a function');
    }
};
/**
 * Remove a subscriber from dispatch notifications
 * @param {function} callback 
 */
Dispatcher.prototype.unsubscribe = function unsubscribe (callback){
    this.notify.splice(
        this.notify.indexOf(callback)>>>0,1
    );
};
/**
 * Creates a new dispatch, managed by a line of middlewares
 * @param {funcion} mdd 
 */   
Dispatcher.prototype.middleware = function middleware (){
        var this$1 = this;
        var mdd = [], len = arguments.length;
        while ( len-- ) mdd[ len ] = arguments[ len ];

    return this.dispatch = createMiddleware.apply(void 0, mdd.concat( [function (){
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

        this$1.notify.forEach(function (callback){ return callback.apply(void 0, args); });   
    }] ));
};

var Store = (function (Dispatcher$$1) {
    function Store(currentReducer,currentState,middleware){
        var this$1 = this;
        if ( middleware === void 0 ) middleware=[];

        Dispatcher$$1.call(this);
        /**
         * Generates a private access context for the state
         */
        this.getState = function (){ return currentState; };
        /**
         * It uses the middleware method of the Dispatcher, to generate a control of the state
         */
        (ref = this).middleware.apply(
            /**
             * Creates a new function for each middleware so that it resets the parameters in 
             * the following order store, next and action
             */
            ref, middleware.map(function (middleware){ return function (next,action){ return middleware(this$1,next,action); }; }).concat( [function (next,action){
                var nextState = currentReducer(currentState,action);   
                if( nextState !== currentState ){
                    next( currentState = nextState );
                }
                return action;
            }] )
        );
        /**
         * Replaces the subscribe method, to maintain an execution
         * On a direct basis on the subscriber, in this way
         * The subscriber automatically resumes the state of the store
         * At the moment of being whispered, as is usually done by a Observable
         */
        var subscribe  =  this.subscribe.bind(this);
        this.subscribe   = function (callback,autorun){
            if ( autorun === void 0 ) autorun = true;

            subscribe( callback ); autorun && callback( currentState );
        };
        /**
         * Dispatches the initial action that defines the current state
         */
        this.dispatch({type:'@AUTORUN'});
        var ref;
    }

    if ( Dispatcher$$1 ) Store.__proto__ = Dispatcher$$1;
    Store.prototype = Object.create( Dispatcher$$1 && Dispatcher$$1.prototype );
    Store.prototype.constructor = Store;

    return Store;
}(Dispatcher));

/**
 * 
 * @param {object}   object 
 * @param {function} callback 
 */
function each(object,callback){
    for(var key in object){ callback(object[key],key); }
}

function mapReducers(reducers){
    if( typeof reducers === 'object' ){
        return function reduce(currentState,action){
            if ( currentState === void 0 ) currentState={};

            var update, nextState = {};
            each(reducers,function (reduce,prop){
                var before = currentState[prop],
                    after  = reduce( before, action );
                if(!update && before !== after){
                    update = true;
                }
                nextState[ prop ] = after;
            });
            return update ? nextState : currentState;
        };
    }else{
        throw new Error('The parameter must be an iterable object');
    }
}

exports.Store = Store;
exports.Dispatcher = Dispatcher;
exports.mapReducers = mapReducers;
exports.createMiddleware = createMiddleware;

Object.defineProperty(exports, '__esModule', { value: true });

})));
