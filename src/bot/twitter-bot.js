import Twit from 'twit'
import Params from '../params/index.js'
import { isFilterBlocked , makeQuery } from '../helpers/index.js'
import Dotenv from 'dotenv'

Dotenv.config();

/* Configure the Twitter API */
export const Bot = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	port: process.env.PORT || 3000,
	timeout_ms: 60 * 1000,
});

console.log('Running on port ' + (process.env.PORT || 3000));

/**
 * @description Faz stream, filter e retweet dos tweets recentes de acordo com uma query simples dada em `track`.
 * Na stream em tempo-real não tem como fazer uma filtragem tão extensa como na search, em que temos vários tipos de strings que definem condicionais  
 */
export const RetweetStream = (props) => {
	const stream = Bot.stream('statuses/filter', { track: Params.PHRASES })

	stream.on('tweet', (tweet) => {
		if(!tweet.retweeted_status) {
			if(isFilterBlocked(tweet, props)) {
				console.log(`-> Bot has filtered: ${tweet.text}`)
			} else {
				Bot.post('statuses/retweet/:id', {
					id: tweet.id_str
				}, (error, response) => console.log(error ? 
						(`-> Bot could not retweet: ${error.message}`) 
						: (`=> Bot retweeted: ${response.text}`))
				)
			}
		}
	})
}
