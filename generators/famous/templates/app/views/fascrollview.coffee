`import HafemCoreEngine from '../utils/hafem/directives/famous/core/Engine'`
`import HafemCoreSurface from '../utils/hafem/directives/famous/core/Surface'`
`import HafemViewsScrollview from '../utils/hafem/directives/famous/views/Scrollview'`

View = Ember.View.extend
  didInsertElement: ->
    useHafem = true

    Engine = if useHafem then HafemCoreEngine else famous.core.Engine
    Surface = if useHafem then HafemCoreSurface else famous.core.Surface
    Scrollview = if useHafem then HafemViewsScrollview else famous.views.Scrollview

    self = @

    @set('surfaces', [])

    mainContext = Engine.createContext($('#test-context')[0])

    scrollview = new Scrollview()

    scrollview.sequenceFrom @get('surfaces')

    mainContext.add scrollview

    i = 0

    while i < 40
      temp = new Surface(
        content: "Surface: " + (i + 1)
        size: [
          `undefined`
          200
        ]
        properties:
          backgroundColor: "hsl(" + (i * 360 / 40) + ", 100%, 50%)"
      )

      temp.pipe scrollview

      self.get('surfaces').push temp

      i++


    
`export default View`