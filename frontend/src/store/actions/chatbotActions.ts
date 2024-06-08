export const FETCH_CHATBOT_REQUEST = 'FETCH_CHATBOT_REQUEST';
export const FETCH_CHATBOT_SUCCESS = 'FETCH_CHATBOT_SUCCESS';
export const FETCH_CHATBOT_FAILURE = 'FETCH_CHATBOT_FAILURE';
export const CLEAR_CHATBOT_RESPONSE = 'CLEAR_CHATBOT_RESPONSE';

export interface StreamObj {
	text?: string;
	done: boolean;
}

interface FetchChatbotRequestAction {
	type: typeof FETCH_CHATBOT_REQUEST;
}

interface FetchChatbotSuccessAction {
	type: typeof FETCH_CHATBOT_SUCCESS;
	payload: StreamObj;
}

interface FetchChatbotFailureAction {
	type: typeof FETCH_CHATBOT_FAILURE;
	error: string;
}

interface ClearChatbotAction {
	type: typeof CLEAR_CHATBOT_RESPONSE;
}

export type ChatbotActionTypes =
	| FetchChatbotRequestAction
	| FetchChatbotSuccessAction
	| FetchChatbotFailureAction
	| ClearChatbotAction;

export const fetchChatbotRequest = () => ({
	type: FETCH_CHATBOT_REQUEST,
});
export const clearChatbotResponse = () => ({ type: CLEAR_CHATBOT_RESPONSE });
