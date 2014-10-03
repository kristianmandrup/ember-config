# Can be used to mixin on application router or a route etc. (see Hafem application router)
Mixin = Ember.Mixin.create
  model: ->
    elements = []
    i = 0

    transitions = ['Hafem.Famous.Transitions.Easing.inQuad', 'Hafem.Famous.Transitions.Easing.outQuad', 'Hafem.Famous.Transitions.Easing.inOutQuad', 'Hafem.Famous.Transitions.Easing.inCubic', 'Hafem.Famous.Transitions.Easing.outCubic', 'Hafem.Famous.Transitions.Easing.inOutCubic', 'Hafem.Famous.Transitions.Easing.inQuart', 'Hafem.Famous.Transitions.Easing.outQuart', 'Hafem.Famous.Transitions.Easing.inOutQuart', 'Hafem.Famous.Transitions.Easing.inQuint', 'Hafem.Famous.Transitions.Easing.outQuint', 'Hafem.Famous.Transitions.Easing.inOutQuint', 'Hafem.Famous.Transitions.Easing.inSine', 'Hafem.Famous.Transitions.Easing.outSine', 'Hafem.Famous.Transitions.Easing.inOutSine', 'Hafem.Famous.Transitions.Easing.inExpo', 'Hafem.Famous.Transitions.Easing.outExpo', 'Hafem.Famous.Transitions.Easing.inOutExpo', 'Hafem.Famous.Transitions.Easing.inCirc', 'Hafem.Famous.Transitions.Easing.outCirc', 'Hafem.Famous.Transitions.Easing.inOutCirc', 'Hafem.Famous.Transitions.Easing.inElastic', 'Hafem.Famous.Transitions.Easing.outElastic', 'Hafem.Famous.Transitions.Easing.inOutElastic', 'Hafem.Famous.Transitions.Easing.inBack', 'Hafem.Famous.Transitions.Easing.outBack', 'Hafem.Famous.Transitions.Easing.inOutBack', 'Hafem.Famous.Transitions.Easing.inBounce', 'Hafem.Famous.Transitions.Easing.outBounce', 'Hafem.Famous.Transitions.Easing.inOutBounce']
    colors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed ', 'Indigo ', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen']

    while i < 8
      color = colors[Math.floor(Math.random()*colors.length)]
      wh = _.random(140, 250)
      element = {
        name: "#{color} Square"
        color: "#{color}"
        width: wh
        height: wh
        transform: {
          from:{
            x: _.random(20, 500)
            y: _.random(50, 500)
            z: 0
          }
          to:{
            x: _.random(20, $(window).width() - wh - 20)
            y: _.random(50, $(window).height() - wh - 20)
            z: 0
          }
        }
        duration: _.random(500, 2000)
        curve: transitions[Math.floor(Math.random()*transitions.length)]
      }

      elements.push(element)

      i++

    Ember.A(elements)

`export default Mixin`