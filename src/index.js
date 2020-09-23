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
		filterUserIds: true,
		filterReplies: true,
		filterQuoteRetweets: true,
	})

	//TwitterBot.GetTweets()
}

BotInit();

