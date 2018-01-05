const Alexa = require('alexa-sdk')
const makePlainText = Alexa.utils.TextUtils.makePlainText
const makeImage = Alexa.utils.ImageUtils.makeImage
const hints = [
  'give me a shifter topics',
  'ask shifterman, tell me a news',
  'tell me a news'
]

module.exports = function () {
  const speechOutput = this.t('WELCOME_MESSAGE')

  // Build template
  const builder = new Alexa.templateBuilders.BodyTemplate2Builder()
  const template = builder
    .setTitle(speechOutput)
    .setImage(
      makeImage(
        'https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'
      )
    )
    .setTextContent(
      this.t('SKILL_NAME'),
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
