# Lambda Joi Validator

## Install

```bash
npm install joi
npm install @palmabit/lambda-joi-validator
```

## Usage

```javascript
const Joi = require('joi')
const LambdaJoiValidator = require('@palmabit/lambda-joi-validator')
const schema = {
  query: Joi.object().keys({
    foo: Joi.string()
  })
}
const validator = new LambdaJoiValidator(schema)

module.exports.handler = (event, context, callback) => {
  validator.validate(event)
    .then(value => {
      callback(null, {
        statusCode: 200,
        body: 'Valid!!!'
      })
    })
    .catch(error => {
      callback(null, {
        statusCode: 400,
        body: error
      })
    })
  }
```

## Schema

You can define query, body and/or headers schemas validator:

```javascript
const schema = {
  query: Joi.object().keys({
    foo: Joi.string()
  }),
  body: Joi.object().keys({
    bar: Joi.number()
  }),
  headers: Joi.object().keys({
    foobar: Joi.string()
  })
}
```