import { Params } from './config'
import RtStream from './service'

function BotInit() {
	RtStream({
		label: "MISS",
		track: Params.PHRASES__MISS,
		filters: {
			user: true, 
			reply: true,
			phrase: true,
			quoteRt: true,
		}
	})
	console.log("Now streaming...")
}

BotInit()

