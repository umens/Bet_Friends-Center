import {
  AuthController
} from '../controllers';

export default [
  Object.assign({
      method: 'POST',
      path: '/create-account'
    },
    AuthController.createAccount
  ),
  Object.assign({
      method: 'POST',
      path: '/login'
    },
    AuthController.login
  ),
  Object.assign({
      method: 'POST',
      path: '/verify-email'
    },
    AuthController.verifyEmail
  ),
  Object.assign({
      method: 'POST',
      path: '/forgot-password'
    },
    AuthController.forgotPassword
  ),
  Object.assign({
      method: 'POST',
      path: '/resend-verification-email'
    },
    AuthController.resendVerificationEmail
  ),
]
