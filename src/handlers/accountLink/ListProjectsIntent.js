'use strict'
const Alexa = require('alexa-sdk')
const request = require('superagent')
const moment = require('moment')
const makeRichText = Alexa.utils.TextUtils.makeRichText
const makeImage = Alexa.utils.ImageUtils.makeImage

module.exports = function () {
  // Get Access token
  var accessToken = this.event.session.user.accessToken
  if (accessToken === undefined) {
    this.emit(':tellWithLinkAccountCard', this.t('REQUIRE_ACCOUNT_LINK'))
    return
  }
  if (!accessToken) {
    this.emit(':tellWithLinkAccountCard', this.t('AGAIN_ACCOUNT_LINK'))
  }
  var self = this
  request
    .get(
      'https://kelbes0rsk.execute-api.us-east-1.amazonaws.com/production/v2/projects'
    )
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
        body.forEach((item, key) => {
          let message = ''
          message += `No. ${key + 1},`
          message += item.project_name ? item.project_name : 'No project name'
          message += ','
          const created = moment(item.create_time, 'YYYYMM').format('MMM YYYY')
          message += `created at ${created}`
          outputSpeech += `<p>${message}</p>`
          projectLists += `${message}<br/>`
        })
        const noProjectMessage = this.t('NO_PROJECTS')
        if (!projectLists) projectLists = noProjectMessage
        if (outputSpeech) {
          outputSpeech = `<p>Here is your projects.</p>${outputSpeech}`
        } else {
          outputSpeech = noProjectMessage
        }

        // build template
        const builder = new Alexa.templateBuilders.BodyTemplate3Builder()
        const template = builder
          .setTitle(`Your account projects`)
          .setImage(
            makeImage(
              'https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'
            )
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
