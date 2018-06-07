const Hapi = require('hapi');
const {
  graphqlHapi,
  graphiqlHapi
} = require('apollo-server-hapi');
const chalk = require('chalk');
const Good = require('good');
const Config = require('config');
const Database = require('./services/utils/db');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const graphqlSchema = require('./models');

const init = async () => {

  try {

    const server = Hapi.server(Config.util.toObject(Config.get('server.connection')));

    Database.connect();

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
            graphqlSchema
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
      },
      {
        plugin: Good,
        options: Config.util.toObject(Config.get('logging')),
      }
    ]);

    // server.route([{
    //     method: 'GET',
    //     path: '/',
    //     options: {
    //       tags: ['api', 'health'],
    //       handler: function (request, reply) {
    //         return reply.response({}).code(200);
    //       }
    //     }
    //   },
    //   {
    //     method: 'GET',
    //     path: '/api/v1/user',
    //     options: {
    //       notes: 'My route notes',
    //       description: 'Return all Users',
    //       tags: ['api', 'v1', 'users'],
    //       handler: function (request, reply) {
    //         return User.find();
    //       }
    //     }
    //   },
    //   {
    //     method: 'GET',
    //     path: '/api/v1/user/{id}',
    //     options: {
    //       notes: 'My route notes',
    //       description: 'Return one user by id',
    //       tags: ['api', 'v1', 'users'],
    //       handler: function (request, reply) {
    //         return User.findById(request.params.id);
    //       },
    //       // validate: {
    //       //   params: {
    //       //     id: Joi.required()
    //       //   },
    //       //   options: {
    //       //     abortEarly: false,
    //       //     allowUnknown: true
    //       //   }
    //       // }
    //     }
    //   },
    //   {
    //     method: 'PUT',
    //     path: '/api/v1/user/{id}',
    //     options: {
    //       notes: 'My route notes',
    //       description: 'Update user by id',
    //       tags: ['api', 'v1', 'users'],
    //       handler: function (request, reply) {
    //         return User.findById(request.params.id);
    //       },
    //       // validate: {
    //       //   params: {
    //       //     id: Joi.required()
    //       //   },
    //       //   options: {
    //       //     abortEarly: false,
    //       //     allowUnknown: true
    //       //   }
    //       // }
    //     }
    //   },
    //   {
    //     method: 'GET',
    //     path: '/api/v1/game/{id}',
    //     options: {
    //       notes: 'My route notes',
    //       description: 'Return one game by id',
    //       tags: ['api', 'v1', 'game'],
    //       handler: function (request, reply) {
    //         return User.findById(request.params.id);
    //       },
    //       // validate: {
    //       //   params: {
    //       //     id: Joi.required()
    //       //   },
    //       //   options: {
    //       //     abortEarly: false,
    //       //     allowUnknown: true
    //       //   }
    //       // }
    //     }
    //   }
    // ]);

    await server.start();
    console.log(chalk.green(`Server running at ${server.info.uri}`));
  } catch (err) {
    console.error(chalk.red(`${err}`));
  }
};

init();
