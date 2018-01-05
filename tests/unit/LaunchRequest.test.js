/* global describe, beforeEach, it */
const assert = require('power-assert')
const MyLambdaFunction = require('../../index.js')
const handler = MyLambdaFunction.hello
const helpers = require('./helpers')
const { event, executeFunction } = helpers

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
      assert.equal(shouldEndSession, true)
    }
    executeFunction(event, handler, assertions)
  })
  it('should start valid text [English]', () => {
    event.request.locale = 'en-US'
    const assertions = data => {
      const { response } = data
      const { outputSpeech } = response
      assert.notEqual(outputSpeech.ssml.indexOf("Here's the shifter tips"), -1)
    }
    executeFunction(event, handler, assertions)
  })
})
