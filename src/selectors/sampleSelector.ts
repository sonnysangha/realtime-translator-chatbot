import { AppState } from './../reducers/rootReducer';

export const sampleValueSelector = (state: AppState) => state.sample.sampleValue;
export const revealSelector = (state: AppState) => state.sample.reveal;