const Twit = require('twit');

import Constants from './constants/index'
import TweetFilterProps from './helpers/props'
import { containFilter , makeQuery } from './helpers/index'

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

console.log('The bot is running...');

/**
 * @description Faz stream, filter e retweet dos tweets recentes de acordo com uma query simples dada em (property) track.
 * Na stream em tempo-real não tem como fazer uma filtragem tão extensa como na search, em que temos vários tipos de strings que definem condicionais  
 */
const RetweetStream = (props: TweetFilterProps) => {
	const stream = Bot.stream('statuses/filter', {
		track: Constants.SEARCH_PHRASES,
	});

	stream.on('tweet', tweet => {
		if(!tweet.retweeted_status) {
			if(containFilter(tweet, props)) {
				console.warn('-> Bot has filtered:' + tweet.expanded_url + tweet.text)
			} else {
				Bot.post('statuses/retweet/:id', {
					id: tweet.id_str
				}, (error, response) => {
					if (error) {
						console.log('-> Bot could not retweet, : ' + error);
					} else {
						console.log('==> Bot retweeted : ' + response.text);
					}
				})
			}
		}
	})
} 

/**
 * @description Faz busca filtrada de acordo com uma query construída por props.
 */
const GetTweets = (props: TweetFilterProps) => {
	const q = makeQuery(props)
	Bot.get('search/tweets', 
		{ q, count: 100 }, 
		function(error, data, response) {
			if (error) {
				console.log('Bot could not retweet, : ' + error);
			} else {
				console.log(`Searching results for queue: ${q}`)
				console.log(data.statuses)
				console.log(`\n search_metadata: ${data.search_metadata.count} ${'-'.repeat(20)}`)
				console.log(response)
			}
		})
}

// Exports
module.exports = {
    Bot,
    RetweetStream,
		GetTweets,
}