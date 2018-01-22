/* global describe, beforeEach, it */
const assert = require('power-assert')
const helpers = require('./helpers')
const { event, executeFunction, getLambdaHandler } = helpers
const handler = getLambdaHandler()
describe('GetNewsIntent', () => {
  beforeEach(() => {
    event.request.type = 'GetNewsIntent'
    event.session.new = false
  })
  it('should end the session [English]', () => {
    event.request.locale = 'en-US'
    const assertions = data => {
      const { response } = data
      const { shouldEndSession } = response
      assert.equal(shouldEndSession, true)
    }
    executeFunction(event, handler, assertions)
  })
  it('should start valid text [English]', () => {
    event.request.locale = 'en-US'
    const assertions = data => {
      const { response } = data
      const { outputSpeech } = response
      assert.notEqual(
        outputSpeech.ssml.indexOf('Data provided by Shifter Official site'),
        -1
      )
    }
    executeFunction(event, handler, assertions)
  })
})
