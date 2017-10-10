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
    function Store(ref){
        var this$1 = this;
        var reducer = ref.reducer;
        var state = ref.state;
        var middleware = ref.middleware; if ( middleware === void 0 ) middleware = [];

        Dispatcher$$1.call(this);
        /**
         * Generates a private access context for the state
         */
        this.getState = function (){ return state; };
        /**
         * It uses the middleware method of the Dispatcher, to generate a control of the state
         */
        (ref$1 = this).middleware.apply(
            /**
             * Creates a new function for each middleware so that it resets the parameters in 
             * the following order store, next and action
             */
            ref$1, [].concat(middleware).map(function (middleware){
                if( typeof middleware === 'function' ){
                    return function (next,action){ return middleware(this$1,next,action); }
                }else{
                    throw new Error('Expected the middleware to be a function');
                }
            }).concat( [function (next,action){
                var nextState = this$1.reducer(state,action);   
                if( this$1.compareState( state,nextState ) ){
                    next( state = nextState );
                }
                return action;
            }] )
        );
        /**
         * 
         */
        this.setReducer(reducer);
        var ref$1;
    }

    if ( Dispatcher$$1 ) Store.__proto__ = Dispatcher$$1;
    Store.prototype = Object.create( Dispatcher$$1 && Dispatcher$$1.prototype );
    Store.prototype.constructor = Store;
    /**
     * 
     * @param {function} reducer 
     */
    Store.prototype.setReducer = function setReducer (callback){
        if( typeof callback === 'function' ){
            this.reducer = callback;
            this.dispatch({type:'@AUTORUN'});
        }else{
            throw new Error('Expected the reducer to be a function');
        }
    };
    /**
     * 
     * @param  {object} currentState 
     * @param  {object} nextState 
     * @return {boolean}
     */
    Store.prototype.compareState = function compareState (currentState,nextState){
        return currentState !== nextState;
    };

    return Store;
}(Dispatcher));

function mapReducer(reducers){
    if( typeof reducers === 'object' ){
        return function reduce(currentState,action){
            if ( currentState === void 0 ) currentState={};

            var update, nextState = {};
            
            for(var prop in reducers ){

                var reducer = reducers[prop],
                    before  = currentState[prop],
                    after = (void 0);

                if( typeof reducer == 'function' ){
                    after = reducer( before, action);
                }else{
                    after = reducer;
                }

                if( !update && before !== after ){
                    update = true;
                }

                nextState[ prop ] = after;
            }
            
            return update ? nextState : currentState;
        };
    }else{
        throw new Error('The parameter must be an iterable object');
    }
}

exports.Store = Store;
exports.Dispatcher = Dispatcher;
exports.mapReducer = mapReducer;
exports.createMiddleware = createMiddleware;

Object.defineProperty(exports, '__esModule', { value: true });

})));
