# Alexa Shifter Man Skill
[Shifter man(amazon.com)](https://www.amazon.com/Digitalcube-Inc-Shifter-man/dp/B07572D7N8/)


## Init

```
$ git clone git@github.com:getshifter/alexa-shifterman.git
$ cd alexa-shifterman
$ npm install
```

## Deploy

```
$ npm prune --production
$ serverless deploy --region us-east-1
$ npm install
```

## Test

```
$ npm test
```

## Lint

```
$ npm run lint
```

## Setup the skills
Go to [https://developer.amazon.com](https://developer.amazon.com) and setup an Alexa Skills.

### Intent Schema
Copy and pastes from `interaction/intent-schema.json` data.

### Custom Slot Types
For now, it should be empty.

### Sample Utterances
Copy and pastes from `interaction/utterances.txt` data.
