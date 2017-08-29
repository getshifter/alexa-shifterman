const Alexa = require('alexa-sdk');

// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

const handlers = {
  'LaunchRequest' : function() {
    const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

    let template = builder.setTitle('Hello!')
      .setBackgroundImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
      .setTextContent(makePlainText('Try "what is shifter"'))
      .build();

    this.response.speak("Hi, I'm shifter man. What do you want to know about shifter ?")
      .renderTemplate(template);
    this.emit(':responseReady');
  },
  'AskShifterIntent': function() {
    const message = 'Shifter is a full-service WordPress hosting solution that brings serverless architecture the world’s most popular CMS. It transforms WordPress to static so you can create secure sites that scale and end downtime.';
    this.response.speak(message);

    const builder = new Alexa.templateBuilders.BodyTemplate2Builder();

    let template = builder.setTitle('About the Shifter')
      .setImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
      .setTextContent(makePlainText(message))
      .build();
    this.response.renderTemplate(template);
    this.emit(':responseReady');
  },
  'AskPriceIntent': function() {

  },
  'AskTestimonialsIntent': function() {
    this.response.speak('From J2 Design. Shifter takes the benefits of a static site generator and the power of WordPress and puts them together into one amazing service.')

    const builder = new Alexa.templateBuilders.BodyTemplate2Builder();

    let template = builder.setTitle('J2 Design')
      .setImage(makeImage('https://getshifter.io/app/themes/shifter/dist/images/j2-logo--black-outlne.svg'))
      .setTextContent(makePlainText('Shifter takes the benefits of a static site generator and the power of WordPress and puts them together into one amazing service..'))
      .build();
    this.response.renderTemplate(template);
    this.emit(':responseReady');
  }
};

module.exports.hello = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};