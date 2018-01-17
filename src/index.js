import angular from 'angular';
import 'angular-spotify';
import 'angular-material';

import {hello} from './app/hello';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'spotify', 'ngMaterial'])
  .config(routesConfig)
  .component('app', hello)
  .filter('removeDash', function () {
    return function (item) {
      return item.replace(/\-/g, ' ');
    };
  })
