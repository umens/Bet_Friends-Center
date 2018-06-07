const Hapi = require('hapi');
const Mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const User = require('./models/user.model');
const schema = require('./graphql/schema');

/* DB section */
Mongoose.connect('mongodb://localhost:27017/api-bet-friend-center');

Mongoose.connection.once('open', () => {
  console.log(`Connected Mongo DB at localhost:27017`);
});

/* Server section */
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {

  try {

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: Pack.name + ' API Documentation',
            version: Pack.version
          },
          tagsGroupingFilter: (tag) => tag !== 'api' && tag !== 'health' && !tag.match(/^v\d+/),
          grouping: 'tags',
        }
      },
      {
        plugin: graphqlHapi,
        options: {
          path: '/graphql',
          graphqlOptions: {
            schema
          }
        },
        route: {
          cors: true
        }
      },
      {
        plugin: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql'
          }
        },
        route: {
          cors: true
        }
      }
    ]);

    server.route([{
      method: 'GET',
      path: '/',
      options: {
        tags: ['api', 'health'],
        handler: function (request, reply) {
          return reply.response({}).code(200);
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/user',
      options: {
        notes: 'My route notes',
        description: 'Return all Users',
        tags: ['api', 'v1', 'users'],
        handler: function (request, reply) {
          return User.find();
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/user/{id}',
      options: {
        notes: 'My route notes',
        description: 'Return one user by id',
        tags: ['api', 'v1', 'users'],
        handler: function (request, reply) {
          return User.findById(request.params.id);
        },
        // validate: {
        //   params: {
        //     id: Joi.required()
        //   },
        //   options: {
        //     abortEarly: false,
        //     allowUnknown: true
        //   }
        // }
      }
    },
    {
      method: 'PUT',
      path: '/api/v1/user/{id}',
      options: {
        notes: 'My route notes',
        description: 'Update user by id',
        tags: ['api', 'v1', 'users'],
        handler: function (request, reply) {
          return User.findById(request.params.id);
        },
        // validate: {
        //   params: {
        //     id: Joi.required()
        //   },
        //   options: {
        //     abortEarly: false,
        //     allowUnknown: true
        //   }
        // }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/game/{id}',
      options: {
        notes: 'My route notes',
        description: 'Return one game by id',
        tags: ['api', 'v1', 'game'],
        handler: function (request, reply) {
          return User.findById(request.params.id);
        },
        // validate: {
        //   params: {
        //     id: Joi.required()
        //   },
        //   options: {
        //     abortEarly: false,
        //     allowUnknown: true
        //   }
        // }
      }
    }
    ]);

    await server.start();
    console.log(`Server running at ${server.info.uri}`);
  }
  catch (err) {
    console.log(err)
  }
};

init();
