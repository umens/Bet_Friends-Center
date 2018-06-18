import Joi from 'joi';
import {
  AuthController
} from '../controllers';

export default [{
    method: 'POST',
    path: '/create-account',
    handler: AuthController.createAccount,
    options: {
      validate: {
        payload: {
          firstname: Joi.string().required(),
          lastname: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      },
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: AuthController.login,
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      },
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/verify-email/{token}',
    handler: AuthController.verifyEmail,
    options: {
      validate: {
        params: {
          token: Joi.string().required()
        }
      },
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/forgot-password',
    handler: AuthController.forgotPassword,
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required()
        }
      },
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/resend-verification-email',
    handler: AuthController.resendVerificationEmail,
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required()
        }
      },
      auth: false
    }
  },
]
