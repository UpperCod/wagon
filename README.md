# WAGON

|tipo|peso|
|----|----|
|uncompres| 4.94 KB    |
|compress | 1.79 KB    |
|Gzip     | 793  bytes |

Es una pequeña librería para el control del estado, inspirado en **redux** y **flux**, la principal diferencia es que wagon no despacha todas las acciones,
despacha  si el estado anterior es distinto al actual, para exto simplemente compara de la siguiente forma los estados:


```javascript
let currentState = {}, nextState = {};
if( currentState !== nextState ){
    /**
    Notify subscribers
    **/
}
```
De esta forma el **reducer** se ve obligado a generar un nuevo estado para notificar a los suscriptores.

```javascript
import {Store} from 'wagon'

let initialState = {}

function reducer(state,action){
    console.log(state,action)
}

function middlewareLogger({getState,dispatch},next,action){
    console.log('before: ', getState())
                let state = next(action)
    console.log('after:  ', getState())
    return state
}

export new Store(reducer,initialState,[
    middlewareLogger
])

```

El core de wagon es simple, se compone basicamente de un clase llamada **Dispatcher**, esta ofrece la siguiente interfaz de control y no esta ligada al store solo a los suscriptores, adicionalmente una clase 
**Store** que extiende al dispatcher y usa los middlewares para controlar el estado del store

### Metodos del Dispatcher

esta clase permite crear un dispatch al momento de instanciarla o definir middlewares, los metodos de interacion que posee la instancia son

* `middleware(...function)`: permite crear un nuevo **dispatch** en base a los parametros, estos debe ser funciones que resiviran como primer argumento next seguido del resto de parametros

* `subscribe(function)`   : permite añadir un suscriptor al dispatcher

* `unsubscribe(function)` : permite anular una suscripcion

* `dispatch(...param)`    : permite despachar a los suscriptores argumentos

### Store

la clase Store simplemente extiende dispatcher y en la instancia se define de la siguiente forma

``` javascript
constructor(currentReducer,currentState,middleware=[]){
    super();
    /**
    * Generates a private access context for the state
    */
    this.getState = ()=>currentState;
    /**
    * It uses the middleware method of the Dispatcher, to generate a control of the state
    */
    this.middleware(
        /**
        * Creates a new function for each middleware so that it resets the parameters in 
        * the following order store, next and action
        */
        ...middleware.map(middleware=>(next,action)=>middleware(this,next,action)),
        /**
        * Execute the reducer and then compare if the next state is different from the
        * previous one, to notify subscribers
        */
        (next,action)=>{
            let nextState = currentReducer(currentState,action);   
            if( nextState !== currentState ){
                next( currentState = nextState );
            }
            return action;
        }
    );
    /**
    * Dispatches the initial action that defines the current state
    */
    this.dispatch({type:'@AUTORUN'});
}
```
> como notara el core de Wagon es Distpatcher, que es simplemente una interpretacion de patron observer.