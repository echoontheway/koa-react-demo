import style from "./main.css";
import App from "./App";
import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, 
document.getElementById("app"));