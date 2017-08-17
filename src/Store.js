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
    constructor(currentReducer,currentState,middleware=[]){
        super();
        /**
         * Generates a private access context for the state
         */
        this.getState = ()=>currentState;
        /**
         * It uses the middleware method of the Dispatcher, to generate a control of the state
         */
        this.middleware(
            /**
             * Creates a new function for each middleware so that it resets the parameters in 
             * the following order store, next and action
             */
            ...middleware.map(middleware=>(next,action)=>middleware(this,next,action)),
            /**
             * Execute the reducer and then compare if the next state is different from the
             * previous one, to notify subscribers
             */
            (next,action)=>{
                let nextState = currentReducer(currentState,action);   
                if( nextState !== currentState ){
                    next( currentState = nextState );
                }
                return action;
            }
        );
        /**
         * Dispatches the initial action that defines the current state
         */
        this.dispatch({type:'@AUTORUN'});
    }
}