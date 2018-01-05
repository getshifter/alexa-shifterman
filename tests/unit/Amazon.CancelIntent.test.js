/* global describe, beforeEach, it */
const assert = require('power-assert')
const MyLambdaFunction = require('../../index.js')
const handler = MyLambdaFunction.hello
const helpers = require('./helpers')
const { event, executeFunction } = helpers

describe('AMAZON.CancelIntent', () => {
  beforeEach(() => {
    event.request.type = 'AMAZON.CancelIntent'
    event.session.new = false
  })
  it('should end the session [English]', () => {
    event.request.locale = 'en-US'
    const assertions = data => {
      const { response } = data
      const { outputSpeech, shouldEndSession } = response
      assert.equal(shouldEndSession, true)
      assert.equal(outputSpeech.type, 'SSML')
      assert.equal(outputSpeech.ssml, '<speak> See you again! </speak>')
    }
    executeFunction(event, handler, assertions)
  })
})
