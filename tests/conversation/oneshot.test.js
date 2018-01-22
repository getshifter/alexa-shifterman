const conversation = require('alexa-conversation')
const app = require('../../src/index')

const opts = {
  name: 'Alexa Shifter man',
  appId: 'amzn1.ask.skill.27ebf503-dca3-4966-b610-3f90e3314740',
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
