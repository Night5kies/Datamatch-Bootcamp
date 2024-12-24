import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPeoHXmab_rl6-ilnG0JvijcJQea_g3Ng",
  authDomain: "bootcamp-part-2-c4c74.firebaseapp.com",
  projectId: "bootcamp-part-2-c4c74",
  storageBucket: "bootcamp-part-2-c4c74.firebasestorage.app",
  messagingSenderId: "800174203070",
  appId: "1:800174203070:web:80050e7d4d5bbb5ab47eef"
};

// Initialize Firebase (v9+ modular)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Example: Get Auth instance

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

// Root reducer
const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const initialState = {};
const store = createStore(rootReducer, initialState);

// Pass Firebase app instance to RRF Provider
const rrfProps = {
  firebase: app,  // Use the initialized app instance
  config: rrfConfig,
  dispatch: store.dispatch
};

// React DOM rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);
