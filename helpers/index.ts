import TweetFilterProps from './props'
import Constants from '../constants'

  /**
   * @description Define se o tweet é elegível para o retweet de acordo com seu props
   */
  export const containFilter = (tweet, props: TweetFilterProps): boolean => {

    const filteredString = (): boolean => {
      if(props.filterStrings) {
        return Constants.SEARCH_FILTERS
        .some(filter => tweet.text.toLowerCase()
          .replace(/[^a-z]+/g, ' ')
          .includes(filter
          .toLowerCase()))
      } return false
    }

    const filteredReply = (): boolean => {
      if(props.filterReplies || props.filterQuoteRetweets) {
        return tweet.in_reply_to_status_id_str || tweet.is_quote_status ? true : false
      }
    }

    const filterSensitiveContent = (): boolean => {
      return tweet.possibly_sensitive
    }

    const filterNonMedia = (): boolean => {
      return tweet.entities.media.length === 0
    }

    return filteredString()
    || filteredReply() 
    || filterSensitiveContent() 
    || filterNonMedia()
  }

  /**
   * @description Define string de query search de acordo com seu props
   */
  export const makeQuery = (props:TweetFilterProps) => {

    let strings = Constants.SEARCH_PHRASES

    if(props.filterStrings) {
      strings.concat(Constants.SEARCH_FILTERS.map(filter => '-' + filter))
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