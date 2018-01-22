const Alexa = require('alexa-sdk')
const languageStrings = require('./translations')
const { handlers } = require('./handlers')
module.exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback)
  alexa.resources = languageStrings
  alexa.appId = 'amzn1.ask.skill.27ebf503-dca3-4966-b610-3f90e3314740'
  alexa.registerHandlers(handlers)
  alexa.execute()
}
