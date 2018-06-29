const Alexa = require('alexa-sdk')
const makePlainText = Alexa.utils.TextUtils.makePlainText
const makeImage = Alexa.utils.ImageUtils.makeImage

const hints = [
  'give me a shifter topics',
  'ask shifterman, tell me a news',
  'tell me a news'
]
const data = [
  'Static web pages are nearly maintenance-free and load at lightening speed. But they require outside development resources and don’t offer the functionality of a dynamic web page.',
  'WordPress makes building a website easy and cost effective for almost any user. But it needs regular updates and security can be a concern.',
  'Generate WordPress to static HTML files with Shifter and deliver them at lightning speed without bottlenecks.',
  'Create sites that won’t fail or slow down from increased traffic anywhere are in the world.',
  'SSL is included. Publish in our secure on-demand environment without sweating the security holes or outdated versions of WordPress.',
  'Maintenance free. End downtime with our unique approach to hosting and publish all your content at once or only when it’s ready.',
  'Shifter website can deploy to Netlify.',
  'Pricing starts at $15/mo annually. This is our Personal plan which includes 10GB Storage and 1TB Data Transfer. This covers most users or for more storage and bandwidth we also offer Business and Agency pricing',
  'We also offer a forever trial at no cost for anyone who wants to get started with Shifter today!',
  'Shifter includes global CDN on all accounts for free.',
  'We host the files that Shifter creates and allow you to connect to custom domains.'
]

module.exports = function () {
  const factArr = data
  const factIndex = Math.floor(Math.random() * factArr.length)
  const randomFact = factArr[factIndex]
  const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact

  // Build template
  const builder = new Alexa.templateBuilders.BodyTemplate2Builder()
  const template = builder
    .setImage(makeImage('https://go.getshifter.io/img/site-screenshot.png'))
    .setTextContent(makePlainText(randomFact), makePlainText('Shifter tips'))
    .setTitle(this.t('GET_FACT_MESSAGE'))
    .build()
  this.response.renderTemplate(template)

  this.response.cardRenderer(this.t('SKILL_NAME'), randomFact)
  this.response.speak(speechOutput)

  // hint
  const hintIndex = Math.floor(Math.random() * hints.length)
  const hint = hints[hintIndex]
  this.response.hint(hint)
  this.emit(':responseReady')
}
