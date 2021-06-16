import Bot, { Params } from "../config"
import BotConfigProps, { FilterProps, Tweet } from "../types"

/**
 * @description Faz stream, filter e retweet dos tweets recentes de acordo com uma query simples dada em `track`.
 * Na stream em tempo-real não tem como fazer uma filtragem tão extensa como na search, em que temos vários tipos de strings que definem condicionais  
 */
const RetweetStream = (props: BotConfigProps) => {
  
  const stream = Bot.stream('statuses/filter', { track: props.track })
  
	stream.on('tweet', (tweet: Tweet) => {
    if(!tweet.retweeted_status) { //mudar para retweeted?
			isFilterBlocked(tweet, props.filters) 
      ?	console.log(`-> Bot [${props.label}] has filtered: ${tweet.text}`)
      : Retweet(tweet.id_str, props.label)
		}
	})
}

const Retweet = (id: string, label?: string) => {
  Bot.post('statuses/retweet/:id', { id },
  (err, data) => {
    console.log(err 
      ? `-> Bot [${label}] could not retweet: ${err.message}`
      : `=> Bot [${label}] retweeted: ${(data as Tweet).text}`)
		})
  }
  
interface filter { prop: boolean, foo: () => boolean | string }
/**
 * @description Define se o tweet é elegível para o retweet de acordo com seu props
 */
export const isFilterBlocked = (tweet: Tweet, props?: FilterProps) => {

  if(props === undefined) return false

  const evalQuoteRt = () => tweet.is_quote_status
  const evalSensitiveContent = () => tweet.possibly_sensitive
  const evalReply = () => tweet.in_reply_to_status_id_str !== null
  const evalUser = () => Params.DONT_RT_FROM.some(filter => tweet.user.id_str === filter)
  const evalNonMedia = () => tweet.entities.media === undefined && tweet.entities.urls.length === 0
  const evalPhrase = () => Params.FILTERS.some(filter => tweet.text.toLowerCase().replace(/[^a-z]+/g,' ').includes(filter.toLowerCase()))

  const filters: filter[] = [
    { prop: props.reply, foo : evalReply },
    { prop: props.nonMedia, foo : evalNonMedia },
    { prop: props.quoteRt, foo : evalQuoteRt },
    { prop: props.phrase, foo : evalPhrase },
    { prop: props.user, foo : evalUser },
    { prop: props.sensitiveContent, foo : evalSensitiveContent },
  ]

  const blockedTweet = (f: filter) => {
    const blocked = f.prop && f.foo()
    if(blocked) console.log(`\n-> BLOCKED BY FILTER: ${f.foo.name}`)
    return blocked
  }

  return filters.some(f => blockedTweet(f))
}

export default RetweetStream