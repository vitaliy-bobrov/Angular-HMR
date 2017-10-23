## 0.9.11
- Update documentation with notes about inline function inside angular methods declaration.

## 0.9.10
### Dependencies update
### Bug Fixes:
- Add config functions cache
- Update module RegExp to match all module definitions
- Update recompile functionality

## 0.9.9
### Dependencies update
### Code style updates

## 0.9.8
### Bug Fixes:
- Cache allow same names for different angular parts.

## 0.9.7
### Bug Fixes:
- Move match logging to avoid undefined `map`.

## 0.9.6
### Bug Fixes:
- Fixed **babel-runtime**: Make usage possible.

## 0.9.5
### Bug Fixes:
- Fixed **decorator**: Add decorator invoke.

## 0.9.4
### Bug Fixes:
- Fixed **filter**: Add filter invoke.
- Fixed **factory**: Use cached factory if exists.

### Dependencies update

## 0.9.3
### Bug Fixes:
- Fixed **windows path**: Windows path missed slahes, thanks @Sn0wFox.

## 0.9.2
### Bug Fixes:
- Fixed **controller transform**: $element, $attrs and $transclude are locals, not providers, thanks @joaovieira.

## 0.9.1
### Bug Fixes:
- Fixed **directive**: $injector for directives, thanks @joaovieira.

## 0.9.0
### Bug Fixes:
- Fixed: handle multiple async modules, es6 classes, thanks @joaovieira.
- Fixed: no options bug, thanks @joaovieira.

### Improvements:
- Updated README with links to Webpack HMR configuration.
- Added angular as PeerDependency.
- Added linting.
- Added logger.
- Code style fixes and cleanup.
