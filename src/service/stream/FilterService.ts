import { Twitter } from 'twit'
import params from '../../params/index'
import FilterProps from '../../types'

  /**
   * @description Define se o tweet é elegível para o retweet de acordo com seu props
   */
  export const isFilterBlocked = (tweet: Twitter.Status, props: FilterProps) => {

    const filterUser = () => params.DONT_RT_FROM.some(filter => tweet.user.id_str === filter)

    const filteredString = () => params.FILTERS
    .some(filter => tweet.text.toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .includes(filter.toLowerCase()))

    const filteredReply = () => tweet.in_reply_to_status_id_str !== null

    const filterQuote = () => tweet.is_quote_status

    const filterSensitiveContent = () => tweet.possibly_sensitive

    const filterNonMedia = () => tweet.entities.media.length === 0

    const filters = [ 
      { prop: props.filterReplies , foo: filteredReply },
      { prop: props.filterQuoteRetweets, foo: filterQuote },
      { prop: props.filterSensitiveContent, foo: filterSensitiveContent },
      { prop: props.filterNonMedia, foo: filterNonMedia },
      { prop: props.filterUserIds && params.DONT_RT_FROM.length > 0 , foo: filterUser },
      { prop: props.filterStrings && params.FILTERS.length > 0, foo: filteredString },
    ] 

    return filters.some(f => f.prop && f.foo())
  }