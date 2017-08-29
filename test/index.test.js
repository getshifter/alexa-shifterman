const conversation = require('alexa-conversation');
const app = require('../index.js');

const opts = {
  name: 'Alexa Shifter man',
  appId: 'your-app-id',
  app: app,
  handler: app.hello
};

conversation(opts)
  .userSays('LaunchRequest')
  .plainResponse
  .shouldContain("Hello. I'm Shifter man.")
  .shouldContain("What's do you want to know?")
  .userSays('WantToKnowIntent')
  .plainResponse
  .shouldContain("From Shaun Baer at J2 Design")
  .shouldContain("Shifter takes the benefits of a static site generator and the power of WordPress and puts them together into one amazing service..")
  .end();