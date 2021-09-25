import { combineReducers } from "redux";
import hangmanReducer from "./hangmanReducer";

const rootReducer = combineReducers({
    hangman: hangmanReducer
});

export default rootReducer;