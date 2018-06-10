import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import bcrypt from 'bcrypt';

import {
  HashPassword
} from "../services";

const customizationOptions = {};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const UserSchema = new Mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  // here we defines the user role like admin, customer, etc..
  scope: {
    type: String,
    enum: ['User', 'Admin'],
    required: true
  },
  //it tells about the user account/email verification. By default it is false which is not verified and changes to true when account/email gets verified
  isVerified: {
    type: Boolean,
    default: false
  },
  // hashed password is saved
  password: {
    type: String,
    required: true
  },
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

UserSchema.methods.comparePassword = async (password) => {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    return error;
  }
};

UserSchema.virtual('fullName').get(function () {
  return this.firstname + ' ' + this.lastname;
});

UserSchema.pre('save', async function () {
  await HashPassword(this);
});

UserSchema.pre('findOneAndUpdate', async function () {
  if (this.isModified("password")) {
    await HashPassword(this);
  }
  await
  function () {
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

// add specific hooks
UserTC.wrapResolverResolve('updateById', next => async rp => {

  // extend resolve params with hook
  rp.beforeRecordMutate = async (doc, resolveParams) => {
    if (doc.isModified("password")) {
      await HashPassword(doc);
    }
    doc.updatedAt = new Date();
    return doc;
  };

  return next(rp);
});

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

export {
  User,
  UserTC,
  UserRootQuery,
  UserRootMutation
};
