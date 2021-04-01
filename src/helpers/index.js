import SearchParams from '../params/index.js'

  /**
   * @description Define se o tweet é elegível para o retweet de acordo com seu props
   */
  export const isFilterBlocked = (tweet, props) => {

    const filterUser = () => SearchParams.DONT_RT_USER_IDS.some(filter => tweet.user.id_str === filter)

    const filteredString = () => SearchParams.FILTERS
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
      { prop: props.filterUserIds && SearchParams.DONT_RT_USER_IDS.length > 0 , foo: filterUser },
      { prop: props.filterStrings && SearchParams.FILTERS.length > 0, foo: filteredString },
    ] 

    return filters.some(f => f.prop && f.foo())
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