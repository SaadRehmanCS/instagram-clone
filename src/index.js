import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { FieldValue, firebase } from './lib/firebase';
import './styles/app.css';

// import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// reportWebVitals();
