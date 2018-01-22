'use strict'
exports.handlers = {
  LaunchRequest: require('./default/GetNewFactIntent'),
  GetNewFactIntent: require('./default/GetNewFactIntent'),
  GetNewsIntent: require('./default/GetNewsIntent'),
  AccountUsageIntent: require('./accountLink/AccountUsageIntent'),
  'AMAZON.HelpIntent': require('./default/Amazon.Help.Intent'),
  'AMAZON.CancelIntent': require('./default/SessionEnd'),
  'AMAZON.StopIntent': require('./default/SessionEnd'),
  SessionEndedRequest: require('./default/SessionEnd'),
  Unhandled: require('./default/Unhandled')
}
