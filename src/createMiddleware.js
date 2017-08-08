/**
 * Create a line of middlewares, these will receive as the first parameter next, 
 * in this way protect the last function of the line of middlewares
 * @return {function} 
 */

export default function createMiddleware(...middleware){
    return middleware.reduceRight((before,after)=>(...args)=>after(before,...args));
}