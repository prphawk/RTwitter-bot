import Twit from 'twit'
import Params from '../params/index.js'
import { hasFilter , makeQuery } from '../helpers/index.js'
import Dotenv from 'dotenv'

Dotenv.config();

/* Configure the Twitter API */
export const Bot = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	//port: process.env.PORT || 3000,
	timeout_ms: 60 * 1000,
});

console.log('The bot is running on port ' + (process.env.PORT || 3000));

/**
 * @description Faz stream, filter e retweet dos tweets recentes de acordo com uma query simples dada em `track`.
 * Na stream em tempo-real não tem como fazer uma filtragem tão extensa como na search, em que temos vários tipos de strings que definem condicionais  
 */
export const RetweetStream = (props) => {
	const stream = Bot.stream('statuses/filter', {
		track: Params.PHRASES,
	});

	stream.on('tweet', (tweet) => {
		if(!tweet.retweeted_status) {
			if(hasFilter(tweet, props)) {
				console.log(`-- Bot has filtered: ${tweet.text} \n`)
			} else {
				/*
				Bot.post('statuses/retweet/:id', {
					id: tweet.id_str
				}, (error, response: Twit.Twitter.Status) => {
					if (error) {
						console.warn('-> Bot could not retweet: ' + error.message);
					} else {
						console.log(`==> Bot retweeted : ${response.text} \n`);
						console.log(response)
					}
				})
				*/
				console.log(`==> Bot WOULD retweet : ${tweet.text} \n`);
			}
		}
	})
} 

/**
 * @description Faz busca filtrada de acordo com uma query construída por props.
 */
export const GetTweets = (props) => {
	const q = makeQuery(props)
	console.log(`Searching results for queue: ${q}`)
	Bot.get('search/tweets', 
		{ 
			q, count: 100 
		}, 
		(error, data, response) => {
			if (error) {
				console.log('Bot could not retweet, : ' + error);
			} else {
				console.log(data.statuses)
				console.log(`\n search_metadata: ${data.search_metadata.count} ${'-'.repeat(20)}`)
				console.log(response)
			}
		})
}
