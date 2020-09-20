export default interface TweetFilterProps {
	filterStrings?: boolean,
	filterSensitiveContent?: boolean,
	filterReplies?: boolean,
	filterQuoteRetweets?: boolean,
	filterNonMedia?: boolean,
	filterMinFaves?: number,
	filterUserIds?: boolean,
}