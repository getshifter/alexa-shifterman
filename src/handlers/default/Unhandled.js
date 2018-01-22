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
  const speechOutput = 'Sorry, I beg your pardon.'
  const reprompt = this.t('HELP_REPROMPT')

  // Build template
  const builder = new Alexa.templateBuilders.BodyTemplate3Builder()
  const template = builder
    .setTitle(this.t('SKILL_NAME'))
    .setImage(
      makeImage(
        'https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'
      )
    )
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