
export default function actionCall(addArgument){
    return (store,next,action)=>{
        return typeof action === 'function' ? 
               action( store.dispatch, store.getState, addArgument):
               next( action );
    }
}

