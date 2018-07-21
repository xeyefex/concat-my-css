# concat-my-css

[![Build Status](https://travis-ci.org/robertlandreaux/concat-my-css.svg?branch=master)](https://travis-ci.org/robertlandreaux/concat-my-css.svg?branch=master)

It concatenates and minifies your css.

## Usage

`yarn add concat-my-css --dev`

Create a .env file in your project if you do not already have one. Specify the following environment variables

```
OUTPUT_FILE_NAME="app.css"
OUTPUT_DIR="dist/"
SRC_DIR="src/css"
```

Run `./node-modules/.bin/buildCss` or add an npm script like

`"build:css": "buildCss"`
