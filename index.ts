const TwitterBot = require('./twitter-bot.ts');

// Initiate Bot
function BotInit() {
	TwitterBot.BotRetweet();
	//TwitterBot.BotGetTweets()
}

BotInit();

module.exports = {
	BotInit,
};
