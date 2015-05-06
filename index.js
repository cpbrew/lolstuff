'use strict';

let leagueapi = require('leagueapi'),
    config = require('config'),
    ect = require('ect'),
    path = require('path'),
    url = require('url'),
    app = require('express')();

let ectRenderer = ect({ watch: true,
                        root: path.join(__dirname, 'views'),
                        ext: '.ect'});
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

const SUMMONER_NAME = config.get('summonerName');
leagueapi.init(config.get('apiKey'));

app.get('/', (req, res) => {
  let query = url.parse(req.url, true).query,
      params = {};
  if (query.summonerName) {
    let name = query.summonerName.toLowerCase().replace(/\s/g, '');

    leagueapi.Summoner.getByName(name)
      .then((data) => {
        let summoner = data[name];
        if (summoner) {
          params.title = summoner.name;
          params.summonerName = summoner.name;
          params.summonerId = summoner.id;
        } else {
          console.log('Returned data does not include info for %s', name);
          console.log(data);
        }

        res.render('main', params);
      })
      .catch((err) => {
        console.log('getSummonersByNameAsync failed');
        console.log(err);
        res.send(err);
      });
  } else {
    res.render('main');
  }

});

let server = app.listen(8080, () => {
  let address = server.address().address;
  let port = server.address().port;
  console.log('Listening at http://%s:%s', address, port);
});
