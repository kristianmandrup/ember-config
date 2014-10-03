HafemCoreSurface = (options) ->
  self = @
  Surface = Famous.Core.Surface
  surface = new Surface(options)

  surface.setup = (allocator) ->
    if options.target
      Surface::elementType = options.target
      allocator.allocate = (type) ->
        result = type
        @nodeCount++
        result
    else
      Surface::elementType = if options.elementType then options.elementType else Surface::elementType

    Surface::setup.call(@, allocator)
    return


  surface.deploy = (target) ->
    Surface::deploy.call(surface, target)


  surface.cleanup = (allocator) ->
    allocator.deallocate = (type) ->
      return
    Surface::cleanup.call(surface, allocator)


  surface.recall = (target) ->
    return

  surface

`export default HafemCoreSurface`
