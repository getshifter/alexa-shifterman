const conversation = require('alexa-conversation');
const app = require('../index.js');

const opts = {
  name: 'Alexa Shifter man',
  appId: 'your-app-id',
  app: app,
  handler: app.hello
};

conversation(opts)
  .userSays('GetNewFactIntent')
  .plainResponse
  .shouldContain("Here\'s the shifter")
  .end();

conversation(opts)
  .userSays('getNewsIntent')
  .plainResponse
  .shouldContain("These are the 5 most recent shifter headlines,")
  .end();