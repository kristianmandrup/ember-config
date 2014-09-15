# generator-ember-config [![Build Status](https://secure.travis-ci.org/kristianmandrup/generator-ember-config.png?branch=master)](https://travis-ci.org/kristianmandrup/generator-ember-config)

> [Yeoman](http://yeoman.io) generator

## Getting Started

Use this generator to quickly setup your *ember-cli* based *Ember* project :)

Limit the buggy copy/paste needed to setup asset compilers, layout frameworks etc.!

Enjoy! (and please help out improve/add sub-generators!)

### Install Yeoman

![](http://i.imgur.com/JHaAlBJ.png)

```bash
npm install -g yo
```

### Install ember-config

```bash
npm install -g generator-ember-config
```

Start the generator!

```bash
yo ember-config
```

To use the the generator directly from github, do the following:

```
git clone https://github.com/kristianmandrup/ember-config.git
cd ember-config
npm link
```

Note: This approach is also useful when you want to contribute to _ember-config_, however in that case you should use your own forked version.

### Getting To Know Yeoman

For more on Yeoman: [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Usage

The generator should be used right after you have created an _ember-cli_ based *Ember* application. Use this generator to setup your basic app infrastructure.

### Guide

The generator will start with the following:

*Welcome to Ember Configurator*

`Select configurations:`

By default the following are selected: 

- Scripts (coffee, livescript, ...)
- CSS (less, sass, compass, ...)
- Templating (handlebars, emblem)

The App config generator will invoke a sub-generator for each configuration chosen in the main menu :)

Note: Currently only the pre-selected options have a fully functional sub-generator. Please help fill in the gaps!

### Scripting language

If you choose a scripting language other than javascript, a precompiler for
that language will be installed which precompiles to javascript.

Note: The existing main `app` and `router` files will be replaced.

- javascript (none - default)
- coffeescript
- livescript
- emberscript (experimental!)

### CSS precompilers

Installs a precompiler of your choice. The precompiler will compile to CSS.

- CSS (none - default)
- LESS
- SASS (scss)
- Compass (SASS + Compass)

### Templating

Installs a templating framework of your choice

- Handlebars
- Emblem

### Layout

Installs a layout framework

- Twitter Bootstrap
- Zurb Foundation
- Ink
- Pure
- Brick
- Gumby
- Other

Alternative layout frameworks:

- semantic-ui
- flat-ui
- ui-kit
- bootflat
- cascade
- skeleton

You are welcome to add your own generator and invoke it from here ;)

### Components

Adds a component library

- Bootstrap for ember
- Ember components

### Adapters

Adds and configures an adapter for data storage/retrieval

- firebase
    + emberfire
    + fireplace
- local storage

### Auth

Adds authentication

- simple auth

### Fonts

Adds font libraries

- Font awesome
- Icon font

## Design

`node-fs-extra`, `node-glob` for extra file system utils.
`string.js` and `string-mutator` for string utils and manipulations.

And many more...

## User config

Storing user configuration options and sharing them between sub-generator is a common task. For example, it is common to share preferences like the language (does the user use CoffeeScript?), style options (indenting with spaces or tabs), etc.

These configuration can be stored in the `.yo-rc.json` file through the Yeoman Storage API. This API is accessible through the `generator.config` object.

## License

MIT
