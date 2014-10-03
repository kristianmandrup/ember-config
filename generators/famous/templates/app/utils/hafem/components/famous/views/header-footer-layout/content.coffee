`import Hafem from '../../../../directives/famous'`


Component = Hafem.HflComponent.extend

  classNames: ['famous-context', 'famous-views-header-footer-layout-content']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-header-footer-layout-content'])

  targetName: 'content'

  willInsertFamous: ->

`export default Component`
