'use strict';
import chalk from 'chalk';
import mongoose from "mongoose";

const Database = {

  connect: (dbConfig, server) => {
    mongoose.connect(dbConfig.uri, dbConfig.options);

    mongoose.connection.on('connecting', () => {
      // console.info(chalk.blue('connecting to MongoDB...'));
      server.log(['info', 'database', 'connection'], chalk.blue('connecting to MongoDB...'));
    });

    mongoose.connection.on('error', (e) => {
      // console.error(chalk.red('Mongoose can not open connection'));
      // console.error(chalk.red(e));
      server.log(['error', 'database', 'connection'], chalk.red('Mongoose can not open connection'));
      server.log(['error', 'database', 'connection'], chalk.red(e));
      mongoose.disconnect();
    });

    mongoose.connection.on('connected', () => {
      // console.log(chalk.green('Connection DB ok', dbConfig.uri));
      server.log(['database', 'connection'], chalk.green('Connection DB ok', dbConfig.uri));
    });

    mongoose.connection.once('open', function () {
      // console.info(chalk.blue('MongoDB connection opened!'));
      server.log(['info', 'database', 'connection'], chalk.blue('MongoDB connection opened!'));
    });

    mongoose.connection.on('reconnected', function () {
      // console.log(chalk.green('MongoDB reconnected!'));
      server.log(['database', 'connection'], chalk.green('MongoDB reconnected!'));
    });

    mongoose.connection.on('disconnected', () => {
      // console.warn(chalk.yellow('Connection DB lost'));
      server.log(['warn', 'database', 'connection'], chalk.yellow('Connection DB lost'));

      setTimeout(() => {
        mongoose.connect(dbConfig.uri, dbConfig.options);
        // console.info(chalk.blue('DB reconnection'));
        server.log(['info', 'database', 'connection'], chalk.blue('DB reconnection'));
      }, 15000);
    });
  }
};

export { Database };
