# Angular Hot Loader

[![npm version](https://badge.fury.io/js/angular-hot-loader.svg)](https://badge.fury.io/js/angular-hot-loader)
[![npm](https://img.shields.io/npm/dt/angular-hot-loader.svg)](https://github.com/vitaliy-bobrov/angular-hot-loader)

🔥 Webpack loader for Hot Module Replacement in Angular 1.x applications.

Now works only with UI Router with a specific app structure shown below.

Forked from [Angular-HMR](https://github.com/yargalot/Angular-HMR)

## Webpack setup

1. Install loader:
* npm
```bash
npm install --save-dev angular-hot-loader
```

* yarn
```bash
yarn add --dev angular-hot-loader
```

2. Add loader to webpack configuration:

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

* Webpack 1.x:
```js
loaders: [
  {
    test: /\.js$/,
    loader: 'angular-hot!...other loaders'
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

### Webpack Hot Module Replacement
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
This will inject the new controller / template then reload the state in UI Router

Your app structure should be something like:

```js
import MyFactory from './your-factory';
import MyCtrl from './your-controller';
import MyComponent from './your-component';

angular
  .module('my-app', [ui.router])
  .directive('MyDirective', reqire('MyDirective'))
  .factory('MyFactory', MyFactory)
  .controller('MyCtrl', MyCtrl)
  .component('MyComponent', MyComponent);
```

and you save that the browser should refresh
