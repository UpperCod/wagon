import each from './each'

export default function mapReducers(reducers){
    if( typeof reducers === 'object' ){
        return function reduce(currentState={},action){
            let update, nextState = {};
            each(reducers,(reduce,prop)=>{
                let before = currentState[prop],
                    after  = reduce( before, action );
                if(!update && before !== after){
                    update = true;
                }
                nextState[ prop ] = after;
            });
            return update ? nextState : currentState;
        };
    }else{
        throw new Error('The parameter must be an iterable object');
    }
}