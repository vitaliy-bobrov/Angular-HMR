# Angular Hot Loader

[![npm version](https://badge.fury.io/js/angular-hot-loader.svg)](https://badge.fury.io/js/angular-hot-loader)

Webpack loader for Hot Module Replacement in Angular 1.x applications.

Now works only with UI Router with a specific app structure shown below.

Forked from [Angular-HMR](https://github.com/yargalot/Angular-HMR)

## Webpack setup

1. Install loader:
```bash
npm install --save-dev angular-hot-loader
```
2. Add loader to webpack configuration:
```js
loaders: [
  {
    test: /\.js$/,
    loader: 'angular-hot!...other loaders'
  }
]
```

## Options

### rootElement {String}
Default: `[ng-app]`
Specifies application DOM root element selector.

### log {Boolean}
Default: `true`
Enables module output to console.

## How it works
This will inject the new controller / template then reload the state in UI Router

Your app structure should be something like:

```js
import MyDirective from './your-directive';
import MyFactory from './your-factory';
import MyCtrl from './your-controller';

angular
  .module('my-app', [ui.router])
  .directive('MyDirective', MyDirective)
  .factory('MyFactory', MyFactory)
  .controller('MyCtrl', MyCtrl);
```

and you save that the browser should refresh
