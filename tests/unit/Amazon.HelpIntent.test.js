/* global describe, beforeEach, it */
const assert = require('power-assert')
const MyLambdaFunction = require('../../index.js')
const handler = MyLambdaFunction.hello
const helpers = require('./helpers')
const { event, executeFunction } = helpers

describe('AMAZON.HelpIntent', () => {
  beforeEach(() => {
    event.request.type = 'AMAZON.HelpIntent'
    event.session.new = false
  })
  it('should end the session [English]', () => {
    event.request.locale = 'en-US'
    const assertions = data => {
      const { response } = data
      const { outputSpeech, shouldEndSession } = response
      assert.equal(shouldEndSession, false)
      assert.equal(outputSpeech.type, 'SSML')
      assert.equal(
        outputSpeech.ssml,
        '<speak> You can say tell me a shifter fact, or, you can say exit... What can I help you with? </speak>'
      )
      const { reprompt } = response
      assert.deepEqual(reprompt, {
        outputSpeech: {
          type: 'SSML',
          ssml: '<speak> What can I help you with? </speak>'
        }
      })
    }
    executeFunction(event, handler, assertions)
  })
})
