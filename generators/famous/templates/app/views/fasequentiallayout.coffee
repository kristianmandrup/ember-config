`import HafemCoreEngine from '../utils/hafem/directives/famous/core/Engine'`
`import HafemCoreSurface from '../utils/hafem/directives/famous/core/Surface'`
`import HafemViewsSequentialLayout from '../utils/hafem/directives/famous/views/SequentialLayout'`

View = Ember.View.extend
  didInsertElement: ->
    useHafem = true

    Engine = if useHafem then HafemCoreEngine else famous.core.Engine
    Surface = if useHafem then HafemCoreSurface else famous.core.Surface
    SequentialLayout = if useHafem then HafemViewsSequentialLayout else famous.views.SequentialLayout


    mainContext = Engine.createContext()
    sequentialLayout = new SequentialLayout()

    surfaces = []

    sequentialLayout.sequenceFrom surfaces

    i = 0

    while i < 10
      surfaces.push new Surface(
        size: [
          `undefined`
          50
        ]
        properties:
          backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)"
      )
      i++

    mainContext.add sequentialLayout


    
`export default View`