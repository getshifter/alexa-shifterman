'use strict'
const Alexa = require('alexa-sdk')
const request = require('superagent')
const bytes = require('bytes')
const moment = require('moment')
const makePlainText = Alexa.utils.TextUtils.makePlainText
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
    .get('https://api.getshifter.io/v1/statistics/usage_summary')
    .set('Authorization', accessToken)
    .end((err, response) => {
      if (err || response.status > 299) {
        console.log(err)
        console.log(response)
        self.emit(':tell', 'some error is happen. please try again.')
      } else {
        const { body } = response
        const diskUsage = bytes(Number(body.disk_total) * 1024)
        const transfer = bytes(Number(body.transfer_total) * 1024 * 1024 * 1024)
        const trackMonth = moment(body.track_month, 'YYYYMM').format('MMM YYYY')

        // build template
        const builder = new Alexa.templateBuilders.BodyTemplate3Builder()
        const template = builder
          .setTitle(`Your account usage in ${trackMonth}`)
          .setImage(
            makeImage('https://go.getshifter.io/img/site-screenshot.png')
          )
          .setTextContent(
            makePlainText(`Disk usage is ${diskUsage}`),
            makePlainText(`Data transfer is ${transfer}`)
          )
          .build()
        this.response.renderTemplate(template)

        // Make speech output
        let outputSpeech = `<p>in ${trackMonth}</p>`
        outputSpeech += `<p>Disk usage is ${diskUsage}</p>`
        outputSpeech += `<p>Data transfer is ${transfer}</p>`
        this.response.speak(outputSpeech)
        this.emit(':responseReady')
      }
    })
}
