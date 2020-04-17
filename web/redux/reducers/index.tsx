import { combineReducers } from "redux";
import currentSessionReducer from "./session"
import repoReducer from "./repo"
const reducers = combineReducers({
    currentSession: currentSessionReducer,
    repoReducer: repoReducer
});

export default reducers;
