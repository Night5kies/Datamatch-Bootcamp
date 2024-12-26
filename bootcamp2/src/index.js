import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';  
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAPeoHXmab_rl6-ilnG0JvijcJQea_g3Ng",
  authDomain: "bootcamp-part-2-c4c74.firebaseapp.com",
  projectId: "bootcamp-part-2-c4c74",
  storageBucket: "bootcamp-part-2-c4c74.firebasestorage.app",
  messagingSenderId: "800174203070",
  appId: "1:800174203070:web:80050e7d4d5bbb5ab47eef",
  databaseURL: "https://bootcamp-part-2-c4c74-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
console.log('Database initialized:', database);

const rrfConfig = {
  userProfile: 'users'
}

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const rrfProps = {
  firebase: app,  
  config: rrfConfig,
  dispatch: store.dispatch,
  database
};

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
