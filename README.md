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

[your feedback](https://groups.google.com/forum/#!forum/ember-config-generator)

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

Additionally, the following configurators are available:

- Test (qunit)
- Adapters (firebase, emberfire, fireplace)
- Fonts (awesome, ...)
- Components 
	- libs (ember, bootstrap, forms)
	- individual (pagination, , ...)
- Mobile (cordova, ratchet, appjs)
- Auth (simple-auth)
- Addons (i18n, validation, ...)
- Libs (pour-over, ...)
- ES6 harmony (esnext)
- Animations (liquid-fire, velocity)
- Gestures (hammer, touchy, ... )
- Upload (uploader, droplet, ...)
- Sails full stack app :)

The App config generator will invoke a sub-generator for each.
Some of these sub-generators in turn invokes more sub-generators depending on
your configuration and selections ;)

### Scripting language

Installs a javascript precompiler of your choice.

- Javascript (+ ESnext option)
- Coffeescript
- Livescript
- Emberscript (experimental)

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

- Twitter Bootstrap 3.2 (css, sass)
- Zurb Foundation 5.4 (css, sass)
- Ink
- Pure
- Gumby
- *alternative*

*Alternative layout frameworks*

- Semantic UI
- Flat UI (bootstrap theme)
- Brick (web components!?)

(TODO ?)
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

- Date picker
- List view
- Radio buttons
- Table

### Adapters

Adds and configures an adapter for data storage/retrieval

- Firebase
    + Emberfire
    + Fireplace
- Local storage
- Sync (offline)

### Auth

Adds authentication

- Simple auth
- others (TODO)

### Fonts

Adds font libraries

- Font awesome
- others (TODO)

### Test

- Qunit
- others (TODO: when alternative test adapters are available)

### Mobile

- Cordova
- Ratchet
- App.js 

### Animations

- LiquidFire
- Velocity

See demo @ https://github.com/ef4/ember-animation-demo

### Addons

- i18n
- Pagination
- Auto-properties
- Date helpers
- Notify
- Data factory
- Validations
- Moment

## Uploaders

- Uploader
- Droplet
- Upload (experimental)

### Full stack integrations

- Sails

## Design

Uses an `aid` object found in `lib\aid` for much of the functionality. 
Needs major refactoring!

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
