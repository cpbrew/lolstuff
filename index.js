'use strict';

let lol = require('lol-js'),
    config = require('config'),
    ect = require('ect'),
    path = require('path'),
    url = require('url'),
    app = require('express')();

let renderer = ect({ watch: true,
                      root: path.join(__dirname, 'views'),
                      ext: '.ect'});
app.engine('ect', renderer.render);
app.set('view engine', 'ect');

const SUMMONER_NAME = config.get('summonerName');
let client = lol.client({
  apiKey: config.get('apiKey'),
  defaultRegion: 'na',
  cache: null
});

// client.getSummonersByNameAsync([SUMMONER_NAME])
  // .then((data) => {
    // let summoner = data[SUMMONER_NAME];
    // if (!summoner) {
      // console.log('FECK!');
      // console.log(new Error ('Summoner ' + SUMMONER_NAME + ' not found!'));
      // exit(1);
    // }

    // console.log('Summoner name: ' + summoner.name);
    // console.log('Summoner id: ' + summoner.id);
  // })
  // .catch((err) => {
    // console.log('FECK!');
    // console.log(new Error ('Error getting summoner by name: ' + err));
    // exit(1);
  // });

// client.destroy();

app.get('/', (req, res) => {
  let name = SUMMONER_NAME,
      query = url.parse(req.url, true).query,
      params = {
        title: 'My awesome app!',
        summonerName: 'Error!',
        summonerId: 'Error!'
      };
  if (query.summonerName) name = query.summonerName;
  
  client.getSummonersByNameAsync([name])
    .then((data) => {
      let summoner = data[name];
      if (summoner) {
        params.summonerName = summoner.name;
        params.summonerId = summoner.id;
      }
    });
    
    res.render('main', {
      title: 'Blah',
      summonerName: 'Foo',
      summonerId: 'Bar'
    });
});

let server = app.listen(8080, () => {
  console.log('Listening on port %s!', server.address().port);
});
