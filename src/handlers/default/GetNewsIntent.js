const http = require('https')
const Alexa = require('alexa-sdk')
const makeRichText = Alexa.utils.TextUtils.makeRichText

let url = 'https://api.digitalcube.jp/wp-json/wp/v2/posts'
function httpGet (query, callback) {
  if (query) {
    url = `${url}?s=${query}`
  }

  var req = http.request(url, res => {
    var body = ''
    res.on('data', d => {
      body += d
    })

    res.on('end', function () {
      callback(body)
    })
  })
  req.end()

  req.on('error', e => {
    console.error(e)
  })
}

module.exports = function () {
  const self = this
  let output = ''
  httpGet('', function (response) {
    // Parse the response into a JSON object ready to be formatted.
    var responseData = JSON.parse(response)
    var cardContent = 'Data provided by Shifter Official site\n\n'
    let newsLists = ''
    // Check if we have correct data, If not create an error speech out to try again.
    if (responseData == null) {
      output = 'There was a problem with getting data please try again'
    } else {
      const numberOfResults = responseData.length
      const newsIntroMessage =
        'These are the ' + numberOfResults + ' most recent shifter headlines '
      output = newsIntroMessage

      responseData.forEach((item, key) => {
        let message = ''
        message += `No. ${key + 1}, `
        message += item.title.rendered
        output += `<p>${message}</p>`
        newsLists += `${message}<br/><br/>`
      })
    }
    const cardTitle = 'Shifter News'
    const builder = new Alexa.templateBuilders.BodyTemplate1Builder()
    const template = builder
      .setTitle(cardTitle)
      .setTextContent(makeRichText(newsLists))
      .build()
    self.response.renderTemplate(template)
    self.response.speak(output)
    self.response.cardRenderer(cardTitle, cardContent)
    self.emit(':responseReady')
  })
}
