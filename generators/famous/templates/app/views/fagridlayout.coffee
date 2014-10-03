`import HafemCoreEngine from '../utils/hafem/directives/famous/core/Engine'`
`import HafemCoreSurface from '../utils/hafem/directives/famous/core/Surface'`
`import HafemViewsGridLayout from '../utils/hafem/directives/famous/views/GridLayout'`

View = Ember.View.extend
  didInsertElement: ->
    useHafem = true

    Engine = if useHafem then HafemCoreEngine else famous.core.Engine
    Surface = if useHafem then HafemCoreSurface else famous.core.Surface
    GridLayout = if useHafem then HafemViewsGridLayout else famous.views.GridLayout

    mainContext = Engine.createContext()
    grid = new GridLayout(dimensions: [
      4
      1
    ])
    surfaces = []
    grid.sequenceFrom surfaces
    i = 0

    while i < 8
      surfaces.push new Surface(
        content: "panel " + (i + 1)
        size: [
          `undefined`
          `undefined`
        ]
        properties:
          backgroundColor: "hsl(" + (i * 360 / 8) + ", 100%, 50%)"
          color: "#404040"
          lineHeight: "200px"
          textAlign: "center"
      )
      i++
    mainContext.add grid


    
`export default View`