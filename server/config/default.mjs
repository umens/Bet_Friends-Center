'use strict'
import Pkg from '../package';
import graphql from 'apollo-server-hapi';
import Agenda from 'agenda';
import Agendash from 'agendash';

import * as Models from '../models';

export const ConfigDB = {
  uri: "mongodb://localhost:27017/api-bet-friend-center",
  options: {
    autoReconnect: true
  }
}

const agenda = new Agenda({db: {address: ConfigDB.uri }});

export const ConfigServer = {
  server: {
    host: "localhost",
    // cache: "redis",
    port: 3000,
    routes: {
      cors: {
        origin: [
          "*"
        ],
        headers: [
          "Access-Control-Allow-Origin",
          "Access-Control-Allow-Headers",
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Authorization"
        ],
        credentials: true
      }
    },
  },
  register: {
    plugins: [
      'inert',
      'vision',
      {
        plugin: "hapi-swagger",
        options: {
          info: {
            title: Pkg.name + " API Documentation",
            version: Pkg.version
          },
          tagsGroupingFilter: (tag) => tag !== 'api' && tag !== 'health' && !tag.match(/^v\d+/),
          grouping: "tags"
        }
      },
      {
        plugin: graphql.graphqlHapi,
        options: {
          path: '/graphql',
          graphqlOptions: {
            schema: Models.graphqlSchema
          },
          route: {
            cors: true,
            auth: false
          }
        }
      },
      {
        plugin: graphql.graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql'
          },
          route: {
            cors: true,
            auth: false
          }
        }
      },
      {
        plugin: "good",
        options: {
          reporters: {
            console: [
              {
                module: "good-squeeze",
                name: "Squeeze",
                args: [
                  {
                    response: "*",
                    log: "*"
                  }
                ]
              },
              {
                module: "white-out",
                args: [
                  {
                    password: "remove",
                    email: "^(.*)(?=@)"
                  }
                ]
              },
              {
                module: "good-console",
                args: [
                  {
                    format: "[[]DD/MMM/YYYY HH:mm:ss ZZ[]]"
                  }
                ]
              },
              "stdout"
            ]
          }
        }
      },
      {
        plugin: "hapijs-status-monitor",
        options: {
          title: 'Monitor',
          path: "/status",
          routeConfig: {
            auth: false
          }
        }
      },
      'hapi-auth-jwt2',
      {
        plugin: Agendash(agenda, {
          middleware: 'hapi',
          // can place other options (e.g. title) here
        }),
        options: {},
        routes: {
          prefix: '/agendash'
        }
      }
    ]
  }
}

export const ConfigAuth = {
  "saltFactor": 10,
  "secretKey": "ChangeThisSecret"
}

export const ConfigMailer = {
  service: "",
  auth: {
    user: "",
    password: "!"
  }
}
