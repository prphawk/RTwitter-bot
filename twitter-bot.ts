const Twit = require('twit');

require('dotenv').config();

/* Configure the Twitter API */
const Bot = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	port: process.env.PORT || 3000,
	timeout_ms: 60 * 1000,
});

const TWITTER_SEARCH_PHRASES = ['#DragonAge #Art'];
const TWITTER_SEARCH_FILTERS = ['#dragonagecosplay', 'cosplay', 'sketch', 'wip', 'working', 'progress', 'nsfw']
const TWITTER_MIN_FAVES = 200

console.log('The bot is running...');

/*T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
}) */

/* BotRetweet() : To retweet recent tweets with our query */
function BotRetweet() {
	const stream = Bot.stream('statuses/filter', {
		track: TWITTER_SEARCH_PHRASES,
	});

	stream.on('tweet', tweet: Twitter.Status => {
		if(!isReply(tweet) && tweet.entities.media) {
			if(!tweet.possibly_sensitive) {
				if(filteredTweet(tweet)) {
					console.log('\n BOT HAS FILTERED:' + tweet.text + tweet.expanded_url)
				} else console.warn('Bot retweeted : ' + tweet.text);

			} 
			/*
			Bot.post('statuses/retweet/:id', {
				id: tweet.id_str
			}, (error, response) => {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				} else {
					console.log('Bot retweeted : ' + response.text);
				}
			});
			 */
		} 
	});
};

function filteredTweet(tweet) {
	return TWITTER_SEARCH_FILTERS
	.some(filter => 
		tweet.text.toLowerCase()
		.replace(/[^a-z]+/g, ' ')
		.includes(filter))
}

function isReply(tweet) {
	return tweet.retweeted_status 
	|| tweet.in_reply_to_status_id_str
	|| tweet.is_quote_status ? true : false
}

function hasMinFaves(tweet) {
	return tweet.favorite_count >= TWITTER_MIN_FAVES ? true : false
}

function BotGetTweets() {
	Bot.get('search/tweets', 
		{ 
			q: `#DragonAge -#dragonagecosplay -cosplay -cosplaying -sketch -wip -working -progress -nsfw min_faves:${TWITTER_MIN_FAVES} filter:images until:2017-01-01`, 
			count: 1000 
		}, 
		function(error, data, response) {
			if (error) {
				console.log('Bot could not retweet, : ' + error);
			} else {
				console.log(data.statuses)
				console.log(`\n search_metadata: ${data.search_metadata.count} --------------------------------------------------------------------------------`)
			}
		})
}

// Exports
module.exports = {
    Bot,
    BotRetweet,
		isReply,
		BotGetTweets,
}