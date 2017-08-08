
class Events{
    constructor(notify = {}){
        this.notify = notify
    }
    on(name,callback){
        (
            this.notify[ name ] = this.notify[ name ] || []
        ).push(callback)
    }
    off(name,callback){
        if(this.notify[name]){
            this.notify[name].splice(
                this.notify[name].indexOf( callback )>>>0,1
            )
        }
    }
    emit(name,...args){
        if( this.notify[name] ){
            this.notify[name].forEach((callback)=>callback(...args))
        }
    }
}