import Bot from "../../config"
import { isFilterBlocked } from "./FilterService"
import SearchParams from "../../params"
import FilterProps from '../../types'
import { Twitter } from "twit"

/**
 * @description Faz stream, filter e retweet dos tweets recentes de acordo com uma query simples dada em `track`.
 * Na stream em tempo-real não tem como fazer uma filtragem tão extensa como na search, em que temos vários tipos de strings que definem condicionais  
 */
 const RetweetStream = (props: FilterProps) => {

	const stream = Bot.stream('statuses/filter', { track: SearchParams.PHRASES })

	stream.on('tweet', (tweet: Twitter.Status) => {
		if(!tweet.retweeted_status) {
			if(isFilterBlocked(tweet, props)) {
				console.log(`-> Bot has filtered: ${tweet.text}`)
			} else {
				//Retweet(tweet.id_str)
				console.log(`\n=> ${tweet.text}`)
			}
		}
	})
}

const Retweet = (id: string) => {
		Bot.post('statuses/retweet/:id', { id },
		(err, data) => {
			console.log(err ? 
				(`-> Bot could not retweet: ${err.message}`) 
				: (`=> Bot retweeted: ${data}`))
		})
}

export default RetweetStream