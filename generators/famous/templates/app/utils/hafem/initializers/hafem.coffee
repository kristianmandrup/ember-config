`import HafemDecorator from '../services/famous/Decorator'`

`import HafemAnimationComponent from '../components/famous/core/animation'`
`import HafemEngineComponent from '../components/famous/core/engine'`
`import HafemModifierComponent from '../components/famous/core/modifier'`
`import HafemSurfaceomponent from '../components/famous/core/surface'`
`import HafemViewComponent from '../components/famous/core/view'`

`import HafemScrollviewComponent from '../components/famous/views/scrollview'`
`import HafemGridLayoutComponent from '../components/famous/views/grid-layout'`
`import HafemSequentialLayoutComponent from '../components/famous/views/sequential-layout'`
`import HafemFlexibleLayoutComponent from '../components/famous/views/flexible-layout'`
`import HafemHeaderFooterLayoutComponent from '../components/famous/views/header-footer-layout'`
`import HafemHeaderFooterLayoutHeaderComponent from '../components/famous/views/header-footer-layout/header'`
`import HafemHeaderFooterLayoutContentComponent from '../components/famous/views/header-footer-layout/content'`
`import HafemHeaderFooterLayoutFooterComponent from '../components/famous/views/header-footer-layout/footer'`


HafemInitializer =
  name: "hafem"

  initialize: (container, application) ->

    ###
    Isolate
    ###
    application.register 'hafem:isolate', HafemDecorator
    application.inject 'component', 'hafem', 'hafem:isolate'
    application.inject 'controller', 'hafem', 'hafem:isolate'
    application.inject 'route', 'hafem', 'hafem:isolate'

    ###
    Components
    ###
    container.register('component:fa-animation', HafemAnimationComponent);
    container.register('component:fa-engine', HafemEngineComponent);
    container.register('component:fa-modifier', HafemModifierComponent);
    container.register('component:fa-surface', HafemSurfaceomponent);
    container.register('component:fa-view', HafemViewComponent);

    container.register('component:fa-scrollview', HafemScrollviewComponent);
    container.register('component:fa-grid-layout', HafemGridLayoutComponent);
    container.register('component:fa-sequential-layout', HafemSequentialLayoutComponent);
    container.register('component:fa-flexible-layout', HafemFlexibleLayoutComponent);
    container.register('component:fa-header-footer-layout', HafemHeaderFooterLayoutComponent);
    container.register('component:fa-header-footer-layout-header', HafemHeaderFooterLayoutHeaderComponent);
    container.register('component:fa-header-footer-layout-content', HafemHeaderFooterLayoutContentComponent);
    container.register('component:fa-header-footer-layout-footer', HafemHeaderFooterLayoutFooterComponent);


`export default HafemInitializer`