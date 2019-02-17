# IU Test

This project was specially made for a test, as requested in: [This repository](https://github.com/zemoga/ui-test).



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Clone this repository. Two branches were created for this project. Both are merged in Master branch.

### Installing

Use npm install to download all the dependencies.

```
npm install / yarn
```

## Development

Use gulp to start the development server.

```
gulp
```


If you are not in the mood to install any dependency, just go ahead and check the coplied files. You can find them under dist/index.html

__


### Templates

The templates and components are made with Pug and there are located in src/snippets, you can get more information in its page: https://pugjs.org/

## Styles

A prefix "rt-" (stands for: Rule of Thumb ) was used for the clases, as well as BEM methodology for naming conventions. SCSS was the chosen one as the precompiler, this source files can be found under src/scss.

## BONUS: Dynamic styleguide included

i have included an special living styleguide, where you will find all definitions, styles, and code examples for: Color variables, breakpoints, fonts, typography, default buttons, components and structures... specially made for this project. Go ahead and check:

```
dist/styleguide/index.html
```

## Javascript

A single JS file was created depending on its own component. A compiled version can be found in: dist/static/js/main.js


## Built With

* [Gulp](hhttps://gulpjs.com/)
* [Nucleus](https://holidaypirates.github.io/nucleus/) - For the living styleguide
* [Gulp Eslint](https://www.npmjs.com/package/gulp-eslint) - For testing purposes


## Acknowledgments

* Will improve this code in the future. More time needed :(.