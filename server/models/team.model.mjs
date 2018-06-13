import Mongoose from 'mongoose';
import composeWithMongoose from 'graphql-compose-mongoose';
import mongoose_delete from 'mongoose-delete';
import {
  SeasonTC
} from './';

const customizationOptions = {
  fields: {
    remove: ['updatedAt', 'createdAt', 'deleted', 'deletedAt', 'deletedBy'],
  },
};

// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const TeamSchema = new Mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  code: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  logo: String,
  seasons: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Season', required: true }],
}, { timestamps: true });

TeamSchema.plugin(mongoose_delete, { overrideMethods: true, deletedAt: true, deletedBy: true });

const Team = Mongoose.model('Team', TeamSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const TeamTC = composeWithMongoose.composeWithMongoose(Team, customizationOptions);

// add relations
TeamTC.addRelation(
  'seasons', {
    resolver: () => SeasonTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.seasons,
    },
    projection: {
      seasons: 1
    }, // point fields in source object, which should be fetched from DB
  }
);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD TEAM OPERATIONS
const TeamRootQuery = {
  teamById: TeamTC.getResolver('findById'),
  teamByIds: TeamTC.getResolver('findByIds'),
  teamOne: TeamTC.getResolver('findOne'),
  teamMany: TeamTC.getResolver('findMany'),
  teamCount: TeamTC.getResolver('count'),
  teamConnection: TeamTC.getResolver('connection'),
  teamPagination: TeamTC.getResolver('pagination'),
};

const TeamRootMutation = {
  teamCreate: TeamTC.getResolver('createOne'),
  teamUpdateById: TeamTC.getResolver('updateById'),
  teamUpdateOne: TeamTC.getResolver('updateOne'),
  teamUpdateMany: TeamTC.getResolver('updateMany'),
  teamRemoveById: TeamTC.getResolver('removeById'),
  teamRemoveOne: TeamTC.getResolver('removeOne'),
  teamRemoveMany: TeamTC.getResolver('removeMany'),
};

export {
  Team,
  TeamTC,
  TeamRootQuery,
  TeamRootMutation
};
