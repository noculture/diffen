import Joi from "@hapi/joi";

export default class Validator {
  static userSignUp(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required()
    });

    return Validator.validate(schema, req, res, next);
  }

  static userSignIn(req, res, next) {
    const schema = Joi.object().keys({
      password: Joi.string().required(),
      name: Joi.string().required()
    });

    return Validator.validate(schema, req, res, next);
  }

  static comparisonRequest(req, res, next) {
    const schema = Joi.object().keys({
      firstStudent: Joi.string().required(),
      firstUrl: Joi.string().required(),
      secondStudent: Joi.string().required(),
      secondUrl: Joi.string().required()
    });

    return Validator.validate(schema, req, res, next);
  }

  static validate(schema, req, res, next) {
    const { error } = schema.validate(req.body, {
      allowUnknown: true,
      stripUnknown: true
    });

    return error ? Validator.returnErrorResponse(res, error) : next();
  }

  static returnErrorResponse(res, error) {
    res.status(400);
    return res.json({
      error: "BAD_REQUEST",
      message: JSON.stringify(error.message)
    });
  }
}
