let {Store,mapReducers} = require( './build' );

test('Instancia',()=>{
    let initState = {};
    function reducer(state = initState,action){
            return state
    }
    
    let store = new Store( {reducer} );

    expect( initState ).toBe( store.getState() );
})
