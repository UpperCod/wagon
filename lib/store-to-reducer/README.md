## storeToReducer

Permite tener un store como reducer, ya sea en instancias que se desea acoplar un store y este sea de forma independiente pero a su vez desee escuchar las acciones del padre

## Action

Por defecto el store se inicia al momento de instanciarse, por lo tanto para diferenciar el hecho de que el store se une al padre se despacha la siguiente acción

```javascript
{type:'@AUTORUN_FROM_PARENT',state}
```
> el **state** proviene de la asignación del initialState que descompone **mapReducer****