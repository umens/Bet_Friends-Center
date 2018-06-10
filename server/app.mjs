import Hapi from 'hapi';
import Glue from 'glue';
import chalk from 'chalk';
import {
  Database,
  Utils
} from './services';
import {
  ConfigServer,
  ConfigDB
} from './config/default';

const init = async () => {

  try {

    const server = await Glue.compose(ConfigServer, {});

    Database.connect(ConfigDB, server);

    await Utils.addPolicies(server);
    
    await Utils.addRoute(server);

    await server.start();

    server.log(['start', 'server'], chalk.green(`Server running at ${server.info.uri}`));
  } catch (err) {
    console.log(err)
  }
};

init();
