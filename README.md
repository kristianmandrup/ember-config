# generator-ember-config [![Build Status](https://secure.travis-ci.org/kristianmandrup/generator-ember-config.png?branch=master)](https://travis-ci.org/kristianmandrup/generator-ember-config)

> [Yeoman](http://yeoman.io) generator

## Getting Started

Use this generator to quickly setup your *ember-cli* based *Ember* project :)

*Limit*

- Copy/paste to configure your project for asset compilers etc.
- Having to hunt down which `npm` or `bower` commands to execute
- Having to manually link all the pieces correctly together in various files

*Configure and Enjoy!!*

_Please help out improve/add sub-generators!_

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

```bash
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

- Script (javascript (+ esnext), coffeescript, livescript)
- CSS (css, less, sass, compass)
- Templating (handlebars, emblem)
- Layout (bootstrap, foundation, ...)

Additionally, the following configurators can be chosen:
- Test (qunit)
- Adapters (firebase)
- Fonts (awesome)
- Components (ember, bootstrap)
- Mobile (cordova, ratchet)
- Auth (simple-auth)
- Addons (pagination, forms, ...)
- Libs (TODO)
- ES6 (esnext)
- Animations
- Gestures (for touch devices!)

The App config generator will invoke a sub-generator for each.
Some of these sub-generators in turn invokes more sub-generators depending on
your configuration and selections ;)

### Scripting language

Installs a javascript precompiler of your choice.

- javascript (+ esnext option)
- coffeescript
- livescript
- emberscript (experimental!)

### CSS precompilers

Installs a CSS precompiler of your choice.

- CSS (none - default)
- LESS
- SASS (scss)
- Compass (SASS + Compass)

### Templating

Installs a templating framework of your choice

- Handlebars
- Emblem (soon w blueprints)

### Layout

Installs a layout framework of your choice

- Twitter Bootstrap
- Zurb Foundation
- Ink
- Pure
- Gumby
- *alternative*

*Alternative layout frameworks*

- Semantic UI
- Flat UI (bootstrap theme)
- Brick (web components!?)

(TODO)
- UI-kit
- Bootflat
- Cascade
- Skeleton
- more... ??

Note: You are most welcome to add your own layout generator and invoke it from here ;)

### Components

*Component libs*

- Bootstrap for ember
- Ember components
- Ember Forms

*Components*

- date picker
- list view
- radio buttons
- table

### Adapters

Adds and configures an adapter for data storage/retrieval

- firebase
    + emberfire
    + fireplace
- local storage (TODO)

### Auth

Adds authentication

- simple auth
- others (TODO)

### Fonts

Adds font libraries

- Font awesome
- others (TODO)

### Test

- Qunit
- others (TODO: when alternative test adapters are available)

### Mobile

- cordova
- ratchet
- kik app (kikinteractive: App.js)

### Animations

- LiquidFire

See https://github.com/ef4/ember-animation-demo

### Addons

- i18n
- pagination
- auto-properties
- date helpers
- notify
- data factory
- validations
- velocity (animation)

## Design

Uses an `aid` object found in `lib\aid` for much of the functionality. 
Needs refactoring!

TODO:
- Make use of User Config, pass options between generators
- Create Project stats object, which collects info about the project (what is currently used/installed)

## User config (TODO)

Would be awesome to take advantage of Yo User Config:

From the "yo generator authoring" site:

_"Storing user configuration options and sharing them between sub-generator is a common task. For example, it is common to share preferences like the language (does the user use CoffeeScript?), style options (indenting with spaces or tabs), etc."_

_"These configuration can be stored in the `.yo-rc.json` file through the Yeoman Storage API. This API is accessible through the `generator.config` object."_

## License

MIT
