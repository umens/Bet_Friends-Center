import Agenda from 'agenda';
import {
  ConfigDB
} from '../config/default';

export const JobsProducer = {

  run: async () => {
    const agenda = await new Agenda({ db: {address: ConfigDB.uri}});

    await new Promise(resolve => agenda.once('ready', resolve));

    // Schedule a job for 1 second from now and persist it to mongodb.
    // Jobs are uniquely defined by their name, in this case "print"
    // agenda.schedule(new Date(Date.now() + 2000), 'hello');
    await agenda.every('0 */2 * * *', 'sync current seasons');

    // The third parameter to `schedule()` is an object that can contain
    // arbitrary data. This data will be stored in the `data` property
    // in the document in mongodb
    // agenda.schedule(new Date(Date.now() + 1000), 'print', {
    //   message: 'Hello! Ulysse'
    // });

  }

}
