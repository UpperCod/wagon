# WAGON

Es una pequeña libreria para el control del estado, inspirado en **redux** y **flux**

|tipo|peso|
|----|----|
|uncompres| 5 KB       |
|compress | 1.89 KB    |
|Gzip     | 818  bytes |

```javascript
import {Store} from 'wagon'

let initialState = {}

function reducer(state,action){
    console.log(state,action)
}

function middlewareLogger({getState,dispatch}){
    return (next,action)=>{
        console.log('before: ', getState())
                 let state = next(action)
        console.log('after:  ', getState())
        return state
    }
}

export new Store(reducer,initialState,[
    middlewareLogger
])

```

El core de wagon es simple, se compone basicamente de un clase llamada **Dispatcher**, esta ofrece la siguiente interfaz de control y no esta ligada al store solo a los suscriptores, adicionalmente una clase 
**Store** que extiende al dispatcher y usa los middlewares para controlar el estado del store

> lo he separado de esta forma ya que los metodos que ofrece dispatchers me suelen ser sumamente utiles no solo al momento de controlar el estado del store

### Dispatcher

esta clase permite crear un dispatch al momento de instanciarla o definir middlewares, los metodos de interacion que posee la instancia son

* `middleware(...function)`: permite crear un nuevo **dispatch** en base a los parametros, estos debe ser funciones que resiviran como primer argumento next seguido del resto de parametros

* `subscribe(function)` : permite añadir un suscriptor al dispatcher, este a su vez retorna una funcion
unsubscribe que apunta al suscriptor de la instancia

* `unsubscribe(function)` : permite anular una suscripcion

* `dispatch(...param)`    : permite despachar a los suscriptores argumentos



