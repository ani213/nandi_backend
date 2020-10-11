const Joi = require('joi');

module.exports.volunteerValidate=Joi.object({
    name:Joi.string().required().error(new Error('Give your error message here for first name')),
    email:Joi.string().email().required(),
})