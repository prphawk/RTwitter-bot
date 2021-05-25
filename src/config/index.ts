import Twit from 'twit'
import Dotenv from 'dotenv'

Dotenv.config()

/* Configure the Twitter API */
const Bot = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

export const Params = {
	PHRASES__MISS: process.env.PHRASES__MISS.split(", "),
	PHRASES__ART: process.env.PHRASES__ART.split(", "),
	DONT_RT_FROM: process.env.DONT_RT_FROM.split(", "),
	FILTERS: process.env.FILTERS.split(", "),
} 

export default Bot

