'use strict';

const appPackage = require(__dirname + '/package.json');
const Hapi = require('hapi');
const colors = require('colors/safe');
const Config = require('config');
const utils = require('./services/utils/utils.js');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const db = require('./services/utils/db.js');
const Good = require('good');

const logging = Config.util.toObject(Config.get('logging'));
const swaggerOptions = {
  info: {
    title: appPackage.name + ' Documentation',
    version: appPackage.version,
  },
};


async function start() {

  try {
    db.connect();

    utils.addModels();

    const server = new Hapi.Server(Config.util.toObject(Config.get('server.connection')));

    await utils.addPolicies(server);

    utils.addRoute(server);

    await server.register([
      Inert,
      Vision,
      {
        plugin: require('hapi-swaggered'),
        options: {
          info: {
            title: 'Example API',
            description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
            version: '1.0'
          }
        }
      },
      {
        plugin: require('hapi-swaggered-ui'),
        options: {
          title: 'Example API',
          path: '/docs',
          authorization: null,
          swaggerOptions: {
            validatorUrl: null
          },
          auth: false
        }
      },
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      {
        plugin: Good,
        options: logging,
      }
    ]);

    server.route({
      path: '/',
      method: 'GET',
      handler(request, h) {
        return h.response().redirect('/docs')
      },
      options: {
        auth: false
      }
    })

    await server.start();
    console.log(colors.green('%s %s started on %s'), appPackage.name, appPackage.version, server.info.uri);

    module.exports = server;

  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}

start()
