import Agenda from 'agenda';
import Mongoose from 'mongoose';
import {
  ConfigDB
} from '../config/default';

export const JobsConsumer = {

  run: async () => {
    // const mongoConnectionString = 'mongodb://127.0.0.1/agenda';
    const myMongoClient = await Mongoose.connect(ConfigDB.uri);

    // const agenda = new Agenda({db: {address: ConfigDB.uri}});

    // Or override the default collection name:
    // const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName'}});

    // or pass additional connection options:
    // const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});

    // or pass in an existing mongodb-native MongoClient instance
    const agenda = new Agenda({mongo: myMongoClient.connection});

    agenda.define('delete old users', (job, done) => {
      console.log('delete user');
      done();
    });

    // (async function() { // IIFE to give access to async/await
      await agenda.start();

      await agenda.every('3 minutes', 'delete old users');
    // })();

    // const db = await Mongoose.connect(ConfigDB.uri);
    // // console.log(db.connection)
    // // const agenda = new Agenda({ db: {address: ConfigDB.uri + ConfigDB.jobDBName}});
    // const agenda = new Agenda({mongo: db.connection});

    // // Define a "job", an arbitrary function that agenda can execute
    // agenda.define('hello', async (job) => {
    //   // if (await checkCancelled(job)) {
    //   //   return;
    //   // }
    //   console.log('Hello, World!');
    //   process.exit(0);
    // });
    // // `job` is an object representing the job that `producer.js` scheduled.
    // // `job.attrs` contains the raw document that's stored in MongoDB, so
    // // `job.attrs.data` is how you get the `data` that `producer.js` passes
    // // to `schedule()`
    // agenda.define('print', async (job) => {
    //   // if (await checkCancelled(job)) {
    //   //   return;
    //   // }
    //   console.log(job.attrs.data.message);
    //   process.exit(0);
    // });

    // // Wait for agenda to connect. Should never fail since connection failures
    // // should happen in the `await MongoClient.connect()` call.
    // await new Promise(resolve => agenda.once('ready', resolve));

    // // `start()` is how you tell agenda to start processing jobs. If you just
    // // want to produce (AKA schedule) jobs then don't call `start()`
    // agenda.start();

    // // Schedule a job for 5 seconds from now and `await` until it has been
    // // persisted to MongoDB
    // await new Promise((resolve, reject) => {
    //   console.log('test')
    //   agenda.schedule(new Date(Date.now() + 5000), 'hello', {}, promiseCallback(resolve, reject));
    // });


    // // // Cancel the job, which deletes the document from the 'jobs' collection
    // // await new Promise((resolve, reject) => {
    // //   agenda.cancel({
    // //     name: 'hello'
    // //   }, promiseCallback(resolve, reject));
    // // });

    // // This function queries mongodb to make sure the job is was not deleted
    // // after it was locked
    // async function checkCancelled(job) {
    //   const count = await db.connection.collection('jobs').count({
    //     _id: job.attrs._id
    //   });
    //   return !(count > 0);
    // }

  }

}

function promiseCallback(resolve, reject) {
  return function (error, res) {
    if (error) {
      return reject(error);
    }
    resolve(res);
  };
}
