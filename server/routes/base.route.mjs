import Joi from 'joi';
import Boom from 'boom';
import * as Models from '../models';

export default [{
    method: "GET",
    path: "/api/v1/currentMatchDay",
    handler: async (request, h) => {
      try {
        var poolsMatchday = [];
        const pools = await Models.Pool.find({ players: request.auth.credentials._id, status: { $ne: 'FINNISHED' } }).populate('season');
        for (const pool of pools) {
          const fixtures = await Models.Fixture.find({ matchDay: pool.season.currentMatchDay, season: pool.season._id })
            .populate('homeTeam')
            .populate('awayTeam');
            poolsMatchday.push(Object.assign(pool.toJSON(), { fixtures: fixtures.map(function (f) { return f.toJSON() }) }))
        }
        return h.response(poolsMatchday);
      } catch (err) {
        throw Boom.badRequest(err);
      }
    },
    options: {
      auth: 'default'
    }

  },
  // {
  //   method: "POST",
  //   path: "/football-data.events",
  //   handler: async (request, h) => {
  //     try {
  //       var poolsMatchday = [];
  //       const pools = await Models.Pool.find({ players: request.auth.credentials._id, status: { $ne: 'FINNISHED' } }).populate('season');
  //       for (const pool of pools) {
  //         const fixtures = await Models.Fixture.find({ matchDay: pool.season.currentMatchDay, season: pool.season._id })
  //           .populate('homeTeam')
  //           .populate('awayTeam');
  //           poolsMatchday.push(Object.assign(pool.toJSON(), { fixtures: fixtures.map(function (f) { return f.toJSON() }) }))
  //       }
  //       return h.response(poolsMatchday);
  //     } catch (err) {
  //       throw Boom.badRequest(err);
  //     }
  //   },
  //   options: {
  //     auth: 'default'
  //   }

  // },
  {
    method: '*',
    path: '/{p*}',
    handler: async (request, h) => {
      return Boom.notFound();
    },
    options: {
      auth: false,
      validate: {
        options: {
          abortEarly: false,
          allowUnknown: true
        }
      }
    }
  }
]
