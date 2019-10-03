import React, {Component} from 'react';
import  Navigator  from "../navigator";
import { Provider } from "react-redux";
import { store } from "../store";

export default class App extends React.Component {
  render() {
    return (
     <Provider store={store}>
           <Navigator />
      </Provider>
); 
  }
}
