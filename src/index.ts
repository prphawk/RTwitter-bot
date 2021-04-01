import RtStream from './service/stream/RetweetService'

// Initiate Bot
export default function BotInit() {

	RtStream({
		filterUserIds: true, 
		filterReplies: true,
		filterQuoteRetweets: true,
	})
}

BotInit()

