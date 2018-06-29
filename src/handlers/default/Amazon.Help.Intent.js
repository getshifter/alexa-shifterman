'use strict'
const Alexa = require('alexa-sdk')
const makeImage = Alexa.utils.ImageUtils.makeImage
const makePlainText = Alexa.utils.TextUtils.makePlainText
const hints = [
  'give me a shifter topics',
  'ask shifterman, tell me a news',
  'tell me a news'
]

module.exports = function () {
  const speechOutput = this.t('HELP_MESSAGE')
  const reprompt = this.t('HELP_REPROMPT')

  // Build template
  const builder = new Alexa.templateBuilders.BodyTemplate3Builder()
  const template = builder
    .setTitle(this.t('SKILL_NAME'))
    .setImage(makeImage('https://go.getshifter.io/img/site-screenshot.png'))
    .setTextContent(makePlainText(speechOutput))
    .build()
  this.response.renderTemplate(template)
  this.response.speak(speechOutput)
  this.response.listen(reprompt)

  const hintIndex = Math.floor(Math.random() * hints.length)
  const hint = hints[hintIndex]
  this.response.hint(hint)
  this.emit(':responseReady')
}
