let {Store,mapReducers} = require( './build' ),
    actionCall          = require('./lib/action-call/build'),
    objectToReducer     = require('./lib/object-to-reducer/build');

test('Instancia',()=>{
    let initState = {};
    function reducer(state = initState,action){
            return state
    }
    
    let store = new Store( reducer );

    expect( initState ).toBe( store.getState() );
})

test('Proceso',()=>{
    let initState = {},
        STATE_1   = 1,
        STATE_2   = 2,
        STATE_3   = 3;

    function reducer(state = initState,{type}){
        switch(type){
            case 1 : return STATE_1
            case 2 : return STATE_2
            case 3 : return STATE_3
            default: return state
        }
    }
    
    let store = new Store( reducer );

    store.dispatch({
        type : 1
    })

    expect( store.getState() ).toBe( 1 );
})

test('middleware action-call',()=>{
    let initState = 'init-state',
        testState = 'is-test';

    function reducer(state,action){
            return action.type === 'TEST' ? testState : state
    }
    function actionTest(dispatch,getState){
            dispatch({
                type : 'TEST'
            })
    }
    let store = new Store( reducer, initState, [ actionCall() ] );

    store.dispatch(actionTest)

    expect( store.getState() ).toBe( testState );
    
})

test('middleware object-to-reducer',()=>{
     let store = new Store(objectToReducer({
        initState : 10,
        reducer(state = this.initState,action){
            return state
        }
    }))
    expect( store.getState() ).toBe( 10 );
})
