import { RetweetStream } from './twitter-bot.ts'

// Initiate Bot
function BotInit() {


	RetweetStream({
		filterStrings: true,
	})
	//TwitterBot.GetTweets()
}

BotInit();

export default {
	BotInit,
};
