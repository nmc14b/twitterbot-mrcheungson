var Twit = require('twit');
var config = require('./config');
var Parser = require('rss-parser');
var T = new Twit(config);
var parser = new Parser();

let link = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC2exW2Rb0ekkyvzqSoyzUog'
var latestTime = '';
var latestPost = '';
var currentTime = '';

function tweetIt(message){
  var r = [];
  for (var i = 0; i < 6; i++) {
    r[i] =  Math.floor(Math.random() * 100);
  }

  var tweet = {
    // status: message + ' And now here are the lucky numbers for the post: ' + r1 + r2 + r3 + r4 + r5 + r6
  }
  console.log(message + ' And now here are the lucky numbers for the post: ' + r[0] + ', ' + r[1] + ', ' + r[2] + ', ' + r[3] + ', ' + r[4] + ', ' + r[5]);
  function tweeted(err, data, response) {
    if (err) {
      console.log("didnt work!");
    } else {
      console.log("it worked!");
    }
  }

  // T.post('statuses/update', tweet, tweeted);
  //console.log(message);
}

function pollAccount() {
  (async () => {

    let feed = await parser.parseURL(link);

    feed.items.forEach(item => {
      if (item.pubDate > latestTime) {
        latestTime = item.pubDate;
        latestPost = item.link;
      }
    });
    if (latestTime > currentTime) {
      currentTime = latestTime;
      tweetIt("MrCheungson has released a new video: " + latestPost);
    }
  })();
}
setInterval(pollAccount, 1000 * 10);
