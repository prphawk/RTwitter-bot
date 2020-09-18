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

const TWITTER_SEARCH_PHRASES = ['#DragonAge'];
const TWITTER_SEARCH_FILTERS = ['#DragonAgeCosplay']
const TWITTER_MIN_FAVES = 200


console.log('The bot is running...');

/*T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
}) */

interface TweetFilterProps {
	filterStrings?: boolean,
	filterSensitiveContent?: boolean,
	filterReplies?: boolean,
	filterQuoteRetweets?: boolean,
	filterNonMedia?: boolean,
	minFaves?: number,
	
}

/* BotRetweet() : To retweet recent tweets with our query */
const RetweetStream = (props: TweetFilterProps) => {
	const stream = Bot.stream('statuses/filter', {
		track: TWITTER_SEARCH_PHRASES,
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

const containFilter = (tweet, props: TweetFilterProps): boolean => {

	const filteredString = (): boolean => {
		if(props.filterStrings) {
			return TWITTER_SEARCH_FILTERS
			.some(filter => tweet.text.toLowerCase()
				.replace(/[^a-z]+/g, ' ').includes(filter))
		} return false
	}

	const filteredReply = (): boolean => {
		if(props.filterReplies || props.filterQuoteRetweets) {
			return tweet.in_reply_to_status_id_str || tweet.is_quote_status ? true : false
		}
	}

	const filterSensitiveContent = (): boolean => {
		return tweet.possibly_sensitive
	}

	const filterNonMedia = (): boolean => {
		return tweet.entities.media.length === 0
	}

	return filteredString()
	|| filteredReply() 
	|| filterSensitiveContent() 
	|| filterNonMedia()
}


const GetTweets = (props: TweetFilterProps) => {
	const q = makeQuery(props)
	Bot.get('search/tweets', 
		{ 
			q, count: 100 
		}, 
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

const makeQuery = (props:TweetFilterProps) => {

	let strings = TWITTER_SEARCH_PHRASES

	if(props.filterStrings) {
		strings.concat(TWITTER_SEARCH_FILTERS.map(filter => '-' + filter))
	}

	let response = strings.join(' ')

	if(props.filterNonMedia) {
		response += ' filter:images'
	}
	if(props.filterQuoteRetweets) {
		response += ' -filter:retweets'
	}
	if(props.filterReplies) {
		response += ' -filter:replies'
	}

	return response
}

// Exports
module.exports = {
    Bot,
    RetweetStream,
		GetTweets,
}