const TwitterBot = require('./twitter-bot.ts');

// Initiate Bot
function BotInit() {
	TwitterBot.RetweetStream()
	//TwitterBot.GetTweets()
}

BotInit();

module.exports = {
	BotInit,
};
