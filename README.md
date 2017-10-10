# WAGON

|tipo|peso|
|----|----|
|uncompress| 5.83 KB    |
|compress | 2.14 KB    |
|Gzip     | 866  bytes |

Wagon es una pequeña librería para gestionar el estado inspirada en **Redux** y **Flux**, su principal diferencia es la notificación hacia los suscriptores, sea en base a una comparación primitiva, como manifiesta el siguiente codigo:

```javascript
let currentState = {}, nextState = {};
if( currentState !== nextState ){
   /**
   Notify subscribers
   **/
}
```
De esta forma el **reducer** se ve obligado a generar un nuevo estado para notificar cambios a los suscriptores.

### Implementación

```javascript
import {Store} from 'wagon'

let store = new Store({
   state : 0,
   reducer(state,action){
       switch(action.type){
           case 'INCREMENT':
               return ++state;
           case 'DECREMENT':
               return --state;
           default:
               return state;
       }
   },
   middleware({getState},next,action){
       console.log('action: ', action );
       console.log('before: ', getState());
           let state = next(action);
       console.log('after:  ', getState());
       return state
   }
})

store.subscribe(( state )=>{
   console.log('subscribe: ', state )
})

store.dispatch({
   type : 'INCREMENT'
})

```
### State (opcional)

al instanciar el store ud puede entregarle un estado inicial.

### reducer (requerido)

debe ser una función, esta recibe 2 parametros el estado anterior y la acción de cambio, si está retorna el estado anterior no genera emisión hacia los suscriptores.

### middleware (opcional)

puede ser una función o una colección de funciones, cada función recibe 3 parámetros:

1. **store** :  recibe el store que invoca el middleware
2. **next**  :  permite pasar al siguiente middleware o reducer, **next a su vez puede construir un nuevo action**.
3. **action**:  parámetro para el reducer

