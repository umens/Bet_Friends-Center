'use strict';
const Joi = require('joi');
const Boom = require('boom');

module.exports = [{
    method: '*',
    path: '/{p*}',
    handler: (request, h) => {
        return Boom.badRequest('route does not exist');
    },
    options: {
        auth: false,
        validate: {
            options: {
                abortEarly: false,
                allowUnknown: true
            }
        }
    }
}]