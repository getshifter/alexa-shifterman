const Alexa = require('alexa-sdk')
const makePlainText = Alexa.utils.TextUtils.makePlainText
const makeImage = Alexa.utils.ImageUtils.makeImage
const hints = [
  'give me a shifter topics',
  'ask shifterman, tell me a news',
  'tell me a news',
  'make a new site'
]

module.exports = function () {
  const speechOutput = this.t('WELCOME_MESSAGE')

  // Build template
  const builder = new Alexa.templateBuilders.BodyTemplate2Builder()
  const template = builder
    .setTitle(this.t('SKILL_NAME'))
    .setImage(makeImage('https://go.getshifter.io/img/site-screenshot.png'))
    .setTextContent(
      makePlainText('Shifter'),
      makePlainText('Serverless WordPress Hosting')
    )
    .build()
  this.response.renderTemplate(template)

  this.response.cardRenderer(speechOutput, this.t('HELP_REPROMPT'))
  this.response.speak(speechOutput + this.t('HELP_REPROMPT'))
  this.response.listen(this.t('HELP_REPROMPT'))

  // hint
  const hintIndex = Math.floor(Math.random() * hints.length)
  const hint = hints[hintIndex]
  this.response.hint(hint)
  this.emit(':responseReady')
}
