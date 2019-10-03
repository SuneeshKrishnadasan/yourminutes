import { init } from "@rematch/core";
import * as models from "../model";
import {routerMiddleware } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form';
const routeMiddleware = routerMiddleware();
const middlewares = [routeMiddleware];
const store = init({
  redux: {
    reducers: {
      router:{},
      form: formReducer

    },
    middlewares: middlewares
  },
  models
});

export { store };