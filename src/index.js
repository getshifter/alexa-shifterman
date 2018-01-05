const Alexa = require('alexa-sdk')
const { handlers } = require('./handlers')
module.exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback)
  // alexa.resources = languageStrings
  alexa.registerHandlers(handlers)
  alexa.execute()
}
