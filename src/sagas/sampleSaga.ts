import { takeEvery } from 'redux-saga/effects';
import { types as sampleTypes } from '../actions/sampleActions';
import { SagaIterator } from 'redux-saga';

function* sampleGeneratorFunction(action: any): SagaIterator {
    // API async call could happen here

    // const { email } = action.payload;
    // try {
    //     yield api(
    //         '/oauth/challenge',
    //         'POST',
    //         {
    //             username: email,
    //             challenge_type: 'admin-login',
    //         },
    //         true,
    //         false,
    //     );
    //     yield put(sendDynamicLinkSuccess());
    // } catch (e) {
    //     yield put(sendDynamicLinkFailure());
    // }
}

export default function* sampleSaga() {
    yield takeEvery(sampleTypes.SAMPLE_CALLED, sampleGeneratorFunction);
}