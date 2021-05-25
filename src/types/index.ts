export default interface FilterProps {
	label?: string,
	track: string | string[] 
	filterUserIds?: boolean,
	filterStrings?: boolean,
	filterReplies?: boolean,
	filterNonMedia?: boolean,
	filterQuoteRetweets?: boolean,
	filterSensitiveContent?: boolean,
}