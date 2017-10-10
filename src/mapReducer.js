export default function mapReducer(reducers){
    if( typeof reducers === 'object' ){
        return function reduce(currentState={},action){
            let update, nextState = {};
            
            for(let prop in reducers ){

                let reducer = reducers[prop],
                    before  = currentState[prop],
                    after;

                if( typeof reducer == 'function' ){
                    after = reducer( before, action);
                }else{
                    after = reducer;
                }

                if( !update && before !== after ){
                    update = true;
                }

                nextState[ prop ] = after;
            }
            
            return update ? nextState : currentState;
        };
    }else{
        throw new Error('The parameter must be an iterable object');
    }
}