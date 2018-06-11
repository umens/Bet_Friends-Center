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
    method: 'GET',
    path: '/verify-email/{token}'
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
