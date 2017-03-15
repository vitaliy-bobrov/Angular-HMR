# Angular Hot Loader

[![Build Status](https://travis-ci.org/vitaliy-bobrov/angular-hot-loader.svg?branch=master)](https://travis-ci.org/vitaliy-bobrov/angular-hot-loader)
[![npm version](https://badge.fury.io/js/angular-hot-loader.svg)](https://badge.fury.io/js/angular-hot-loader)
[![npm](https://img.shields.io/npm/dt/angular-hot-loader.svg)](https://github.com/vitaliy-bobrov/angular-hot-loader)

🔥 Webpack Hot Module Replacement for Angular 1.x applications.

**Now works only with UI Router**

Forked from [Angular-HMR](https://github.com/yargalot/Angular-HMR)

## Installation
  - npm
  ```bash
  npm install --save-dev angular-hot-loader
  ```

  - yarn
  ```bash
  yarn add --dev angular-hot-loader
  ```

## Webpack setup

* Webpack 2.x:
```js
rules: [
  {
    test: /\.js$/,
    use: [
      'angular-hot-loader',
      // Any other loaders.
    ]
  }
]
```

With options:

```js
rules: [
  {
    test: /\.js$/,
    use: [
      {
        loader: 'angular-hot-loader',
        options: {
          log: true
        }
      },
      // Any other loaders.
    ]
  }
]
```

* Webpack 1.x:
```js
loaders: [
  {
    test: /\.js$/,
    loader: 'angular-hot!...other loaders'
  }
]
```

### Webpack Hot Module Replacement setup:
See Webpack documentation:
- [Webpack 2.x](https://webpack.js.org/configuration/dev-server/#devserver-hot)
- [Webpack 1.x](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html)

## Options

### rootElement {String}
Default: `[ng-app]`

Specifies application DOM root element selector.

### log {Boolean}
Default: `false`

Enables module output to console.

## How it works
This will inject the new controller / template / service / whatever and then reload the state in UI Router.

### Example app structure:

```js
import MyFactory from './your-factory';
import MyCtrl from './your-controller';
import MyComponent from './your-component';

angular
  .module('my-app', [ui.router])
  .directive('MyDirective', require('MyDirective'))
  .factory('MyFactory', MyFactory)
  .controller('MyCtrl', MyCtrl)
  .component('myComponent', MyComponent);
```
