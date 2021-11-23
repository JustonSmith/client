import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
const reducer = require('reducer')
const composeEnhancers = composeWithDevTools({

});

const rootReducer = combineReducers({

})

const store = createStore(
    reducer,
    composeWithDevTools(
    applyMiddleware([thunk])

    )
);
