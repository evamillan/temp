import angular from 'angular';
import 'angular-spotify';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import svgAssetsCache from 'svg-assets-cache';

import {hello} from './app/hello';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'spotify', 'ngMaterial', 'svgAssetsCache'])
  .config(routesConfig)
  .component('app', hello)
  .filter('removeDash', function () {
    return function (item) {
      return item.replace(/\-/g, ' ');
    };
  })
