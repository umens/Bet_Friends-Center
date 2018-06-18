import Joi from 'joi';
import { PoolController } from '../controllers';

export default [{
    method: 'GET',
    path: '/pool/{id}',
    handler: PoolController.find,
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
      auth: 'default'
    }
  },
  {
    method: 'POST',
    path: '/pool',
    handler: PoolController.create,
    options: {
      validate: {
        payload: {},
        options: {
          abortEarly: false,
          allowUnknown: true
        }
      },
      auth: 'default'
    }
  },
  {
    method: 'DELETE',
    path: '/pool/{id}',
    handler: PoolController.remove,
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
      auth: 'default'
    }
  },
  {
    method: 'PUT',
    path: '/pool/{id}',
    handler: PoolController.update,
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
      auth: 'default'
    }
  }
]
