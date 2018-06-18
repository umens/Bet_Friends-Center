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
const PoolSchema = new Mongoose.Schema({
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
    enum: ['SCHEDULED', 'IN_PROGRESS', 'FINISHED'],
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

PoolSchema.plugin(mongoose_delete, {
  overrideMethods: true,
  deletedAt: true,
  deletedBy: true
});

const Pool = Mongoose.model('Pool', PoolSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const PoolTC = composeWithMongoose.composeWithMongoose(Pool, customizationOptions);

// add relations
PoolTC.addRelation(
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
PoolTC.addRelation(
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

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD POOL OPERATIONS
const PoolRootQuery = {
  poolById: PoolTC.getResolver('findById'),
  poolByIds: PoolTC.getResolver('findByIds'),
  poolOne: PoolTC.getResolver('findOne'),
  poolMany: PoolTC.getResolver('findMany'),
  poolCount: PoolTC.getResolver('count'),
  poolConnection: PoolTC.getResolver('connection'),
  poolPagination: PoolTC.getResolver('pagination'),
};

const PoolRootMutation = {
  poolCreate: PoolTC.getResolver('createOne'),
  poolUpdateById: PoolTC.getResolver('updateById'),
  poolUpdateOne: PoolTC.getResolver('updateOne'),
  poolUpdateMany: PoolTC.getResolver('updateMany'),
  poolRemoveById: PoolTC.getResolver('removeById'),
  poolRemoveOne: PoolTC.getResolver('removeOne'),
  poolRemoveMany: PoolTC.getResolver('removeMany'),
};

export {
  Pool,
  PoolTC,
  PoolRootQuery,
  PoolRootMutation
};
