/**
 * @description Define nomes e valores padrões da busca
 */
 class SearchParams {

  /**
   * @description O que procuramos
   */
  PHRASES = [
    'i miss essek', 
    'i miss essik', 
    'missing essek hours',
    'i miss the shadowhand', 
    'when will essek return', 
  ]

  /**
  * @description O que tiramos
  */
  FILTERS = [
    'wip', 
    'nsfw', 
    'dont rt', 
    'don\'t rt', 
    'dont retweet', 
    'don\'t retweet', 
    'work in progress']

  /**
  * @description Não retweetamos destes users
  */
  DONT_RT_FROM = [
    '378362899', //@Sleebers -> por crimes de caleb/nott
    '1069976807540183040', //@swordsoprano
    '1116850367835377664', //@wlwjester
    '1305319579170766856', //@i_miss_essek
    '1236906424707375104', //@rynn_birb -> weird
  ]

}
export default new SearchParams()