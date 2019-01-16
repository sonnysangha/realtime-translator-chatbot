import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import Config from './Config';
import * as cors from 'cors';

const corsHandler = cors({ origin: true });
admin.initializeApp();

// List of output languages.
const LANGUAGES = ['es', 'fr', 'ar', 'pa', 'nl'];

// URL to the Google Translate API.
function createTranslateUrl(lang: string, text: string) {
    return `https://www.googleapis.com/language/translate/v2?key=${Config.FIREBASE_API_KEY}&source=en&target=${lang}&q=${text}`;
}

async function createTranslationPromise(lang: string, id: string, data: any) {
    const text = data.phrase;
    const translation: any = {};
    const translateUrl: string = createTranslateUrl(lang, text);

    const promise = await axios.get(translateUrl).then(
        response => {
            if (response.status === 200) {
                const resData = response.data;
                translation[lang] = resData.data.translations[0].translatedText;

                return admin.firestore().doc(`/phrases/${id}`)
                    .set(translation, { merge: true });
            }
            else return response.data;
        }
    );
    return promise;
}

export const addPhraseToFirestore = functions.https.onRequest((request, response) => {
    // Enable CORS using the `cors` express middleware.
    corsHandler(request, response, async () => {
        const phrase = request.body.phrase;
        const datetime = request.body.datetime;

        admin.firestore().collection('phrases').add({
            phrase,
            datetime
        }).then(() => {
            response.status(200).send();
        }).catch(reason => {
            response.status(500).send(reason);
        })
    })

});

export const translate = functions.firestore.document('/phrases/{id}').onWrite((change, context) => {
    const snapshot = change.after;
    const data = snapshot.data();
    const id = snapshot.id;

    const promises: any[] = [];
    LANGUAGES.forEach((lang: string) => {
        promises.push(createTranslationPromise(lang, id, data));
    })

    return Promise.all(promises)

});
