const assert = require('power-assert')

exports.event = {
  session: {
    new: true,
    sessionId: 'amzn1.echo-api.session.[unique-value-here]',
    attributes: {},
    user: {
      userId: 'amzn1.ask.account.[unique-value-here]'
    },
    application: {
      applicationId: 'amzn1.ask.skill.27ebf503-dca3-4966-b610-3f90e3314740'
    }
  },
  version: '1.0',
  request: {
    locale: 'en-US',
    timestamp: '2016-10-27T18:21:44Z',
    type: '',
    requestId: 'amzn1.echo-api.request.[unique-value-here]'
  },
  context: {
    AudioPlayer: {
      playerActivity: 'IDLE'
    },
    System: {
      device: {
        supportedInterfaces: {
          AudioPlayer: {}
        }
      },
      application: {
        applicationId: 'amzn1.ask.skill.27ebf503-dca3-4966-b610-3f90e3314740'
      },
      user: {
        userId: 'amzn1.ask.account.[unique-value-here]'
      }
    }
  }
}

function fail (e) {
  if (e.name === 'AssertionError') {
    assert.deepEqual(e.expected, e.actual)
  } else {
    assert.ok(false)
  }
}

exports.executeFunction = (event, handler, assertion) => {
  // eslint-disable-next-line handle-callback-err
  handler(event, {}, (e, data) => {
    if (e) {
      fail(e)
    } else {
      assertion(data)
    }
  })
}

exports.getLambdaHandler = (functionName = 'handler') => {
  const MyLambdaFunction = require('../../src/index.js')
  return MyLambdaFunction[functionName]
}
