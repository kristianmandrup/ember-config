Ember famous
=====

Based on the [HAFEM project](https://github.com/s4dc/hafem)

## Architecture/Design

- Uses [ember-cli](ember-cli.com)
- Bower directory is `vendor/`

`Brocfile.js`

```javascript
// Use this to add additional libraries to the generated output files.

app.import('vendor/famous/polyfills.js');
app.import('vendor/famous/famous.js');
app.import('vendor/famous/famous.css');
```

*utils/hafem*

Contains all the *hafem* libaray utils . Add your own *famo.us* utils here or tweak the existing ones to your liking ;)
Most of the utils are *components* and *directives*. 

Example:

*fa-flexible-layout* component:

Registered in the *hafem* initializer

```coffeecript
# hafem/initializers/hafem.coffee

container.register('component:fa-flexible-layout', HafemFlexibleLayoutComponent);
```

`import HafemFlexibleLayoutComponent from '../components/famous/views/flexible-layout'`

So the component can be found in `utils/hafem/components/famous/views/flexible-layout.coffee`

A basic component looks something like this (in original hafem project)...

```coffeecript
Component = Hafem.Component.extend
  # ... 
  surfaces: []

  init: ->
    @_super()
    @set('surfaces', [])

  willInsertFamous: ->
    layout = new Famous.Views.FlexibleLayout(
      ratios: eval(@get('fa-ratio'))
      direction: 0
    )

    layout.sequenceFrom @get('surfaces')
    @hafem.isolate.get(@).addTo(layout)

`export default Component`  
```

A more declarative style is now possible since shared logic has been extracted into a base class `Hafem.LayoutComponent`:  

```coffeecript
Component = Hafem.LayoutComponent.extend
  # ... 
  ratios: ->
    eval @get('fa-ratio')

  properties: ->
    ratios: @ratios()
    direction: 0

  clazz: 'FlexibleLayout'
```

In `directives/famous.coffee` we build up the `Hafem` object that is used everywhere. 
Please help improve this design further ;)

```coffeecript
`import Hafem_Component from './ember/views/component'`

Hafem = {
  Component: Hafem_Component
  LayoutComponent: Hafem_Layout_Component
  HflComponent: Hafem_Hfl_Component
  Famous:
    Core:
      Engine: Hafem_Famous_Core_Engine
```

The basic `Hafem.Component` that we extend, is found in `directives/ember/views/component.coffee`
The most essential parts of it shown here:

```coffeecript
Component = Ember.Component.extend
  # ...

  addTo: (source) ->
    @get('fa').add(source)

  init: ->
    @_super()

  _afterRender: ->
    @willInsertFamous()

  willInsertElement: ->
    Ember.run.scheduleOnce('afterRender', @, @_afterRender)
    @_super()

  didInsertElement: ->
    @_super()

  willInsertFamous: ->

  didInsertFamous: ->
```

## Getting started

`npm install`

`ember build` => builds to `dist/` folder

`open dist/index.html`

Or even better, just launch `ember serve` if using *ember cli*

## Examples:

Presentations:

- [ember-famous](http://www.slideshare.net/artemsuschev/ember-famous)

By Artem Suschev [@asuschev](https://twitter.com/asuschev) on github @ [H1D](https://github.com/H1D) 

Code examples:

- [drag a tomster](http://jsbin.com/yiyan/2/edit)
