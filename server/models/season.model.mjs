import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import mongoose_delete from 'mongoose-delete';
import {
  LeagueTC,
} from './';

const customizationOptions = {
  fields: {
    remove: ['updatedAt', 'createdAt', 'deleted', 'deletedAt', 'deletedBy'],
  },
};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const SeasonSchema = new Mongoose.Schema({
  label: {
    type: String,
    required: true 
  },
  year: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'IN_PROGRESS', 'FINISHED'],
    required: true,
    default: 'SCHEDULED'
  },
  apiRef: {
    type: Number,
    index: true,
    unique: true,
    required: true
  },
  currentMatchDay: {
    type: Number,
    required: true,
    default: 1
  },
  groups: [{
    label: {
      type: String,
      required: true
    },
    teams: [{
      team: { type: Mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
      rank: {
        type: Number,
        default: 0
      },
      points: {
        type: Number,
        default: 0
      },
      goals: {
        type: Number,
        default: 0
      },
      goalsAgainst: {
        type: Number,
        default: 0
      },
      playedGames: {
        type: Number,
        default: 0
      }
    }]
  }], 
  league: { type: Mongoose.Schema.Types.ObjectId, ref: 'League', required: true },
}, { timestamps: true });

SeasonSchema.plugin(mongoose_delete, { overrideMethods: true, deletedAt: true, deletedBy: true });

const Season = Mongoose.model('Season', SeasonSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const SeasonTC = composeWithMongoose.composeWithMongoose(Season, customizationOptions);

// add relations
SeasonTC.addRelation(
  'league', {
    resolver: () => LeagueTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.league,
    },
    projection: {
      league: 1
    }, // point fields in source object, which should be fetched from DB
  }
);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD SEASON OPERATIONS
const SeasonRootQuery = {
  seasonById: SeasonTC.getResolver('findById'),
  seasonByIds: SeasonTC.getResolver('findByIds'),
  seasonOne: SeasonTC.getResolver('findOne'),
  seasonMany: SeasonTC.getResolver('findMany'),
  seasonCount: SeasonTC.getResolver('count'),
  seasonConnection: SeasonTC.getResolver('connection'),
  seasonPagination: SeasonTC.getResolver('pagination'),
};

const SeasonRootMutation = {
  seasonCreate: SeasonTC.getResolver('createOne'),
  seasonUpdateById: SeasonTC.getResolver('updateById'),
  seasonUpdateOne: SeasonTC.getResolver('updateOne'),
  seasonUpdateMany: SeasonTC.getResolver('updateMany'),
  seasonRemoveById: SeasonTC.getResolver('removeById'),
  seasonRemoveOne: SeasonTC.getResolver('removeOne'),
  seasonRemoveMany: SeasonTC.getResolver('removeMany'),
};

export {
  Season,
  SeasonTC,
  SeasonRootQuery,
  SeasonRootMutation
};
