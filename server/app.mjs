import Hapi from 'hapi';
import Glue from 'glue';
import chalk from 'chalk';
import { Database } from './services';
import { ConfigServer, ConfigDB } from './config/default';

const init = async () => {

  try {

    const server = await Glue.compose(ConfigServer, {});
    await server.start();

    Database.connect(ConfigDB, server);

    server.log(['start', 'server'], chalk.green(`Server running at ${server.info.uri}`));
  } catch (err) {
    server.error(['error', 'start', 'server'], chalk.red(`${err}`));
  }
};

init();
