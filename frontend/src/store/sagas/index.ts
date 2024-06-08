import { all, call } from 'redux-saga/effects';
import chatbotSaga from './chatbotSaga';

export default function* rootSaga() {
	yield all([call(chatbotSaga)]);
}
