import Bot, { Params } from "../config"
import FilterProps from '../types'
import { Twitter } from "twit"

/**
 * @description Faz stream, filter e retweet dos tweets recentes de acordo com uma query simples dada em `track`.
 * Na stream em tempo-real não tem como fazer uma filtragem tão extensa como na search, em que temos vários tipos de strings que definem condicionais  
 */
 const RetweetStream = async (props: FilterProps) => {

	const stream = Bot.stream('statuses/filter', { track: props.track })

	stream.on('tweet', (tweet: Twitter.Status) => {
		if(!tweet.retweeted_status) {
			isFilterBlocked(tweet, props) 
				?	console.log(`-> Bot [${props.label}] has filtered: ${tweet.text}`)
				: console.log(`=> Bot [${props.label}] would retweet: ${tweet.text}`)//Retweet(tweet.id_str)
		}
	})
}

const Retweet = (id: string) => {
		Bot.post('statuses/retweet/:id', { id },
		(err, data) => {
			console.log(err 
				? `-> Bot could not retweet: ${err.message}`
				: `=> Bot retweeted: ${data}`)
		})
}

  /**
   * @description Define se o tweet é elegível para o retweet de acordo com seu props
   */
	 export const isFilterBlocked = (tweet: Twitter.Status, props: FilterProps) => {

    const filterUser = () => Params.DONT_RT_FROM.some(filter => tweet.user.id_str === filter)

    const filteredString = () => Params.FILTERS
    .some(filter => tweet.text.toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .includes(filter.toLowerCase()))

    const filteredReply = () => tweet.in_reply_to_status_id_str !== null

    const filterQuote = () => tweet.is_quote_status

    const filterSensitiveContent = () => tweet.possibly_sensitive

    const filterNonMedia = () => tweet.entities.media === undefined

    const filters = [ 
      { prop: props.filterReplies , foo: filteredReply },
      { prop: props.filterQuoteRetweets, foo: filterQuote },
      { prop: props.filterSensitiveContent, foo: filterSensitiveContent },
      { prop: props.filterUserIds && Params.DONT_RT_FROM.length > 0 , foo: filterUser },
      { prop: props.filterStrings && Params.FILTERS.length > 0, foo: filteredString },
      { prop: props.filterNonMedia, foo: filterNonMedia },
    ] 

    return filters.some(f => f.prop && f.foo())
  }

export default RetweetStream