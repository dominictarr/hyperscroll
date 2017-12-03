# hyperscroll

scroll based to hyperloadmore interface

when you scroll to the bottom, it emits a `readymore {bottom: true}` event,
and when you scroll to the top it emits a top event.

## example

``` js
var h = require('hyperscript')
var pull = require('pull-stream')
var stream = require('hyperloadmore/stream')
var HyperScroll = require('./')

var content = h('div.content', h('h1', 'hello'))

document.body.appendChild(h('div.screen',
  //create an element that fits the whole screen exactly,
  //this will make everything work.
  {style: {position: 'absolute', top: '0px', bottom: '0px', left: '0px', right: '0px'}},
  HyperScroll(content)
))

pull(
  old_source, //old messages, append to bottom of screen.
  stream.bottom(content)
)

pull(
  new_source, //new messages, append to top of screen
  stream.top(content)
)

```

## License

MIT





