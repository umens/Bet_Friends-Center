import bcrypt from 'bcrypt';
import { ConfigAuth } from '../config/default';

async function HashPassword(ctx) {

  try {
    let user = (ctx.op === 'update') ? ctx._update.$set : ctx;
    if (!user || !user.password || user.password.length === 60) {
      return new Error('Un problème est survenu lors du hash');
    }
    const hash = await bcrypt.hash(ctx.password, ConfigAuth.saltFactor);

    ctx.password = hash;
    return Promise.resolve();

    // ctx.password = hash;
    // return hash;

  } catch (err) {
    return err
  }

};

export { HashPassword };
