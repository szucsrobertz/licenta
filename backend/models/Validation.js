const Joi = require('joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        username: Joi.string()
            .min(6)
            .required(),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
