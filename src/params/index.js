/**
 * @description Define nomes e valores padrões da busca
 */
class SearchParams {

  /**
   * @description O que procuramos
   */
  PHRASES = ['Test', 'Among Us']

  /**
  * @description O que tiramos
  */
  FILTERS = ["Some word/phrase you don't want to see retweeted"]

  /**
  * @description Não retweetamos destes users
  */
  DONT_RT_USER_IDS = [
    '0000000000000000000', //@user
  ]

  MIN_FAVES = 200
}

export default new SearchParams()