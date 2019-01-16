import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Firebase imports
import firebase from '@firebase/app';
import '@firebase/firestore';
//@ts-ignore
import { FirestoreProvider } from 'react-firestore';

import './index.css';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/rootReducer';
import sampleSaga from './sagas/sampleSaga';
import TestComponent from './Component';

import Config from './Config';

const config = {
  apiKey: Config.FIREBASE_API_KEY,
  projectId: Config.FIREBASE_PROJECT_ID,
};
firebase.initializeApp(config);

const sagaMiddleware = createSagaMiddleware();

//@ts-ignore to allow for redux dev-tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ),

);

ReactDOM.render(
  <Provider store={store}>
    <FirestoreProvider firebase={firebase} useTimestampsInSnapshots>
      <Router>
        <Switch>
          <Route path="/" component={TestComponent} />
        </Switch>
      </Router>
    </FirestoreProvider>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

sagaMiddleware.run(sampleSaga);
