
export default class Notify{
    constructor(notify = {}){
        this.notify = notify
    }
    on(name,callback){
        (
            this.notify[ name ] = this.notify[ name ] || []
        ).push(callback)
    }
    off(name,callback){
        this.notify[name] && this.notify[name].splice(
            this.notify[name].indexOf( callback )>>>0,1
        )
    }
    emit(name,...args){
        this.notify[name] && this.notify[name].forEach(
            (callback)=>callback(...args)
        )
    }
}