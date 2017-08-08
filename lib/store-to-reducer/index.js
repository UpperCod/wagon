export default function storeToReducer(store,merge){
    return (state,action)=>{
        if( !merge && action.type == '@AUTORUN' ){
            merge = true; action = {type:'@AUTORUN_FROM_PARENT',state};
        }
        store.dispatch(action);
        return store.getState();
    }
}
