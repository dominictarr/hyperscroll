var pull = require('pull-stream')
var stream = require('hyperloadmore/stream')
var h = require('hyperscript')
var HyperScroll = require('./')

var content = h('div.content', h('h1', 'hello'))

document.body.appendChild(h('div.screen',
  {style: {position: 'absolute', top: '0px', bottom: '0px', left: '0px', right: '0px'}},
  //require('hyperloadmore')(content)
  HyperScroll(content)
))

pull(
  pull.infinite(),
  pull.map(function (e) {
    return h('h1', e)
  }),
  pull.asyncMap(function (el, cb) {
    setTimeout(function () {
      cb(null, el)
    }, 20)
  }),
  stream.bottom(content)
)

pull(
  pull.infinite(),
  pull.map(function (e) {
    return h('h1', new Date())
  }),
  pull.asyncMap(function (el, cb) {
    setTimeout(function () {
      cb(null, el)
    }, 333)
  }),
  stream.top(content)
)


