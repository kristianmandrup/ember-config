# Design Notes

## Registry

Currently only the package managers *bower*, *npm* and *component* will be supported.

```js
{
  "libraries": {
    "bower": {
      "ember-i18n": {
        "files": ["lib/i18n.js"]
      },
      
      ...
    "npm": {
      "ember-mongoose":   "ember-mongoose",
      ...
    },
    "component": {            
```

### General design

We should maintain a global list of ~20 categories, one per generator. Each generator will then read all the libraries
that share the same category and execute completely declaratively depending on their config!

This will enable developers simply to update the registry and the generator will act accordingly!

*Ember config* should determine if the app uses [libraries](https://github.com/kristianmandrup/libraries). 
If not it should propose to install it (as first step in app generator). When using libraries, it should
install library configs in library registry. Otherwise directly inject imports into `Brocfile.js`.

By default it should show a link to the npmjs.org page and if repo set, also to the repo page.

Should show info before displaying the prompt asking whether to install it, so user can see what it is before deciding!

We should also enable links for more info. We should display description, date and version from the package file.
Ember config should have a site, where people can search for Ember components, rate them and post comments.

- suggestions
- installation
- usage
- problems
- positives

```js
"ember-list-view": {
  "repo": "kristianmandrup/ember-cli-list-view"
  categories: ["ui", "data", "scroll"],  
  links: {
    tips: [
      "http:// ...."
    ],
    guides: [
      "http:// ....",
    ],
    tutorials: [
      ...
    ],
    videos: [
      ...
    ]
  ]
},
```

### Npm

Normally just a simple `alias: npm name` key/value.

`"ember-resize-mixin": "ember-resize-mixin"`

However for some cases we have to provide a repo other than npm.

```js
"ember-list-view": {
  "repo": "kristianmandrup/ember-cli-list-view"
},
```

This could be determined by analyzing the string, so that any string with special chars like "/" would be interpreted
as a repo.

`"ember-list-view": "kristianmandrup/ember-cli-list-view"`

The keywords can easily be retrieved from npmjs.org registry or `package.json`.
Also date, version and other relevant properties...

For correct *categorization*, we need to extend it with our own data.

```js
"ember-list-view": {
  "repo": "kristianmandrup/ember-cli-list-view"
  categories: ["ui", "data", "scroll"]
},
```


