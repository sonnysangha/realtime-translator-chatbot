import { AppState } from './../reducers/rootReducer';

export const getAppDescription = (state: AppState) => state.sample.appDescription;