import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
	StreamObj,
	FETCH_CHATBOT_SUCCESS,
	FETCH_CHATBOT_FAILURE,
	FETCH_CHATBOT_REQUEST,
} from '../actions/chatbotActions';

function* fetchChatbotRequest() {
	try {
		const response: AxiosResponse = yield call(axios.post, '/stream');
		//Response data is a string of JSON Objects
		const data: string = response.data;

		// Parse each JSON object into an array of objects
		const objects: StreamObj[] = data
			.trim()
			.split('\n')
			.map((obj: string) => JSON.parse(obj));

		yield put({ type: FETCH_CHATBOT_SUCCESS, payload: objects });
	} catch (error) {
		if (error instanceof Error) {
			yield put({ type: FETCH_CHATBOT_FAILURE, error: error.message });
		} else {
			yield put({
				type: FETCH_CHATBOT_FAILURE,
				error: 'An error occurred',
			});
			console.error('Error fetching data:', error);
		}
	}
}

export default function* chatbotSaga() {
	yield takeLatest(FETCH_CHATBOT_REQUEST, fetchChatbotRequest);
}
