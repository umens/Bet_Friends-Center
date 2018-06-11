import Boom from 'boom';
import * as Models from '../models';
import jwt from 'jsonwebtoken';

export async function validate(decoded, request, h) {

  if (typeof decoded === 'undefined') {
    return {
      isValid: false
    };
  }

  return Models.User.findOne({
    _id: decoded._id,
    scope: 'Admin'
  }).exec().then((currentUser) => {

    if (!currentUser) return Boom.unauthorized('You must be admin user');

    return {
      isValid: true
    };
  }).catch((err) => {

    return {
      isValid: false
    };

  });

  // try {
  //   if (typeof decoded === 'undefined') {
  //     return {
  //       isValid: false
  //     };
  //   }

  //   const currentUser = await Models.User.findOne({
  //     _id: decoded._id,
  //     scope: 'Admin'
  //   });

  //   if (!currentUser) return Boom.unauthorized('You must be admin user');

  //   return {
  //     isValid: true
  //   };
  // } catch (error) {
  //   return {
  //     isValid: false
  //   };
  // }
};
