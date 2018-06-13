import { UserRootQuery, UserRootMutation } from './user.model';
import { BetRootQuery, BetRootMutation } from './bet.model';
import { CompetitionRootQuery, CompetitionRootMutation } from './competition.model';
import { FixtureRootQuery, FixtureRootMutation } from './fixture.model';
import { GroupSeasonRootQuery, GroupSeasonRootMutation } from './groupSeason.model';
import { LeagueRootQuery, LeagueRootMutation } from './league.model';
import { SeasonRootQuery, SeasonRootMutation } from './season.model';
import { TeamRootQuery, TeamRootMutation } from './team.model';
import schemaComposer from 'graphql-compose';

const rootQuery = {};
const rootMutation = {};

// User methods
Object.assign(rootQuery, UserRootQuery);
Object.assign(rootMutation, UserRootMutation);

// Bet methods
Object.assign(rootQuery, BetRootQuery);
Object.assign(rootMutation, BetRootMutation);

// Competition methods
Object.assign(rootQuery, CompetitionRootQuery);
Object.assign(rootMutation, CompetitionRootMutation);

// Fixture methods
Object.assign(rootQuery, FixtureRootQuery);
Object.assign(rootMutation, FixtureRootMutation);

// GroupSeason methods
Object.assign(rootQuery, GroupSeasonRootQuery);
Object.assign(rootMutation, GroupSeasonRootMutation);

// League methods
Object.assign(rootQuery, LeagueRootQuery);
Object.assign(rootMutation, LeagueRootMutation);

// Season methods
Object.assign(rootQuery, SeasonRootQuery);
Object.assign(rootMutation, SeasonRootMutation);

// Team methods
Object.assign(rootQuery, TeamRootQuery);
Object.assign(rootMutation, TeamRootMutation);

schemaComposer.schemaComposer.rootQuery().addFields(rootQuery);
schemaComposer.schemaComposer.rootMutation().addFields(rootMutation);

const graphqlSchema = schemaComposer.schemaComposer.buildSchema();
export { graphqlSchema };
