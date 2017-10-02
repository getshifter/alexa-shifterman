'use strict'
const Alexa = require('alexa-sdk')
const http = require('https')

// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText
const makeRichText = Alexa.utils.TextUtils.makeRichText
const makeImage = Alexa.utils.ImageUtils.makeImage

const SKILL_NAME = 'Shifter Tips'
const GET_FACT_MESSAGE = "Here's the shifter tips: "
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?'
const HELP_REPROMPT = 'What can I help you with?'
const STOP_MESSAGE = 'See you again!'
const numberOfResults = 5
const newsIntroMessage = 'These are the ' + numberOfResults + ' most recent shifter headlines, you can read more on your Alexa app. '
let output = ''
let url = 'https://getshifter.io/wp-json/wp/v2/posts'
let alexa


const hints = [
  'give me a shifter topics',
  'ask shifterman, tell me a news',
  'tell me a news',
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

const handlers = {
  'LaunchRequest': function () {
    this.emit('GetNewFactIntent')
  },
  'GetNewFactIntent': function () {
    const factArr = data
    const factIndex = Math.floor(Math.random() * factArr.length)
    const randomFact = factArr[factIndex]
    const speechOutput = GET_FACT_MESSAGE + randomFact

    // Build template
    const builder = new Alexa.templateBuilders.BodyTemplate2Builder()
    const template = builder.setTitle(SKILL_NAME)
      .setImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
      .setTextContent(makePlainText(randomFact), makePlainText('sample'))
      .setTitle(GET_FACT_MESSAGE)
      .build()
    this.response.renderTemplate(template)

    this.response.cardRenderer(SKILL_NAME, randomFact)
    this.response.speak(speechOutput)

    // hint
    const hintIndex = Math.floor(Math.random() * hints.length)
    const hint = hints[hintIndex]
    this.response.hint(hint)
    this.emit(':responseReady')
  },
  'GetNewsIntent': function () {
    const self = this
    httpGet('', function (response) {
      // Parse the response into a JSON object ready to be formatted.
      var responseData = JSON.parse(response)
      var cardContent = 'Data provided by Shifter Official site\n\n'

      // Check if we have correct data, If not create an error speech out to try again.
      if (responseData == null) {
        output = 'There was a problem with getting data please try again'
      } else {
        output = newsIntroMessage

        // If we have data.
        for (var counter = responseData.length - 1; counter >= 0; counter--) {
          output += ' Number ' + counter + ' ' + responseData[counter].title.rendered
        }

        output += ' See your Alexa app for more information.'
      }

      var cardTitle = 'Shifter News'
      self.response.speak(output)
      self.response.cardRenderer(cardTitle, cardContent)
      self.emit(':responseReady')
    })
  },

  'AMAZON.HelpIntent': function () {
    const speechOutput = HELP_MESSAGE
    const reprompt = HELP_REPROMPT

    // Build template
    const builder = new Alexa.templateBuilders.BodyTemplate3Builder()
    const template = builder.setTitle( SKILL_NAME)
      .setImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
      .setTextContent(makePlainText(speechOutput))
      .build()
    this.response.renderTemplate(template)
    this.response.speak(output)

    const hintIndex = Math.floor(Math.random() * hints.length)
    const hint = hints[hintIndex]
    this.response.hint(hint)
    this.emit(':responseReady')
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(STOP_MESSAGE)
    this.emit(':responseReady')
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(STOP_MESSAGE)
    this.emit(':responseReady')
  }
}

module.exports.hello = (event, context, callback) => {
  alexa = Alexa.handler(event, context, callback)
  alexa.registerHandlers(handlers)
  alexa.execute()
}

function httpGet (query, callback) {
  console.log('/n QUERY: ' + query)
  if (query) {
    url = `${url}?s=${query}`
  }

  var req = http.request(url, (res) => {
    var body = ''
    res.on('data', (d) => {
      body += d
    })

    res.on('end', function () {
      callback(body)
    })
  })
  req.end()

  req.on('error', (e) => {
    console.error(e)
  })
}
