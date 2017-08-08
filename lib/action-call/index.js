
export default function actionCall(addArgument){
    return ({dispatch,getState},next,action)=>{
        return typeof action === 'function' ? 
               action( dispatch, getState, addArgument):
               next( action );
    }
}

