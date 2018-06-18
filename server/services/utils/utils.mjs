import fs from 'fs';
import path from 'path';
import {
  ConfigAuth
} from '../../config/default';
import expose from './expose.js';
const {
  __dirname
} = expose;
import {
  AdminPolicy,
  DefaultPolicy
} from '../../policies';
import {
  BaseRoutes,
  AuthRoutes,
  PoolRoutes
} from '../../routes';

const Utils = {
  getFiles: (path) => {
    path = path[path.length - 1] !== '/' ? path + '/' : path;
    let files = [];
    try {
      files = fs.readdirSync(path.resolve(__dirname, '../..', path));
    } catch (e) {
      console.log(e);
      process.exit();
    }
    return files.map((file) => {
      return path.resolve(__dirname, '../..', path, file)
    });
  },

  addRoute: async (server) => {
    // Utils.getFiles('routes').forEach((routesFile) => {

    var Routes = [];
    Routes.push(BaseRoutes);
    Routes.push(AuthRoutes);
    Routes.push(PoolRoutes);

    Routes.forEach((route) => {
      // console.log(route)
      server.route(route);
    });
    return Promise.resolve();

    // console.log(routesFile)
    // routesFile=  routesFile.replace('.mjs', '.js');
    // import(routesFile)
    // .then(routesModule => {
    //     console.log(routesModule)
    //     console.log(routesModule.default)
    // })
    // .catch(error => {
    //     /* Error handling */
    //     console.log(error)
    // });

    // const routesModule = require.import(routesFile).default;

    // routesModule.forEach((route) => {
    //     console.log(route)
    //     server.route(route);
    // });
    // });
  },

  addPolicies: async (server) => {

    //         Utils.getFiles('policies').forEach((policyFile) => {
    //             // import 
    //             // console.log(import(policyFile))
    // // console.log(policyFile)
    //             // let policy = import './' + policyFile;
    //             try {
    //                 // import(policyFile).then(importerPolicy => {
    //                     // var policy = importerPolicy;
    //                     var policy = import(policyFile);
    //                     let name = path.basename(policyFile, '.mjs');
    //                     let namePolicie = name.split('.')[0];       

    //                     server.auth.strategy(namePolicie, 'jwt', {
    //                         key: ConfigAuth.secretKey,
    //                         validate: policy,
    //                         verifyOptions: {
    //                             algorithms: ['HS256']
    //                         }
    //                     });
    //                     // if (name == 'default') {                    
    //                     //     server.auth.default('default', 'jwt');
    //                     // }
    //                 // });
    //             } catch (error) {
    //                 console.log(error)
    //             }

    //         });

    //         server.auth.default('default', 'jwt');

    server.auth.strategy('admin', 'jwt', {
      key: ConfigAuth.secretKey,
      validate: AdminPolicy.validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });
    server.auth.strategy('default', 'jwt', {
      key: ConfigAuth.secretKey,
      validate: DefaultPolicy.validate,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });

    server.auth.default('default', 'jwt');
  },

};

export {
  Utils
};
