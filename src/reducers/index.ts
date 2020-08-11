import windowsReducer from "./windowsReducer";
import { combineReducers } from "redux";
import mouseReducer from "./mouseReducer";
import driveReducer from "./driveReducer";

export const rootReducers = combineReducers({
    windowsReducer: windowsReducer,
    mouseReducer: mouseReducer,
    driveReducer: driveReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
