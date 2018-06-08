'use strict'
import Pkg from '../package';
import graphql from 'apollo-server-hapi';

import * as graphqlSchema from '../models';

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
            schema: graphqlSchema.graphqlSchema
          }
        },
        route: {
          cors: true
        }
      },
      {
        plugin: graphql.graphiqlHapi,
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
      'hapi-auth-jwt2'
    ]
  }
}

export const ConfigDB = {
  uri: "mongodb://localhost:27017/api-bet-friend-center",
  options: {
    autoReconnect: true
  }
}

export const ConfigAuth = {
  uri: "mongodb://localhost:27017/api-bet-friend-center",
  options: {
    autoReconnect: true
  }
}
