
export default function actionCall(addArgument){
    return (store,next,action)=>{
        return typeof action === 'function' ? 
               action( store, addArgument ):
               next( action );
    }
}

