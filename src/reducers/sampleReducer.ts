import { types } from '../actions/sampleActions';
import { AnyAction } from 'redux';

export type sampleReducerState = {
  reveal: boolean,
  sampleValue: string,
}

const initialState: sampleReducerState = {
  reveal: false,
  sampleValue: 'alive thanks to Redux stuff!'
};

const sampleReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.SAMPLE_CALLED:
      return { ...state, reveal: action.value };
    default:
      return state;
  }
};

export default sampleReducer;