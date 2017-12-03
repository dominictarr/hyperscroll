var h = require('hyperscript')

function isTop (scroller, buffer) {
  return scroller.scrollTop <= (buffer || 0)
}

function isBottom (scroller, buffer) {
  var rect = scroller.getBoundingClientRect()
  var topmax = scroller.scrollTopMax || (scroller.scrollHeight - rect.height)
  return scroller.scrollTop >= + ((topmax) - (buffer || 0))
}

function isEmpty (content, scroller) { return false }

module.exports = function (content) {

  var scroller = h('div.hyperscroll', {style: { overflow: 'auto', height: '100%'}}, content)
  var top, bottom

  function dispatch (opts) {
    content.dispatchEvent(new CustomEvent('readymore', {target: content, detail: opts}))
  }

  function ready () {
    var buffer = window.innerHeight * 0.5
    if(top && isTop(scroller, buffer)) {
      dispatch({top: true, bottom: false})
    }
    if(bottom && isBottom(scroller, buffer)) {
      dispatch({bottom: true, top: false})
    }
  }

  function setup () {
    if(top || bottom) return
    scroller.addEventListener('scroll', function (ev) {
      ready()
    })
  }

  content.addEventListener('hasmore', function (ev) {
    setup()
    if(ev.detail.top) top = true
    if(ev.detail.bottom) bottom = true
    ready(ev)
  })

  return scroller
}

