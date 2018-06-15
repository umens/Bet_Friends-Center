import Joi from 'joi';
import Boom from 'boom';
import * as Models from '../models';

export default [{
    method: "GET",
    path: "/api/v1/currentMatchDay",
    handler: async (request, h) => {
      try {
        var competitionsMatchday = [];
        const competitions = await Models.Competition.find({ players: request.auth.credentials._id }).populate('season');
        for (const competition of competitions) {
          const fixtures = await Models.Fixture.find({ matchDay: competition.season.currentMatchDay, season: competition.season._id })
            .populate('homeTeam')
            .populate('awayTeam');
          competitionsMatchday.push(Object.assign(competition.toJSON(), { fixtures: fixtures.map(function (f) { return f.toJSON() }) }))
        }
        return h.response(competitionsMatchday);
      } catch (err) {
        throw Boom.badRequest(err);
      }
    },
    options: {
      auth: 'default'
    }

  },
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
