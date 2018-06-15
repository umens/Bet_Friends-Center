import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import mongoose_delete from 'mongoose-delete';
import {
  UserTC
} from './';

const customizationOptions = {
  fields: {
    remove: ['updatedAt', 'createdAt', 'deleted', 'deletedAt', 'deletedBy', 'password'],
  },
};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const CompetitionSchema = new Mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'IN_PROGRESS', 'FINNISHED'],
    required: true,
    default: 'SCHEDULED'
  },
  commissioner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  season: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Season',
    required: true
  },
  settings: {
    beforeBeginning: {
      type: Boolean,
      default: false
    },
    bestBetEnable: {
      type: Boolean,
      default: false
    },
    victoryPoint: {
      type: Number,
      default: 1
    },
    correctScore: {
      type: Number,
      default: 2
    },
    bestBet: {
      type: Number,
      default: 3
    },
    errorPoint: {
      type: Number,
      default: 0
    }
  },
}, {
  timestamps: true
});

CompetitionSchema.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true
});

const Competition = Mongoose.model('Competition', CompetitionSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const CompetitionTC = composeWithMongoose.composeWithMongoose(Competition, customizationOptions);

// add relations
CompetitionTC.addRelation(
  'commissioner', {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.commissioner,
    },
    projection: {
      commissioner: 1
    }, // point fields in source object, which should be fetched from DB
  }
);
CompetitionTC.addRelation(
  'players', {
    resolver: () => UserTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.players,
    },
    projection: {
      players: 1
    }, // point fields in source object, which should be fetched from DB
  }
);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD COMPETITION OPERATIONS
const CompetitionRootQuery = {
  competitionById: CompetitionTC.getResolver('findById'),
  competitionByIds: CompetitionTC.getResolver('findByIds'),
  competitionOne: CompetitionTC.getResolver('findOne'),
  competitionMany: CompetitionTC.getResolver('findMany'),
  competitionCount: CompetitionTC.getResolver('count'),
  competitionConnection: CompetitionTC.getResolver('connection'),
  competitionPagination: CompetitionTC.getResolver('pagination'),
};

const CompetitionRootMutation = {
  competitionCreate: CompetitionTC.getResolver('createOne'),
  competitionUpdateById: CompetitionTC.getResolver('updateById'),
  competitionUpdateOne: CompetitionTC.getResolver('updateOne'),
  competitionUpdateMany: CompetitionTC.getResolver('updateMany'),
  competitionRemoveById: CompetitionTC.getResolver('removeById'),
  competitionRemoveOne: CompetitionTC.getResolver('removeOne'),
  competitionRemoveMany: CompetitionTC.getResolver('removeMany'),
};

export {
  Competition,
  CompetitionTC,
  CompetitionRootQuery,
  CompetitionRootMutation
};
