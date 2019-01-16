import { takeEvery } from 'redux-saga/effects';
import { types as sampleTypes } from '../actions/sampleActions';
import { SagaIterator } from 'redux-saga';
import axios from 'axios';
import moment from 'moment';

function* addPhraseToFirestore(action: any): SagaIterator {
    axios.post('https://us-central1-helix-f06de.cloudfunctions.net/addPhraseToFirestore', {
        phrase: action.phrase,
        datetime: moment()
    })
}

export default function* sampleSaga() {
    yield takeEvery(sampleTypes.ADD_PHRASE_TO_FIRESTORE, addPhraseToFirestore);
}