import { Action } from "redux";

export enum types {
  SAMPLE_CALLED = 'SAMPLE_CALLED',
}

export type sampleCalledAction = {
  value: boolean
}
export const sampleCalled = (value: boolean): Action & sampleCalledAction => ({
  type: types.SAMPLE_CALLED,
  value
});