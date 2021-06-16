import { Twitter } from "twit"

export default interface BotConfigProps {
	track: string | string[] 
	label?: string,
	filters?: FilterProps
}

export interface FilterProps {
	user?: boolean,
	phrase?: boolean,
	reply?: boolean,
	nonMedia?: boolean,
	quoteRt?: boolean,
	sensitiveContent?: boolean,
}

export interface Tweet extends Twitter.Status {}