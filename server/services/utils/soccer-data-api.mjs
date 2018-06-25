import * as Models from '../../models';
import rp from 'request-promise-native';

const SoccerDataApi = {

  updatesSeasonsDatas: async (league) => {
    try {
      var seasons = await Models.Season.find({league: league._id, status: { $ne: 'FINISHED'}});
      for (let season of seasons) {
        // fetch datas from api
        const options = {
          uri: 'http://api.football-data.org/v1/competitions/' + season.apiRef,
          headers: {
            'X-Auth-Token': 'd281411380224a898ef0d8e7ec8a40ef'
          },
          json: true // Automatically parses the JSON string in the response
        };
        const seasonDatas = await rp(options);        
        if(league.haveGroup) {
          await SoccerDataApi.getGroupsDatas(season);
        }
        await Models.Season.update({ _id: season._id }, { $set: {
          year: seasonDatas.year,
          label: seasonDatas.caption,
          currentMatchDay: seasonDatas.currentMatchday
        }});
        return SoccerDataApi.updatesSeasonFixturesDatas(season);
      }
    } catch (err) {
      console.log(err)
      return err;
    }
  },

  updatesSeasonFixturesDatas: async (season) => {
    try {
      // fetch datas from api
      const options = {
        uri: 'http://api.football-data.org/v1/competitions/' + season.apiRef + '/fixtures',
        headers: {
          'X-Auth-Token': 'd281411380224a898ef0d8e7ec8a40ef'
        },
        json: true // Automatically parses the JSON string in the response
      };
      const seasonFixturesDatas = await rp(options);
      for (let fixtureDatas of seasonFixturesDatas.fixtures) {
        const apiRef = /[^/]*$/.exec(fixtureDatas._links.self.href)[0];
        const homeTeam = await SoccerDataApi.getTeamDatas(/[^/]*$/.exec(fixtureDatas._links.homeTeam.href)[0]);
        const awayTeam = await SoccerDataApi.getTeamDatas(/[^/]*$/.exec(fixtureDatas._links.awayTeam.href)[0]);
        var localData = await Models.Fixture.findOne({ apiRef: apiRef });
        if (!localData) {
          localData = Models.Fixture({
            date: fixtureDatas.date,
            status: fixtureDatas.status,
            matchDay: fixtureDatas.matchday,
            season: season._id,
            homeTeam: homeTeam._id,
            awayTeam: awayTeam._id,
            result: {
              goalsHomeTeam: fixtureDatas.result.goalsHomeTeam,
              goalsAwayTeam: fixtureDatas.result.goalsAwayTeam,
            },
            apiRef: apiRef
          })
        }
        else {
          localData.set({
            date: fixtureDatas.date,
            status: fixtureDatas.status,
            matchDay: fixtureDatas.matchday,
            season: season._id,
            homeTeam: homeTeam._id,
            awayTeam: awayTeam._id,
            result: {
              goalsHomeTeam: fixtureDatas.result.goalsHomeTeam,
              goalsAwayTeam: fixtureDatas.result.goalsAwayTeam,
            },
            apiRef: apiRef
          });
        }
        localData = await localData.save();
      };
      return;
    } catch (err) {
      console.log(err)
      return err;
    }
  },

  getTeamDatas: async (teamId) => {
    try {
      var localData = await Models.Team.findOne({ apiRef: teamId });
      if (!localData) {
        var teamDatas = {
          name: 'To Be Determined',
          code: 'TBD',
          crestUrl: null,
        }
        if(teamId != 757) {
          const options = {
            uri: 'http://api.football-data.org/v1/teams/' + teamId,
            headers: {
              'X-Auth-Token': 'd281411380224a898ef0d8e7ec8a40ef'
            },
            json: true // Automatically parses the JSON string in the response
          };
          teamDatas = await rp(options);
        }

        localData = Models.Team({
          label: teamDatas.name,
          code: teamDatas.code,
          apiRef: teamId,
          logo: teamDatas.crestUrl,
        });
        localData = await localData.save();
      }
      return localData;
    } catch (err) {
      console.log(err)
      return err;
    }
  },

  getGroupsDatas: async (season) => {
    try {
      const options = {
        uri: 'http://api.football-data.org/v1/competitions/' + season.apiRef + '/leagueTable',
        headers: {
          'X-Auth-Token': 'd281411380224a898ef0d8e7ec8a40ef'
        },
        json: true // Automatically parses the JSON string in the response
      };
      const leagueTable = await rp(options);
      var localGroups = [];
      for (const key in leagueTable.standings) {
        var group = {};
        if (leagueTable.standings.hasOwnProperty(key)) {
          const groupsAPI = leagueTable.standings[key];
          group.label = key;
          group.teams = [];
          for (const groupAPI of groupsAPI) {
            const team = await SoccerDataApi.getTeamDatas(groupAPI.teamId);
            let teamGroup = {
              team: team._id,
              rank: groupAPI.rank,
              points: groupAPI.points,
              goals: groupAPI.goals,
              goalsAgainst: groupAPI.goalsAgainst,
              playedGames: groupAPI.playedGames
            };
            if (season.currentMatchDay < leagueTable.matchday && season.groups.findIndex(item => item.label === key) != -1) {
              const groupTeamIndex = season.groups.findIndex(item => item.label === key);
              teamGroup.previousRank = await SoccerDataApi.findPreviousTeamRank(season.groups[groupTeamIndex]["teams"], team._id);
            }
            group.teams.push(teamGroup);
          }
        }
        localGroups.push(group);
      }
      season.groups = localGroups;
      return await season.save();
    } catch (err) {
      return err;
    }
  },

  findPreviousTeamRank: async (teams, teamId) => {
    if (teams.findIndex(item => item.team+'' == teamId+'') > -1) { // +'' bugFix because without it the equality is never true even if it is.
      return teams[teams.findIndex(item =>  item.team+'' == teamId+'')]['rank'];
    }
    else {
      return null;
    }
  }

};

export {
  SoccerDataApi
};
