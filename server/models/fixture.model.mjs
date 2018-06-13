import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import mongoose_delete from 'mongoose-delete';
import {
  SeasonTC,
  TeamTC
} from './';

const customizationOptions = {
  fields: {
    remove: ['updatedAt', 'createdAt', 'deleted', 'deletedAt', 'deletedBy'],
  },
};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const FixtureSchema = new Mongoose.Schema({
  date: {
    type: Date,
    index: true,
    required: true
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'TIMED', 'POSTPONED', 'IN_PLAY', 'CANCELED', 'FINISHED'],
    required: true,
    default: 'SCHEDULED'
  },
  matchDay: {
    type: Number,
    required: true
  },
  season: { type: Mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
  homeTeam: { type: Mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: Mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  result: {
    goalsHomeTeam: {
      type: Number,
      default: null,
    },
    goalsAwayTeam: {
      type: Number,
      default: null,
    },
  },
  odds: {
    type: String,
    default: null,
  }
}, { timestamps: true });

FixtureSchema.plugin(mongoose_delete, { overrideMethods: true, deletedAt: true, deletedBy: true });

const Fixture = Mongoose.model('Fixture', FixtureSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const FixtureTC = composeWithMongoose.composeWithMongoose(Fixture, customizationOptions);

// add relations
FixtureTC.addRelation(
  'season', {
    resolver: () => SeasonTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.season,
    },
    projection: {
      season: 1
    }, // point fields in source object, which should be fetched from DB
  }
);
FixtureTC.addRelation(
  'homeTeam', {
    resolver: () => TeamTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.homeTeam,
    },
    projection: {
      homeTeam: 1
    }, // point fields in source object, which should be fetched from DB
  }
);
FixtureTC.addRelation(
  'awayTeam', {
    resolver: () => TeamTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.awayTeam,
    },
    projection: {
      awayTeam: 1
    }, // point fields in source object, which should be fetched from DB
  }
);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD FIXTURE OPERATIONS
const FixtureRootQuery = {
  fixtureById: FixtureTC.getResolver('findById'),
  fixtureByIds: FixtureTC.getResolver('findByIds'),
  fixtureOne: FixtureTC.getResolver('findOne'),
  fixtureMany: FixtureTC.getResolver('findMany'),
  fixtureCount: FixtureTC.getResolver('count'),
  fixtureConnection: FixtureTC.getResolver('connection'),
  fixturePagination: FixtureTC.getResolver('pagination'),
};

const FixtureRootMutation = {
  fixtureCreate: FixtureTC.getResolver('createOne'),
  fixtureUpdateById: FixtureTC.getResolver('updateById'),
  fixtureUpdateOne: FixtureTC.getResolver('updateOne'),
  fixtureUpdateMany: FixtureTC.getResolver('updateMany'),
  fixtureRemoveById: FixtureTC.getResolver('removeById'),
  fixtureRemoveOne: FixtureTC.getResolver('removeOne'),
  fixtureRemoveMany: FixtureTC.getResolver('removeMany'),
};

export {
  Fixture,
  FixtureTC,
  FixtureRootQuery,
  FixtureRootMutation
};
