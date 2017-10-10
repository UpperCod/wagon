export default function objectToReducer(instance){
    if( typeof instance === 'object' ){
        return (state,action)=>(
            typeof instance[action.type]  === 'function' ? instance[action.type]( state,action ) :
            typeof instance.reducer       === 'function' ? instance.reducer( state,action )      :
            typeof instance.default       === 'function' ? instance.default( state,action )      :
            state
        )
    }else{
        throw new Error( 'The reduce method must exist on the instantiated object' );
    }
}