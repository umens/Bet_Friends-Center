import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import bcrypt from 'bcrypt';

import { HashPassword } from "../services";

const customizationOptions = {};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
  admin: Boolean,
  password: String,
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
});

UserSchema.methods.comparePassword = async function (candidatePassword, cb) {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw
  }
  return match;
  // bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
  //   if (err) {
  //     return cb(err);
  //   }
  //   cb(null, isMatch);
  // });
};

UserSchema.pre('save', async function () {
  await HashPassword();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  if (!this.isModified("password")) {
    await HashPassword();
  }
  await function () {
    return this.update({}, {
      $set: {
        updatedAt: new Date()
      }
    });
  };
});

const User = Mongoose.model('User', UserSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const UserTC = composeWithMongoose.composeWithMongoose(User, customizationOptions);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
const UserRootQuery = {
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
};

const UserRootMutation = {
  userCreate: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
};

export { User, UserTC, UserRootQuery, UserRootMutation };
