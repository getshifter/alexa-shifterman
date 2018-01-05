const http = require('https')
let url = 'https://getshifter.io/wp-json/wp/v2/posts'
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

const numberOfResults = 10
const newsIntroMessage =
  'These are the ' +
  numberOfResults +
  ' most recent shifter headlines, you can read more on your Alexa app. '

module.exports = function () {
  const self = this
  let output = ''
  httpGet('', function (response) {
    // Parse the response into a JSON object ready to be formatted.
    var responseData = JSON.parse(response)
    var cardContent = 'Data provided by Shifter Official site\n\n'

    // Check if we have correct data, If not create an error speech out to try again.
    if (responseData == null) {
      output = 'There was a problem with getting data please try again'
    } else {
      output = newsIntroMessage

      // If we have data.
      for (var counter = responseData.length - 1; counter >= 0; counter--) {
        output +=
          ' Number ' + counter + ' ' + responseData[counter].title.rendered
      }

      output += ' See your Alexa app for more information.'
    }

    var cardTitle = 'Shifter News'
    self.response.speak(output)
    self.response.cardRenderer(cardTitle, cardContent)
    self.emit(':responseReady')
  })
}
