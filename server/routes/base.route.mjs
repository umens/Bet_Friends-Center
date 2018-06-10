import Joi from 'joi';
import Boom from 'boom';

export default [{
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      try {
        return h.response({
          text: 'Token not required'
        });
      } catch (err) {
        throw Boom.badRequest(err);
      }
    },
    options: {
      auth: false
    }

  },
  {
    method: '*',
    path: '/{p*}',
    handler: async (request, h) => {
      return Boom.notFound();
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
  }
]
