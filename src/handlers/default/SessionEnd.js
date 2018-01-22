module.exports = function () {
  this.response.speak(this.t('STOP_MESSAGE'))
  this.emit(':responseReady')
}
