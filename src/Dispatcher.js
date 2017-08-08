
import createMiddleware from './createMiddleware';
/**
 * Create a context for subscribers, middlewares and dispatch
 * Being useful when managing notifications o procesos de linea
 */
export default class Dispatcher{
    constructor(notify=[],mdd=[]){
        this.notify = notify;
        this.middleware(...mdd);
    }
    /**
     * Subscriber to notifications that are issued by the dispatch method
     * @param {function} callback 
     */
    subscribe(callback){
        if( typeof callback === 'function' ){
            this.notify.push(callback);
        }else{
            throw new Error('Expected the subscriber to be a function');
        }
    }
    /**
     * Remove a subscriber from dispatch notifications
     * @param {function} callback 
     */
    unsubscribe(callback){
        this.notify.splice(
            this.notify.indexOf(callback)>>>0,1
        );
    }
    /**
     * Creates a new dispatch, managed by a line of middlewares
     * @param {funcion} mdd 
     */   
    middleware(...mdd){
        return this.dispatch = createMiddleware(...mdd,(...args)=>{
            this.notify.forEach(callback=>callback(...args));   
        });
    }
}