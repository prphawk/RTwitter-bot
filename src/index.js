import { RetweetStream } from './bot/twitter-bot.js'

/*export default interface TweetFilterProps {
	filterStrings?: boolean,
	filterSensitiveContent?: boolean,
	filterReplies?: boolean,
	filterQuoteRetweets?: boolean,
	filterNonMedia?: boolean,
	filterMinFaves?: number,
	filterUserIds?: boolean,
} */

// Initiate Bot
export default function BotInit() {

	RetweetStream({
		filterUserIds, 
		filterReplies,
		filterQuoteRetweets,
	})

	//TwitterBot.GetTweets()
}

BotInit();

