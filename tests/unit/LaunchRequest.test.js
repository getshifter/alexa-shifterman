/* global describe, beforeEach, it */
const assert = require('power-assert')
const helpers = require('./helpers')
const { event, executeFunction, getLambdaHandler } = helpers
const handler = getLambdaHandler()

describe('LaunchRequest', () => {
  beforeEach(() => {
    event.request.type = 'LaunchRequest'
    event.session.new = false
  })
  it('should end the session [English]', () => {
    event.request.locale = 'en-US'
    const assertions = data => {
      const { response } = data
      const { shouldEndSession } = response
      assert.equal(shouldEndSession, false)
    }
    executeFunction(event, handler, assertions)
  })
  it('should start valid outputSpeech [English]', () => {
    event.request.locale = 'en-US'
    const assertions = data => {
      const { response } = data
      const { outputSpeech } = response
      assert.notEqual(outputSpeech.ssml.indexOf("Hi! I'm Shifter man."), -1)
    }
    executeFunction(event, handler, assertions)
  })
})
