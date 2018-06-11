import * as Models from '../models';
import Joi from 'joi';
import Boom from 'boom';
import jwt from 'jsonwebtoken';
import {
  ConfigAuth
} from '../config/default';
import { Mailer } from '../services';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

const createAccount = {

  handler: async (request, h) => {
    const user = Models.User({
      firstname: request.payload.firstname,
      lastname: request.payload.lastname,
      email: request.payload.email,
      password: request.payload.password
    });
    try {
      const newUser = await user.save();

      const indexCreated = await Models.User.init();

      if (!newUser)
        return Boom.badRequest('problème durant la création du compte');

      const tokenData = {
        scope: [newUser.scope],
        _id: newUser._id
      };

      const mailInfos = await Mailer.sentMailVerificationLink(newUser, jwt.sign(tokenData, ConfigAuth.secretKey));

      console.log(nodemailer.getTestMessageUrl(mailInfos));

      return h.response();
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return Boom.forbidden("please provide another user email");
      }
      return Boom.badImplementation(err);
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
        return Boom.forbidden("invalid username or password");

      const isMatch = await user.comparePassword(request.payload.password)

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
        return Boom.forbidden("invalid username or password");
      }
    } catch (err) {
      return Boom.badImplementation(err);
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

      const decoded = jwt.verify(request.params.token, ConfigAuth.secretKey);

      if (decoded === undefined) return Boom.forbidden("invalid verification link");
      if (decoded.scope[0] != "User") return Boom.forbidden("invalid verification link");

      var user = await Models.User.findById(decoded._id);
      if (!user) return Boom.forbidden("invalid verification link");
      if (user.isVerified === true) return Boom.forbidden("account is already verified");

      user.isVerified = true;
      const updatedUser = await user.save();

      if (!updatedUser) return Boom.notFound("invalid verification link");

      return h.response();
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
  options: {
    validate: {
      params: {
        token: Joi.string().required()
      }
    },
    auth: false
  }
};

const forgotPassword = {

  handler: async (request, h) => {
    try {
      const user = await Models.User.findOne({ email: request.payload.email });
      if (!user)
        return Boom.forbidden("invalid username");

      const newMDP = randomstring.generate(8);
      user.password = newMDP;
      const updatedUser = await user.save();

      if (!updatedUser) return Boom.notFound("invalid verification link");

      const mailInfos = await Mailer.sentMailForgotPassword(user, newMDP);

      console.log(nodemailer.getTestMessageUrl(mailInfos));

      return h.response();
    } catch (err) {
      return Boom.badImplementation(err);
    };
  },
  options: {
    validate: {
      payload: {
        email: Joi.string().email().required()
      }
    },
    auth: false
  }
};

const resendVerificationEmail = {

  handler: async (request, h) => {
    try {
      const user = await Models.User.findOne({ email: request.payload.email });
      if (!user)
        return Boom.forbidden("invalid username");

      if (user.isVerified === true) return Boom.forbidden("account is already verified");

      const tokenData = {
        scope: [user.scope],
        _id: user._id
      };

      const mailInfos = await Mailer.sentMailVerificationLink(user, jwt.sign(tokenData, ConfigAuth.secretKey));

      console.log(nodemailer.getTestMessageUrl(mailInfos));

      return h.response();
    } catch (err) {
      return Boom.badImplementation(err);
    };
  },
  options: {
    validate: {
      payload: {
        email: Joi.string().email().required()
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
