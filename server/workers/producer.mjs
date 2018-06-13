import Agenda from 'agenda';
import MongoClient from 'mongodb';
import {
  ConfigDB
} from '../config/default';

export const JobsProducer = {

  run: async () => {
    console.log(Agenda)
    const db = await MongoClient.connect(ConfigDB.uri + ConfigDB.jobDBName);
    const agenda = new Agenda().mongo(db, 'jobs');

    await new Promise(resolve => agenda.once('ready', resolve));

    // Schedule a job for 1 second from now and persist it to mongodb.
    // Jobs are uniquely defined by their name, in this case "print"
    agenda.schedule(new Date(Date.now() + 2000), 'hello');

    // The third parameter to `schedule()` is an object that can contain
    // arbitrary data. This data will be stored in the `data` property
    // in the document in mongodb
    agenda.schedule(new Date(Date.now() + 1000), 'print', {
      message: 'Hello! Ulysse'
    });

  }

}
