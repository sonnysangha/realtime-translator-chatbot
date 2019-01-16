import { AnyAction } from 'redux';

export type sampleReducerState = {
  appDescription: string,
}

const initialState: sampleReducerState = {
  appDescription: 'Realtime demonstration of Firebase FireStore, Cloud functions & Google translate API'
};

const sampleReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    // Handle Reducer updates here...
    default:
      return state;
  }
};

export default sampleReducer;