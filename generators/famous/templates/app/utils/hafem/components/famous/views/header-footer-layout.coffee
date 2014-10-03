`import Hafem from '../../../directives/famous'`

Component = Hafem.LayoutComponent.extend

  classNames: ['famous-context', 'famous-views-header-footer-layout']

  famous:
    _type: Ember.A(['famous', 'famous-dom-consumer', 'famous-header-footer-layout'])

  'fa-footer-size': 100

  clazz: 'HeaderFooterLayout'

`export default Component`