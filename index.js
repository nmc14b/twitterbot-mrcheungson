var Twit = require('twit');
var config = require('./config');
var Parser = require('rss-parser');
var T = new Twit(config);
var parser = new Parser();

let link = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC2exW2Rb0ekkyvzqSoyzUog'
var latestTime = '';
var latestPost = '';
var currentTime = '';

function tweetIt(youtuber, video){

  // added a lucky numbers generator for fun but also to test
  // if the loop would try to post the same video twice. 
  var r = [];
  var luckyNumbers = '';
  for (var i = 0; i < 6; i++) {
    r[i] =  Math.floor(Math.random() * 100);
    luckyNumbers += r[i]
    if (i != 5) {
      luckyNumbers += ', ';
    }
  }

  var tweet = {
    status: youtuber + " has released a new video: " + video + " And now here are the lucky numbers for the post: " + luckyNumbers + "."
  }
  // console.log(youtuber + 'has released a video: ' + video + ' And now here are the lucky numbers for the post: ' luckyNumbers + '.');
  function tweeted(err, data, response) {
    if (err) {
      console.log("didnt work!");
    } else {
      console.log("it worked!");
    }
  }

  T.post('statuses/update', tweet, tweeted);
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
      tweetIt(item.title, latestPost);
    }
  })();
}
setInterval(pollAccount, 1000 * 10);
