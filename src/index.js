import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'tw-elements';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store.js"

ReactDOM.render(
<BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
</BrowserRouter>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
