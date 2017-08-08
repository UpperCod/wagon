## actionCall

Permite ejecutar action desde el middleware actionCall, este analiza si el action es una función y la instancia entregando como parámetro **store.dispatch**,**store.getState** y el parámetro de instancia de **actionCall**

```javascript
function reducer(state={},action){
    return state
}

function logger(store){
    return (next,action)=>{
        console.log('from logger: ',action)
        return next(action)
    }
}

let store = new wagon.Store( reducer, {} , [
    actionCall({}),
    logger
] )


store.dispatch(function(dispatch,getState,share){
    dispatch({
        type:'ready'
    })
    dispatch({
        type:'before'
    })
})

```