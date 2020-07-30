import windowsReducer from "./windowsReducer";
import { combineReducers } from "redux";
import mouseReducer from "./mouseReducer";

export const rootReducers = combineReducers({
    windowsReducer: windowsReducer,
    mouseReducer: mouseReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
