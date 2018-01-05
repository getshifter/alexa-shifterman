const conversation = require('alexa-conversation')
const app = require('../../src/index')

const opts = {
  name: 'Alexa Shifter man',
  appId: 'your-app-id',
  app: app,
  handler: app.hello
}

conversation(opts)
  .userSays('GetNewFactIntent')
  .plainResponse.shouldContain("Here's the shifter")
  .end()

conversation(opts)
  .userSays('GetNewsIntent')
  .plainResponse.shouldContain('most recent shifter headlines')
  .end()
