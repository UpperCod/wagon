let {Store,mapReducers} =  require( './build' ),
    actionCall = require('./lib/action-call/build');

test('Instancia',()=>{
    let initState = {};
    function reducer(state = initState,action){
            return state
    }
    
    let store = new Store( reducer );

    expect( initState ).toBe( store.getState() );
})

test('subscribe push',()=>{
    let initState = {};
    function reducer(state = initState,action){
            return state
    }
    
    let store = new Store( reducer );

    store.subscribe((state)=>{
        expect( state ).toBe( store.getState() );
    })
})

test('middleware action-call',()=>{
    let initState = {}, otherState = [];
        function reducer(state,action){
            switch( action.type ){
                case 1:
                    return otherState
                default:
                    return state
            }
        }
        
        let store = new Store( reducer, initState , [
            actionCall()
        ]);

        

        store.dispatch((dispatch,getState)=>{
            dispatch({ type: 1 })
        })

        store.subscribe((state)=>{
            expect( state ).toBe( otherState );
        }) 
})



test('subscribe to unsubscribe',()=>{
    let countExecution = 0;
        function reducer(state,action){
           return countExecution;
        }
        
        function subscribe(){
           countExecution++;
        }

        let store = new Store( reducer);

        
        store.subscribe(subscribe);

        store.unsubscribe(subscribe);

        store.dispatch({type:'TEST'})

        expect( countExecution ).toBe( 1 );
})
