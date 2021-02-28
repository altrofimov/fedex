# Test Task Fedex

Notes:
* No HTML/CSS framework is used as it will be an overkill for such a small application
* No CSS preprocessor integrated as there are only 150 lines of CSS
* No CSS methodology like BEM was used for for such a small application
* Normalize CSS is used to have consisted styles across the browsers
* Application Accessibility is tested with Screen Reader and Google Lighthouse
* Font sizes where used in pixels intentionally for Accessibility
* For emails validation __RFC 2822 compliant regex__ was used that will match 99.99% of all email addresses in actual use today
* All used libraries are coming from Angular CLI created project by default 
* 100% Unit Tests code coverage (Statements, Branches, Functions and Lines)
* [Design inspiration](https://dribbble.com/shots/14019613-Sign-up-form) regards goes to Pieter-Pleun Korevaar

Areas to improve:
* Add more e2e tests to test all unhappy flows (for password validation, server errors, browsers/devices support)
* Add automated Accessibility tests
* Setup pre-push / pre-commit Husky hooks for
  * Checking code style check
  * Angular Commit Message Convention support
  * Code Linting
* Improve UX so Validation Errors takes User's focus more explicitly when trying to submit the form with errors

Browsers support (same as latest Angular):
* Chrome	latest
* Firefox	latest
* Edge	2 most recent major versions
* IE	11
* Safari	2 most recent major versions
* iOS	2 most recent major versions
* Android	Q (10.0), Pie (9.0), Oreo (8.0), Nougat (7.0) 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

