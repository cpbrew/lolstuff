'use strict';

let lol = require('lol-js');
let config = require('config');

const SUMMONER_NAME = 'brewminator';
let client = lol.client({
  apiKey: config.get('apiKey'),
  defaultRegion: 'na',
  cache: null
});

client.getSummonersByNameAsync([SUMMONER_NAME])
  .then((data) => {
    let summoner = data[SUMMONER_NAME];
    if (!summoner) {
      console.log('FECK!');
      console.log(new Error ('Summoner ' + SUMMONER_NAME + ' not found!'));
      exit(1);
    }

    console.log('Summoner name: ' + summoner.name);
    console.log('Summoner id: ' + summoner.id);
  })
  .catch((err) => {
    console.log('FECK!');
    console.log(new Error ('Error getting summoner by name: ' + err));
    exit(1);
  });

client.destroy();