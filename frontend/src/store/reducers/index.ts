import { combineReducers } from '@reduxjs/toolkit';
import chatbotReducer from './chatbotReducer';

const rootReducer = combineReducers({
	chatbot: chatbotReducer,
});

export default rootReducer;
