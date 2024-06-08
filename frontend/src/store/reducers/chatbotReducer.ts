import {
	StreamObj,
	FETCH_CHATBOT_SUCCESS,
	FETCH_CHATBOT_FAILURE,
	CLEAR_CHATBOT_RESPONSE,
	ChatbotActionTypes,
} from '../actions/chatbotActions';

interface ChatbotStreamState {
	data: StreamObj[];
	error: string | null;
}

const initialChatbotStreamState: ChatbotStreamState = {
	data: [],
	error: null,
};

const chatbotReducer = (
	state = initialChatbotStreamState,
	action: ChatbotActionTypes
): ChatbotStreamState => {
	switch (action.type) {
		case FETCH_CHATBOT_SUCCESS:
			return {
				...state,
				data: [...state.data, action.payload],
			};
		case FETCH_CHATBOT_FAILURE:
			return {
				...state,
				error: action.error,
			};
		case CLEAR_CHATBOT_RESPONSE:
			return {
				...state,
				data: [],
			};
		default:
			return state;
	}
};

export default chatbotReducer;
