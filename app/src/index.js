'use strict'
exports.__esModule = true
/* eslint-disable @typescript-eslint/no-explicit-any */
var React = require('react')
var ReactDOM = require('react-dom')
var App_1 = require('./App')
var render = function(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'))
}
render(App_1.App)
if (module.hot) {
  module.hot.accept('./App.tsx', function() {
    // eslint-disable-next-line
    var NewApp = require('./App.tsx')
    render(NewApp.App)
  })
}
