import * as Models from '../models';
import jwt from 'jsonwebtoken';

export async function validate(decoded, request, h) {

  if (typeof decoded === 'undefined') {
    return {
      isValid: false
    };
  }

  return Models.User.findOne({
    _id: decoded._id
  }).exec().then((currentUser) => {

    if (!currentUser) return {
      isValid: false
    };
    
    return {
      isValid: true
    };
  }).catch((err) => {

    return {
      isValid: false
    };

  });
};
