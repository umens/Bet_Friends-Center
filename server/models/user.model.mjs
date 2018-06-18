import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import mongoose_delete from 'mongoose-delete';
import bcrypt from 'bcrypt';
import {
  PoolTC
} from './pool.model';

import {
  HashPassword
} from "../services";

const customizationOptions = {
  fields: {
    remove: ['updatedAt', 'createdAt', 'deleted', 'deletedAt', 'deletedBy', 'password', 'scope', 'isVerified'],
  },
};

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
    required: true,
    default: 'User'
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
  picture: {
    type: String,
    default: null
  },
  pools: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Pool'
  }],
}, {
  timestamps: true
});

UserSchema.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    return error;
  }
};

UserSchema.virtual('fullname').get(function () {
  return this.firstname + ' ' + this.lastname;
});

UserSchema.pre('save', async function () {
  try {
    if (this.isModified("password")) {
      await HashPassword(this);
    }
  } catch (error) {
    return error
  }
});

UserSchema.pre('findOneAndUpdate', async function () {
  // console.log(this)
  if (this.isModified("password")) {
    await HashPassword(this);
  }
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
    // doc.updatedAt = new Date();
    return doc;
  };

  return next(rp);
});

// add relations
UserTC.addRelation(
  'pools', {
    resolver: () => PoolTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.pools,
    },
    projection: {
      pools: 1
    }, // point fields in source object, which should be fetched from DB
  }
);

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
  // userCreate: UserTC.getResolver('createOne'),
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
