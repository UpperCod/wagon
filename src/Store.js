import Dispatcher from './Dispatcher'

export default class Store extends Dispatcher{
    /**
     * Store takes advantage of the context inherited from the dispatcher to create an instance
     * which protects the reducer by means of the configuration of middlewares
     * 
     * @param {function} currentReducer - Store reducer
     * @param {*}        currentState   - Initial state of the store       
     * @param {array}    middleware     - Array of functions that control execution
     * of the reducer, these functions receive as parameter the store, next and action
     */ 
    constructor({
        reducer,
        state,
        middleware = [],
    }){
        super();
        /**
         * Generates a private access context for the state
         */
        this.getState = ()=>state;
        /**
         * It uses the middleware method of the Dispatcher, to generate a control of the state
         */
        this.middleware(
            /**
             * Creates a new function for each middleware so that it resets the parameters in 
             * the following order store, next and action
             */
            ...[].concat(middleware).map(middleware=>{
                if( typeof middleware === 'function' ){
                    return (next,action)=>middleware(this,next,action)
                }else{
                    throw new Error('Expected the middleware to be a function');
                }
            }),
            /**
             * Execute the reducer and then compare if the next state is different from the
             * previous one, to notify subscribers
             */
            (next,action)=>{
                let nextState = this.reducer(state,action);   
                if( this.compareState( state,nextState ) ){
                    next( state = nextState );
                }
                return action;
            }
        );
        /**
         * 
         */
        this.setReducer(reducer);
    }
    /**
     * 
     * @param {function} reducer 
     */
    setReducer(callback){
        if( typeof callback === 'function' ){
            this.reducer = callback;
            this.dispatch({type:'@AUTORUN'});
        }else{
            throw new Error('Expected the reducer to be a function');
        }
    }
    /**
     * 
     * @param  {object} currentState 
     * @param  {object} nextState 
     * @return {boolean}
     */
    compareState(currentState,nextState){
        return currentState !== nextState;
    }
}