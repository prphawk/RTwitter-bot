/**
 * @description Define nomes e valores padrões da busca
 */
const SearchParams = {

  /**
   * @description O que procuramos
   */
  PHRASES: ['Test', 'Among Us'],

  /**
  * @description O que tiramos
  */
  FILTERS: ["Some word/phrase you don't want to see retweeted"],

  /**
  * @description Não retweetamos destes users
  */
  DONT_RT_FROM: [
    '0000000000000000000', //@user
  ]
}

export default SearchParams