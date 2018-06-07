'use strict';
const chalk = require('chalk');
const Mongoose = require('mongoose');
const Config = require('config');

// const Database = {

//     connect: () => {
//         Mongoose.connect(Config.get('mongodb.uri'), {
//             // useMongoClient: true
//             autoReconnect: true
//         });

//         Mongoose.connection.on('connecting', () => {
//             console.info(chalk.blue('connecting to MongoDB...'));
//         });

//         Mongoose.connection.on('error', (e) => {
//             console.error(chalk.red('Mongoose can not open connection'));
//             err(e);
//             Mongoose.disconnect();
//             //process.exit();
//         });

//         Mongoose.connection.on('connected', () => {
//             console.log(chalk.green('Connection DB ok', Config.get('mongodb.uri')));
//         });

//         Mongoose.connection.once('open', function() {
//             console.info(chalk.blue('MongoDB connection opened!'));
//         });

//         Mongoose.connection.on('reconnected', function () {
//             console.log('MongoDB reconnected!');
//             console.log(chalk.green('MongoDB reconnected!'));
//           });

//         Mongoose.connection.on('disconnected', () => {
//             console.error(chalk.red('Connection DB lost'));

//             setTimeout(() => {
//                 Mongoose.connect(Config.get('mongodb.uri'), {
//                     autoReconnect: true
//                 });
//                 console.warn(chalk.yellow('DB reconnection'));
//             }, 15000);
//         });
//     }
// }

module.exports = {

    connect: () => {
        Mongoose.connect(Config.get('mongodb.uri'), {
            // useMongoClient: true
            autoReconnect: true
        });

        Mongoose.connection.on('connecting', () => {
            console.info(chalk.blue('connecting to MongoDB...'));
        });

        Mongoose.connection.on('error', (e) => {
            console.error(chalk.red('Mongoose can not open connection'));
            err(e);
            Mongoose.disconnect();
            //process.exit();
        });

        Mongoose.connection.on('connected', () => {
            console.log(chalk.green('Connection DB ok', Config.get('mongodb.uri')));
        });

        Mongoose.connection.once('open', function() {
            console.info(chalk.blue('MongoDB connection opened!'));
        });

        Mongoose.connection.on('reconnected', function () {
            console.log('MongoDB reconnected!');
            console.log(chalk.green('MongoDB reconnected!'));
          });

        Mongoose.connection.on('disconnected', () => {
            console.error(chalk.red('Connection DB lost'));

            setTimeout(() => {
                Mongoose.connect(Config.get('mongodb.uri'), {
                    autoReconnect: true
                });
                console.warn(chalk.yellow('DB reconnection'));
            }, 15000);
        });
    }
}

// export { Database };

// module.exports.DB = {
//     connect: () => {
//         Mongoose.connect(Config.get('mongodb.uri'), {
//             // useMongoClient: true
//             server: {
//                 auto_reconnect: true
//             }
//         });

//         Mongoose.connection.on('connecting', () => {
//             console.info(chalk.blue('connecting to MongoDB...'));
//         });

//         Mongoose.connection.on('error', (e) => {
//             console.error(chalk.red('Mongoose can not open connection'));
//             err(e);
//             Mongoose.disconnect();
//             //process.exit();
//         });

//         Mongoose.connection.on('connected', () => {
//             console.log(chalk.green('Connection DB ok', Config.get('mongodb.uri')));
//         });

//         Mongoose.connection.once('open', function() {
//             console.info(chalk.blue('MongoDB connection opened!'));
//         });

//         Mongoose.connection.on('reconnected', function () {
//             console.log('MongoDB reconnected!');
//             console.log(chalk.green('MongoDB reconnected!'));
//           });

//         Mongoose.connection.on('disconnected', () => {
//             console.error(chalk.red('Connection DB lost'));

//             setTimeout(() => {
//                 Mongoose.connect(Config.get('mongodb.uri'), {
//                     server: {
//                         auto_reconnect: true
//                     }
//                 });
//                 console.warn(chalk.yellow('DB reconnection'));
//             }, 15000);
//         });
//     }
// };