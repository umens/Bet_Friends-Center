'use strict';
const Joi = require('joi');
const Boom = require('boom');
const UserController = require('../controllers/user.controller')

module.exports = [
  {
    method: 'GET',
    path: '/user',
    options: {
      handler: UserController.list,
      tags: ['api'],
      description: 'My route description',
      notes: 'My route notes',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/user/{id}',
    options: {
      handler: UserController.find,
      tags: ['api'],
      description: 'My route description',
      notes: 'My route notes',
      validate: {
        params: {
          id: Joi.required()
        },
        options: {
          abortEarly: false,
          allowUnknown: true
        }
      },
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/user',
    handler: UserController.create,
    options: {
      validate: {
        payload: {},
        options: {
          abortEarly: false,
          allowUnknown: true
        }
      },
      auth: false
    }
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: UserController.remove,
    options: {
      validate: {
        params: {
          id: Joi.required()
        },
        options: {
          abortEarly: false,
          allowUnknown: true
        }
      },
      auth: false
    }
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: UserController.update,
    options: {
      validate: {
        params: {
          id: Joi.required()
        },
        options: {
          abortEarly: false,
          allowUnknown: true
        }
      },
      auth: false
    }
  }
]
