'use strict'

const Joi = require('joi')
const LambdaJoiValidator = require('../index')

describe('Lambda Joi Validator', () => {

  test('should be a function', () => {
    expect(LambdaJoiValidator).toBeInstanceOf(Function)
  })

  test('should has validate method', () => {
    const lambdaJoiValidator = new LambdaJoiValidator()
    expect(lambdaJoiValidator.validate).toBeInstanceOf(Function)
  })

  test('should validate query string', () => {
    const schema = {
      query: Joi.object().keys({
        foo: Joi.string(),
        bar: Joi.number()
      })
    }
    const event = {
      queryStringParameters: JSON.stringify({
        foo: 'foo',
        bar: 100,
      })
    }
    const lambdaJoiValidator = new LambdaJoiValidator(schema)
    return lambdaJoiValidator.validate(event)
  })

  test('should validate body', () => {
    const schema = {
      body: Joi.object().keys({
        foo: Joi.string(),
        bar: Joi.number()
      })
    }
    const event = {
      body: JSON.stringify({
        foo: 'foo',
        bar: 100,
      })
    }
    const lambdaJoiValidator = new LambdaJoiValidator(schema)
    return lambdaJoiValidator.validate(event)
  })

})