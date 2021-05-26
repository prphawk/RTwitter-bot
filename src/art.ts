import { Params } from './config'
import RtStream from './service'

function BotInit() {
	RtStream({
		label: "ART",
		track: Params.PHRASES__ART,
		filters: {
			phrase: true,
			quoteRt: true,
			nonMedia: true,
		}
	})
	console.log("Now streaming...")
}

BotInit()

