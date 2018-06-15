import Agenda from 'agenda';
import * as Models from '../models';
import {
  ConfigDB
} from '../config/default';
import { SoccerDataApi } from '../services';

export const JobsConsumer = {

  run: async () => {
    const agenda = await new Agenda({ db: {address: ConfigDB.uri}});

    await new Promise(resolve => agenda.once('ready', resolve));

    agenda.define('sync current seasons', async (job) => {
      if (await checkCancelled(job)) {
        return;
      }
      try {
        var leagues = await Models.League.find();
        for (const league of leagues) {
          await SoccerDataApi.updatesSeasonsDatas(league);          
        }
      }
      catch (err) {
        console.log(err)
        return err
      }
    });

    // Define a "job", an arbitrary function that agenda can execute
    // agenda.define('hello', async (job) => {
    //   if (await checkCancelled(job)) {
    //     return;
    //   }
    //   console.log('Hello, World!');
    // });

    // `job` is an object representing the job that `producer.js` scheduled.
    // `job.attrs` contains the raw document that's stored in MongoDB, so
    // `job.attrs.data` is how you get the `data` that `producer.js` passes
    // to `schedule()`
    agenda.define('print', async (job) => {
      if (await checkCancelled(job)) {
        return;
      }
      console.log(job.attrs.data.message);
    });

    await agenda.start();

    // await agenda.every('1 minutes', 'delete old users');

    // // Schedule a job for 5 seconds from now and `await` until it has been
    // // persisted to MongoDB
    // await new Promise((resolve, reject) => {
    //   agenda.schedule(new Date(Date.now() + 5000), 'hello', {}, promiseCallback(resolve, reject));
    // });
  //   await new Promise((resolve, reject) => {
  //   agenda.schedule(new Date(Date.now() + 5000), 'sync current seasons', {}, promiseCallback(resolve, reject));
  // });


    // Cancel the job, which deletes the document from the 'jobs' collection
    // await new Promise((resolve, reject) => {
    //   agenda.cancel({
    //     name: 'hello'
    //   }, promiseCallback(resolve, reject));
    // });

    // This function queries mongodb to make sure the job is was not deleted
    // after it was locked
    async function checkCancelled(job) {
      const count = await agenda._mdb.collection('agendaJobs').count({
        _id: job.attrs._id
      });
      return !(count > 0);
    }

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
