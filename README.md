# generator-ember-config [![Build Status](https://secure.travis-ci.org/kristianmandrup/generator-ember-config.png?branch=master)](https://travis-ci.org/kristianmandrup/generator-ember-config)

> [Yeoman](http://yeoman.io) generator

## Getting Started

Use this generator to quickly setup your ember-cli based project :)
Limit the buggy copy/paste needed to setup asset compilers etc.!

### What is Yeoman?

![](http://i.imgur.com/JHaAlBJ.png)

To install Yeoman:

```bash
npm install -g yo
```

### Yeoman Generators

To install *generator-ember-config* from npm, run:

```bash
npm install -g generator-ember-config
```

Finally, initiate the generator:

```bash
yo ember-config
```

### Getting To Know Yeoman

If you'd like to get to know Yeoman better: [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Usage guide

The generator will start with the following:

*Welcome to Ember Configurator*

`Select configurations:`

By default the following are selected: `layout, script, css`

Depending on which configurators you select in the main menu, it will start each one consecutively to allow you to customize your application accordingly :)

### Script

Select one of the following:

- javascript (none - default)
- coffeescript
- livescript
- emberscript (experimental!)

### CSS precompilers

- CSS (none - default)
- LESS
- SASS (scss)
- Compass (SASS + Compass)

### Layout

- Twitter Bootstrap 3.x

and many more...

## Design

`node-fs-extra`, `node-glob` for extra file system utils.
`string.js` and `string-mutator` for string utils and manipulations.

And much more...

## User config

Storing user configuration options and sharing them between sub-generator is a common task. For example, it is common to share preferences like the language (does the user use CoffeeScript?), style options (indenting with spaces or tabs), etc.

These configuration can be stored in the `.yo-rc.json` file through the Yeoman Storage API. This API is accessible through the `generator.config` object.

## License

MIT
