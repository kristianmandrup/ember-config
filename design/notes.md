this._.classify
this._.chain(files[i]).strRight("_").strLeftBack(".html").humanize().value();

`this.engine` takes a template string as the first parameter and a context object as the second and it will run it through the templating engine and returns the results.

this.invoke("onepage:section", {args: ["Demo Section"]}, function(){
    done();
});
