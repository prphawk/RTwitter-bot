/**
 * @description Define nomes e valores padrões da busca
 */
class SearchParams {

  /**
   * @description O que procuramos
   */
  PHRASES = ['i miss essek', 'i miss essik', 'i miss the shadowhand', 'when will essek return', 'missing essek hours']

  /**
  * @description O que tiramos
  */
  FILTERS = []

  /**
  * @description Não retweetamos destes users
  */
  DONT_RT_USER_IDS = [
    '1069976807540183040', //@swordsoprano
    '1116850367835377664', //@wlwjester
    '378362899', //@Sleebers -> por crimes de caleb/nott
    '1305319579170766856', //@i_miss_essek
  ]

  MIN_FAVES = 200
}

export default new SearchParams()