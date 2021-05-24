import { Params } from './config'
import RtStream from './service'

function BotInit() {

	console.log("oi")
	RtStream({
		label: "MISS",
		track: Params.PHRASES__MISS,
		filterUserIds: true, 
		filterReplies: true,
		filterStrings: true,
		filterQuoteRetweets: true,
	})
	console.log("oi")
}

BotInit()

