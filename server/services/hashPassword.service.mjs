import bcrypt from 'bcrypt';

async function HashPassword(next) {

  try {
    const hash = await bcrypt.hashAsync(this.password, 16.5);

    this.password = hash;
    next();

  } catch (err) {
    next(err);
  }


  let user = (this.op === 'update') ? this._update.$set : this;
  if (!user || !user.password || user.password.length === 60) {
    throw new Error('Can\'t hash password');
  }
  Bcrypt.genSalt(Config.get('server.auth.saltFactor'), (err, salt) => {
    if (err) {
      throw new Error(err)
    }
    Bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
};

export { HashPassword };
