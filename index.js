const Alexa = require('alexa-sdk');

// utility methods for creating Image and TextField objects
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeRichText = Alexa.utils.TextUtils.makeRichText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

function stopHandlers(self) {
  const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

  const template = builder.setTitle('Thanks!')
    .setBackgroundImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
    .setTextContent(makePlainText("Thank you for trying the shifter man.Have a nice day!"))
    .build();

  self.response.speak("<p>Thank you for trying the shifter man.</p><p>Have a nice day!</p>")
    .renderTemplate(template);
  self.emit(':responseReady');
}

const handlers = {
  'LaunchRequest' : function() {
    const builder = new Alexa.templateBuilders.BodyTemplate1Builder();

    const template = builder.setTitle('Hello!')
      .setBackgroundImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
      .setTextContent(makePlainText('Try "what is shifter"'))
      .build();

    this.response.speak("<p>Hi, I'm shifter man.</p><p>What do you want to know about shifter ?</p>")
      .renderTemplate(template);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    const builder = new Alexa.templateBuilders.BodyTemplate2Builder();

    const template = builder.setTitle('Usage of Shifter man')
      .setImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
      .setTextContent(
        makePlainText('Shifter man is the Alexa skill.You can receive answers to your questions when you ask shifter man about shifter.'),
        makePlainText('Try "what is shifter"')
      )
      .build();

    this.response.speak("<p>Shifter man is the Alexa skill.</p><p>You can receive answers to your questions when you ask shifter man about shifter.</p><p>Please try to say what is shifter.</p>")
      .renderTemplate(template);
    this.emit(':responseReady');

  },
  'AMAZON.CancelIntent': function() {
    stopHandlers(this);
  },
  'AMAZON.StopIntent': function() {
    stopHandlers(this);
  },
  'AskShifterIntent': function() {
    const message = '<p>Shifter is a full-service WordPress hosting solution that brings serverless architecture the world’s most popular CMS.</p><p>It transforms WordPress to static so you can create secure sites that scale and end downtime.</p>';
    this.response.speak(message);

    const builder = new Alexa.templateBuilders.BodyTemplate2Builder();

    const template = builder.setTitle('About the Shifter')
      .setImage(makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png'))
      .setTextContent(makePlainText(message))
      .build();
    this.response.renderTemplate(template);
    this.emit(':responseReady');
  },
  'AskPriceIntent': function() {
    const message = 'message';
    this.response.speak(message);


    const expectedBackButtonBehavior = 'HIDDEN';
    const expectedBgImage = makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png');
    const expectedImage = makeImage('https://getshifter.io/app/uploads/2017/05/Shifter_KO__Full_Bkg-01-1024x1024.png');
    const expectedTitle = 'title';
    const expectedToken = 'token';
    const expectedPrimaryText = makePlainText('primary');

    const listItems = new Alexa.templateBuilders.ListItemBuilder()
      .addItem(expectedImage, expectedToken, expectedPrimaryText)
      .addItem(expectedImage, expectedToken, expectedPrimaryText, makePlainText('example'), makePlainText('tertiary'))
      .addItem(expectedImage, expectedToken, expectedPrimaryText)
      .build();

    const template = new Alexa.templateBuilders.ListTemplate1Builder()
      .setBackButtonBehavior(expectedBackButtonBehavior)
      .setTitle(expectedTitle)
      .setListItems(listItems)
      .build();
    this.response.renderTemplate(template);
    this.emit(':responseReady');
  },
  'AskTestimonialsIntent': function() {
    this.response.speak('<p>From J2 Design.</p><p>Shifter takes the benefits of a static site generator and the power of WordPress and puts them together into one amazing service.</p>')

    const builder = new Alexa.templateBuilders.BodyTemplate2Builder();

    const template = builder.setTitle('J2 Design')
      .setImage(makeImage('https://getshifter.io/app/themes/shifter/dist/images/j2-logo--black-outlne.svg'))
      .setTextContent(makePlainText('Shifter takes the benefits of a static site generator and the power of WordPress and puts them together into one amazing service..'))
      .build();
    this.response.renderTemplate(template);
    this.emit(':responseReady');
  },

  'Unhandled': function () {
    this.emit(':ask', "<p>Sorry, I couldn't here your question.</p>", "<p>Please try what is shifter again.</p>");
  }
};

module.exports.hello = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};