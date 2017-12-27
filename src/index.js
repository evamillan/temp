import angular from 'angular';
import 'angular-spotify';

import {hello} from './app/hello';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'spotify'])
  .config(routesConfig)
  .component('app', hello);
