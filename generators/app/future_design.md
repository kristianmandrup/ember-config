## Future design

To enable overriding...

```
this.hookFor('fonts', {
  as: 'ember-config:font' 
});    

this.hookFor('adapters', {
  as: 'ember-config:adapter' 
});    

this.hookFor('tests', {

  as: 'ember-config:test' 
});    

this.hookFor('scripts', {
  as: 'ember-config:script' 
});  
```
