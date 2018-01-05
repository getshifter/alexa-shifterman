'use strict'
const Alexa = require('alexa-sdk')
module.getMakePlainText = () => {
  // utility methods for creating Image and TextField objects
  return Alexa.utils.TextUtils.makePlainText
}

module.getMakeRichText = () => {
  return Alexa.utils.TextUtils.makeRichText
}

module.getMakeImage = () => {
  return Alexa.utils.ImageUtils.makeImage
}
