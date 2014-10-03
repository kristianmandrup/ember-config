Decorator = Ember.Object.extend

  isolate:
    get: (source, type = 'famous-dom-consumer', direction = 'up') ->
      @getNearest(source, type)

    getNearest: (source, type)->

      parentView = source.get('parentView')
      unless parentView
        return

      parentViewIsFamous = parentView.get('famous')
      unless parentViewIsFamous
        return @getNearest(parentView, type)

      parentViewFamousTypes = parentView.get('famous._type')
      unless parentViewFamousTypes
        return

      unless parentViewFamousTypes.contains(type)
        return @getNearest(parentView, type)


      return Ember.View.views[parentView.get('elementId')]

`export default Decorator`
