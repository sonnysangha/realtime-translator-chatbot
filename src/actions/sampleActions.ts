import { Action } from "redux";
// import { actionChannel } from "redux-saga/effects";

export enum types {
  ADD_PHRASE_TO_FIRESTORE = 'ADD_PHRASE_TO_FIRESTORE',
}

export type AddPhraseAction = {
  phrase: string;
}

export const addPhraseToFirestore = (phrase: string): Action & AddPhraseAction => ({
  type: types.ADD_PHRASE_TO_FIRESTORE,
  phrase
});
