export default function objectToReducer(instance){
    if( typeof instance === 'object' ){
        return (state,action)=>{
            if( typeof instance[action.type]  === 'function' ){
                  return instance[action.type]( state,action )
            }else if( typeof instance.reducer === 'function' ){
                return instance.reducer( state,action )
            }else if( typeof instance.default === 'function' ){
                return instance.default( state,action )
            }else return state
        }
    }else{
        throw new Error( 'The reduce method must exist on the instantiated object' );
    }
}