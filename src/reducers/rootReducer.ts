import { combineReducers } from 'redux';
import sampleReducer, { sampleReducerState } from './sampleReducer';

export type AppState = {
  sample: sampleReducerState,
}

const rootReducer = combineReducers({
  sample: sampleReducer
});

export default rootReducer;