import windowsReducer from './windowsReducer'
import {combineReducers} from 'redux'

export const rootReducers = combineReducers({
    windowsReducer
});

export type RootState = ReturnType<typeof rootReducers>
