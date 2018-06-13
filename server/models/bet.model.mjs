import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import mongoose_delete from 'mongoose-delete';
import {
  FixtureTC,
  UserTC,
  CompetitionTC
} from './';

const customizationOptions = {
  fields: {
    remove: ['updatedAt', 'createdAt', 'deleted', 'deletedAt', 'deletedBy'],
  },
};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const BetSchema = new Mongoose.Schema({
  goalsHomeTeam: {
    type: Number,
    default: null,
  },
  goalsAwayTeam: {
    type: Number,
    default: null,
  },
  bestBet: {
    type: Boolean,
    default: null,
  },
  fixture: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Fixture',
    required: true
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  competition: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: true
  },
}, {
  timestamps: true
});

BetSchema.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true
});

const Bet = Mongoose.model('Bet', BetSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const BetTC = composeWithMongoose.composeWithMongoose(Bet, customizationOptions);

// add relations
BetTC.addRelation(
  'fixture', {
    resolver: () => FixtureTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.fixture,
    },
    projection: {
      fixture: 1
    }, // point fields in source object, which should be fetched from DB
  }
);
BetTC.addRelation(
  'user', {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.user,
    },
    projection: {
      user: 1
    }, // point fields in source object, which should be fetched from DB
  }
);
BetTC.addRelation(
  'competition', {
    resolver: () => CompetitionTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.competition,
    },
    projection: {
      competition: 1
    }, // point fields in source object, which should be fetched from DB
  }
);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD BET OPERATIONS
const BetRootQuery = {
  betById: BetTC.getResolver('findById'),
  betByIds: BetTC.getResolver('findByIds'),
  betOne: BetTC.getResolver('findOne'),
  betMany: BetTC.getResolver('findMany'),
  betCount: BetTC.getResolver('count'),
  betConnection: BetTC.getResolver('connection'),
  betPagination: BetTC.getResolver('pagination'),
};

const BetRootMutation = {
  betCreate: BetTC.getResolver('createOne'),
  betUpdateById: BetTC.getResolver('updateById'),
  betUpdateOne: BetTC.getResolver('updateOne'),
  betUpdateMany: BetTC.getResolver('updateMany'),
  betRemoveById: BetTC.getResolver('removeById'),
  betRemoveOne: BetTC.getResolver('removeOne'),
  betRemoveMany: BetTC.getResolver('removeMany'),
};

export {
  Bet,
  BetTC,
  BetRootQuery,
  BetRootMutation
};
