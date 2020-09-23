import SearchParams from '../params/index.js'

  /**
   * @description Define se o tweet é elegível para o retweet de acordo com seu props
   */
  export const hasFilter = (tweet, props) => {

    const filteredUser = () => {
      if(props.filterUserIds && SearchParams.DONT_RT_USER_IDS.length > 0) {
        return SearchParams.DONT_RT_USER_IDS
        .some(filter => tweet.user.id_str === filter)
      } return false
    }

    const filteredString = () => {
      if(props.filterStrings && SearchParams.FILTERS.length > 0) {
        return SearchParams.FILTERS
        .some(filter => tweet.text.toLowerCase()
          .replace(/[^a-z]+/g, ' ')
          .includes(filter
          .toLowerCase()))
      } return false
    }

    const filteredReply = () => {
      if(props.filterReplies) {
        return tweet.in_reply_to_status_id_str !== null
      } return false
    }

    const filteredQuote = () => {
      if(props.filterQuoteRetweets) {
        return tweet.is_quote_status
      } return false
    }

    const filterSensitiveContent = () => {
      if(props.filterSensitiveContent) {
        return tweet.possibly_sensitive
      } return false
    }

    const filterNonMedia = () => {
      if(props.filterNonMedia) {
        return tweet.entities.media.length === 0
      } return false
    }

    return filteredReply() 
    || filteredQuote()
    || filterSensitiveContent() 
    || filterNonMedia()
    || filteredUser()
    || filteredString()
  }

  /**
   * @description Define string de query search de acordo com seu props
   */
  export const makeQuery = (props) => {

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