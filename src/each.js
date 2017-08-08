/**
 * 
 * @param {object}   object 
 * @param {function} callback 
 */
export default function each(object,callback){
    for(var key in object)callback(object[key],key);
}