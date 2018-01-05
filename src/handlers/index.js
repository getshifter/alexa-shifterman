'use strict'
exports.handlers = {
  LaunchRequest: require('./default/LaunchRequest'),
  GetNewFactIntent: require('./default/GetNewFactIntent'),
  GetNewsIntent: require('./default/GetNewsIntent'),
  'AMAZON.HelpIntent': require('./default/Amazon.Help.Intent'),
  'AMAZON.CancelIntent': require('./default/SessionEnd'),
  'AMAZON.StopIntent': require('./default/SessionEnd')
}
