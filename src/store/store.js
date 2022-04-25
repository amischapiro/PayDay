import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { userReducer } from './user.reducer'
import { boardReducer } from "./board.reducer";
import { activityReducer } from "./activity.reducer";

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
    activityModule: activityReducer
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))