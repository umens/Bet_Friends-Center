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
const LeagueSchema = new Mongoose.Schema({
  label: {
    type: String,
    required: true 
  },
  seasons: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Season' }]
}, { timestamps: true });

LeagueSchema.plugin(mongoose_delete, { overrideMethods: true, deletedAt: true, deletedBy: true });

// LeagueSchema.virtual('fullname').get(function () {
//   return this.firstname + ' ' + this.lastname;
// });

const League = Mongoose.model('League', LeagueSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const LeagueTC = composeWithMongoose.composeWithMongoose(League, customizationOptions);

// add relations
LeagueTC.addRelation(
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

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD LEAGUE OPERATIONS
const LeagueRootQuery = {
  leagueById: LeagueTC.getResolver('findById'),
  leagueByIds: LeagueTC.getResolver('findByIds'),
  leagueOne: LeagueTC.getResolver('findOne'),
  leagueMany: LeagueTC.getResolver('findMany'),
  leagueCount: LeagueTC.getResolver('count'),
  leagueConnection: LeagueTC.getResolver('connection'),
  leaguePagination: LeagueTC.getResolver('pagination'),
};

const LeagueRootMutation = {
  leagueCreate: LeagueTC.getResolver('createOne'),
  leagueUpdateById: LeagueTC.getResolver('updateById'),
  leagueUpdateOne: LeagueTC.getResolver('updateOne'),
  leagueUpdateMany: LeagueTC.getResolver('updateMany'),
  leagueRemoveById: LeagueTC.getResolver('removeById'),
  leagueRemoveOne: LeagueTC.getResolver('removeOne'),
  leagueRemoveMany: LeagueTC.getResolver('removeMany'),
};

export {
  League,
  LeagueTC,
  LeagueRootQuery,
  LeagueRootMutation
};
