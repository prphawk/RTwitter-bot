import TweetFilterProps from './props'
import SearchParams from '../constants'
import Twit from 'twit'

  /**
   * @description Define se o tweet é elegível para o retweet de acordo com seu props
   */
  export const hasFilter = (tweet: Twit.Twitter.Status, props: TweetFilterProps): boolean => {

    const filteredString = (): boolean => {
      if(props.filterStrings) {
        return SearchParams.FILTERS
        .some(filter => tweet.text.toLowerCase()
          .replace(/[^a-z]+/g, ' ')
          .includes(filter
          .toLowerCase()))
      } return false
    }

    const filteredReply = (): boolean => {
      if(props.filterReplies) {
        console.log('\n-- in reply: ' + tweet.in_reply_to_status_id_str)
        return tweet.in_reply_to_status_id_str !== undefined
      } return false
    }

    const filteredQuote = (): boolean => {
      if(props.filterQuoteRetweets) {
        console.log("\n-- QUOTE STATUS: " + tweet.is_quote_status)
        return tweet.is_quote_status !== undefined
      } return false
    }

    const filterSensitiveContent = (): boolean => {
      if(props.filterSensitiveContent) {
        return tweet.possibly_sensitive
      } return false
    }

    const filterNonMedia = (): boolean => {
      if(props.filterNonMedia) {
        return tweet.entities.media.length === 0
      } return false
    }

    return filteredReply() 
    || filteredQuote()
    || filterSensitiveContent() 
    || filterNonMedia()
    || filteredString()
  }

  /**
   * @description Define string de query search de acordo com seu props
   */
  export const makeQuery = (props:TweetFilterProps) => {

    let strings = SearchParams.PHRASES

    if(props.filterStrings) {
      strings.concat(SearchParams.FILTERS.map(filter => '-' + filter))
    }

    let response = strings.join(' ')

    if(props.filterNonMedia) {
      response += ' filter:images'
    }
    if(props.filterQuoteRetweets) {
      response += ' -filter:retweets'
    }
    if(props.filterReplies) {
      response += ' -filter:replies'
    }

    return response
  }