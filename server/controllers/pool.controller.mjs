import * as Models from '../models';
import Boom from 'boom';

export default {

    create: async (request, h) => {
        try {
            const pool = await new Models.Pool(request.payload).save();
            return h.response({
                'success': 'pool_created',
                'pool': pool
            }).code(201);
        } catch (err) {
            throw Boom.badRequest(err);
        }
    },
    remove: async (request, h) => {
        try {
            await Models.Pool.findOneAndRemove({
                _id: request.params.id
            }).exec();
            return {
                'success': 'user_delete'
            };
        } catch (e) {
            return Boom.badData(err);
        }
    },
    find: async (request, h) => {
        try {
            // const query = await Models.Pool.find({
            //     _id: request.params.id
            // }).populate('season').exec();
            const pool = await Models.Pool.findOne({ players: request.auth.credentials._id, _id: request.params.id }).populate('season');
            const fixtures = await Models.Fixture.find({ matchDay: pool.season.currentMatchDay, season: pool.season._id })
                .populate('homeTeam')
                .populate('awayTeam');
            return Object.assign(pool.toJSON(), { fixtures: fixtures.map(function (f) { return f.toJSON() }) });
        } catch (e) {
            return Boom.badData(err);
        }
    },
    update: async (request, h) => {
        try {
            const result = await Models.Pool.findOneAndUpdate({
                _id: request.params.id
            }, request.payload, {
                new: true
            }).exec();
            return result;
        } catch (e) {
            return Boom.badRequest(err);
        }
    }
}