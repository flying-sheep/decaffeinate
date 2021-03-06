# decaffeinate [![Build Status](https://travis-ci.org/decaffeinate/decaffeinate.svg?branch=master)](https://travis-ci.org/decaffeinate/decaffeinate)

CoffeeScript in, modern JavaScript out.

JavaScript is the future, in part thanks to CoffeeScript. Now that it has served
its purpose, it's time to move on. Convert your CoffeeScript source to modern
JavaScript with decaffeinate.

## Install

```
$ npm install -g decaffeinate
```

See the [Conversion Guide](https://github.com/decaffeinate/decaffeinate/blob/master/docs/conversion-guide.md).

## Status

**Mostly complete.** Check the [issues] page for outstanding bugs and incomplete
features. This project may be relied upon for production use, but no guarantees
are made.

## Goals

* Fully automated conversion of the CoffeeScript language to modern JavaScript.
* Preserve whitespace, formatting, and comments as much as possible to allow
  a full one-time conversion of your CoffeeScript source code.
* Provide helpful error messages when it encounters an unsupported language
  construct.

## Usage

See the output of `decaffeinate --help` after installing.

<hr>

[issues]: https://github.com/decaffeinate/decaffeinate/issues
