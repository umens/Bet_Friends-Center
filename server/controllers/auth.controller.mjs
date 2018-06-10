import * as Models from '../models';
import Joi from 'joi';
import Boom from 'boom';
import jwt from 'jsonwebtoken';
import {
  ConfigAuth
} from '../config/default';

const createAccount = {

  handler: async (request, h) => {
    const user = Models.User({
      firstname: request.payload.firstname,
      lastname: request.payload.lastname,
      email: request.payload.email,
      password: request.payload.password,
      scope: "User"
    });
    try {
      const newUser = await user.save();

      const indexCreated = await Models.User.init();
      
      if(!newUser)
        return Boom.badRequest('problème durant la création du compte');

      return h.response();
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return Boom.badRequest('Duplicate account');
      }
      return Boom.badRequest(err);
    };
  },
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
};

const login = {

  handler: async (request, h) => {
    try {
      const user = await Models.User.findOne({
        email: request.payload.email
      });
      if (!user)
        throw Boom.forbidden("invalid username or password");

      const isMatch = user.comparePassword(request.payload.password)

      if (isMatch) {
        if (!user.isVerified)
          return Boom.forbidden("Your email address is not verified. please verify your email address to proceed");

        var tokenData = {
          scope: [user.scope],
          _id: user._id
        };
        var res = {
          username: user.fullname,
          picture: user.picture,
          scope: user.scope,
          token: jwt.sign(tokenData, ConfigAuth.secretKey)
        };
        return res;
      } else {
        throw Boom.forbidden("invalid username or password");
      }
    } catch (err) {
      return Boom.badRequest(err);
    };
  },
  options: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    },
    auth: false
  }
};

const verifyEmail = {

  handler: async (request, h) => {
    try {
      const user = await Models.User.findOne({
        email: request.payload.email
      });
      if (!user)
        throw Boom.forbidden("invalid username or password");

      const isMatch = user.comparePassword(request.payload.password)

      if (isMatch) {
        if (!user.isVerified)
          return Boom.forbidden("Your email address is not verified. please verify your email address to proceed");

        var tokenData = {
          scope: [user.scope],
          _id: user._id
        };
        var res = {
          username: user.fullname,
          picture: user.picture,
          scope: user.scope,
          token: jwt.sign(tokenData, ConfigAuth.secretKey)
        };
        return res;
      } else {
        throw Boom.forbidden("invalid username or password");
      }
    } catch (err) {
      return Boom.badRequest(err);
    };
  },
  options: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    },
    auth: false
  }
};

const forgotPassword = {

  handler: async (request, h) => {
    try {
      const user = await Models.User.findOne({
        email: request.payload.email
      });
      if (!user)
        throw Boom.forbidden("invalid username or password");

      const isMatch = user.comparePassword(request.payload.password)

      if (isMatch) {
        if (!user.isVerified)
          return Boom.forbidden("Your email address is not verified. please verify your email address to proceed");

        var tokenData = {
          scope: [user.scope],
          _id: user._id
        };
        var res = {
          username: user.fullname,
          picture: user.picture,
          scope: user.scope,
          token: jwt.sign(tokenData, ConfigAuth.secretKey)
        };
        return res;
      } else {
        throw Boom.forbidden("invalid username or password");
      }
    } catch (err) {
      return Boom.badRequest(err);
    };
  },
  options: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    },
    auth: false
  }
};

const resendVerificationEmail = {

  handler: async (request, h) => {
    try {
      const user = await Models.User.findOne({
        email: request.payload.email
      });
      if (!user)
        throw Boom.forbidden("invalid username or password");

      const isMatch = user.comparePassword(request.payload.password)

      if (isMatch) {
        if (!user.isVerified)
          return Boom.forbidden("Your email address is not verified. please verify your email address to proceed");

        var tokenData = {
          scope: [user.scope],
          _id: user._id
        };
        var res = {
          username: user.fullname,
          picture: user.picture,
          scope: user.scope,
          token: jwt.sign(tokenData, ConfigAuth.secretKey)
        };
        return res;
      } else {
        throw Boom.forbidden("invalid username or password");
      }
    } catch (err) {
      return Boom.badRequest(err);
    };
  },
  options: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    },
    auth: false
  }
};

export {
  createAccount,
  login,
  verifyEmail,
  forgotPassword,
  resendVerificationEmail
};
