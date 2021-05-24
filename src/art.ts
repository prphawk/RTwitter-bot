import { Params } from './config'
import RtStream from './service'

function BotInit() {

	RtStream({
		label: "ART",
		track: Params.PHRASES__ART,
		filterStrings: true,
		filterQuoteRetweets: true,
		filterNonMedia: true,
	})
}

BotInit()

