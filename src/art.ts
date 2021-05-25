import { Params } from './config'
import RtStream from './service'

function BotInit() {

  console.log("Now streaming...")
	RtStream({
		label: "ART",
		track: Params.PHRASES__ART,
		filterStrings: true,
		filterQuoteRetweets: true,
		filterNonMedia: true,
	})
}

BotInit()

