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
const GroupSeasonSchema = new Mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  team: { type: Mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  season: { type: Mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
}, { timestamps: true });

GroupSeasonSchema.plugin(mongoose_delete, { overrideMethods: true, deletedAt: true, deletedBy: true });

const GroupSeason = Mongoose.model('GroupSeason', GroupSeasonSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const GroupSeasonTC = composeWithMongoose.composeWithMongoose(GroupSeason, customizationOptions);

// add relations
GroupSeasonTC.addRelation(
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
GroupSeasonTC.addRelation(
  'team', {
    resolver: () => TeamTC.getResolver('findById'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _id: (source) => source.team,
    },
    projection: {
      team: 1
    }, // point fields in source object, which should be fetched from DB
  }
);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD GROUPSEASON OPERATIONS
const GroupSeasonRootQuery = {
  groupSeasonById: GroupSeasonTC.getResolver('findById'),
  groupSeasonByIds: GroupSeasonTC.getResolver('findByIds'),
  groupSeasonOne: GroupSeasonTC.getResolver('findOne'),
  groupSeasonMany: GroupSeasonTC.getResolver('findMany'),
  groupSeasonCount: GroupSeasonTC.getResolver('count'),
  groupSeasonConnection: GroupSeasonTC.getResolver('connection'),
  groupSeasonPagination: GroupSeasonTC.getResolver('pagination'),
};

const GroupSeasonRootMutation = {
  groupSeasonCreate: GroupSeasonTC.getResolver('createOne'),
  groupSeasonUpdateById: GroupSeasonTC.getResolver('updateById'),
  groupSeasonUpdateOne: GroupSeasonTC.getResolver('updateOne'),
  groupSeasonUpdateMany: GroupSeasonTC.getResolver('updateMany'),
  groupSeasonRemoveById: GroupSeasonTC.getResolver('removeById'),
  groupSeasonRemoveOne: GroupSeasonTC.getResolver('removeOne'),
  groupSeasonRemoveMany: GroupSeasonTC.getResolver('removeMany'),
};

export {
  GroupSeason,
  GroupSeasonTC,
  GroupSeasonRootQuery,
  GroupSeasonRootMutation
};
