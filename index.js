'use strict'

const Joi = require('joi')

const compileValue = (event, schema) => {
  const value = {}

  if (schema.query) {
    value.query = event.queryStringParameters || {}
  }

  if (schema.body) {
    value.body = event.body || {}
  }

  if (schema.headers) {
    value.headers = event.headers || {}
  }

  return value
}

class LambdaJoiValidation {
  constructor(schema, options) {
    this.schema = schema
    this.options = options
  }

  validate(event, options) {
    const value = compileValue(event, this.schema)
    const joiOptions = options || this.options || {}

    return Joi.validate(value, this.schema, joiOptions)
      .catch(error => {
        error.statusCode = 400
        throw error
      })
  }
}

module.exports = LambdaJoiValidation