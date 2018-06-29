'use strict'
const Alexa = require('alexa-sdk')
const request = require('superagent')
const makeRichText = Alexa.utils.TextUtils.makeRichText
const makeImage = Alexa.utils.ImageUtils.makeImage

const getName = event => {
  if (
    event &&
    event.request &&
    event.request.intent &&
    event.request.intent.slots &&
    event.request.intent.slots.name &&
    event.request.intent.slots.name.value
  ) {
    return event.request.intent.slots.name.value
  }
  return 'Made by Alexa'
}

module.exports = function () {
  // Get Access token
  const accessToken = this.event.session.user.accessToken
  if (accessToken === undefined) {
    this.emit(':tellWithLinkAccountCard', this.t('REQUIRE_ACCOUNT_LINK'))
    return
  }
  if (!accessToken) {
    this.emit(':tellWithLinkAccountCard', this.t('AGAIN_ACCOUNT_LINK'))
  }
  const name = getName(this.event)
  const body = {
    project_name: name
  }

  const self = this
  request
    .post(
      'https://kelbes0rsk.execute-api.us-east-1.amazonaws.com/production/v2/projects'
    )
    .send(body)
    .set('Authorization', accessToken)
    .end((err, response) => {
      if (err || response.status > 299) {
        console.log(err)
        console.log(response)
        self.emit(':tell', 'some error is happen. please try again.')
      } else {
        const { body } = response
        let outputSpeech = ''
        let projectLists = ''
        const message = body.project_name
          ? body.project_name
          : 'No project name'
        outputSpeech += `<p>${message}</p>`
        outputSpeech = `<p>I've create new site that name is ${message}. Please check our dashboard to launch the WordPress site.</p>`

        // build template
        const builder = new Alexa.templateBuilders.BodyTemplate3Builder()
        const template = builder
          .setTitle(`Create new site`)
          .setImage(
            makeImage('https://go.getshifter.io/img/site-screenshot.png')
          )
          .setTextContent(makeRichText(projectLists))
          .build()
        this.response.renderTemplate(template)

        // Make speech output
        this.response.speak(outputSpeech)
        this.emit(':responseReady')
      }
    })
}
