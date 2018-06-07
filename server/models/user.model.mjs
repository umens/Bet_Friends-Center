import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';

const customizationOptions = {};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const UserSchema = new Mongoose.Schema({
  usermane: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
  password: String,
  picture: String,
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

// module.exports = Mongoose.model('User', UserSchema);

export { User, UserTC, UserRootQuery, UserRootMutation };
