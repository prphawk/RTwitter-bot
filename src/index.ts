import RtStream from './service/stream/RetweetService'

function BotInit() {
	RtStream({
		filterUserIds: true, 
		filterReplies: true,
		filterStrings: true,
		filterQuoteRetweets: true,
	})
}

BotInit()

