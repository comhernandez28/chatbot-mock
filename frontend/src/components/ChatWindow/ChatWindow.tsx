import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchChatbotRequest,
	clearChatbotResponse,
} from '../../store/actions/chatbotActions';
import { RootState } from '../../store/store';
import * as S from './ChatWindow.styled';
import { Badge, Input } from '../index';
import DOMPurify from 'dompurify';

interface StreamObj {
	text?: string;
	done: boolean;
}

interface Message {
	content: string;
	sender: 'left' | 'right';
}

const ChatWindow = () => {
	const dispatch = useDispatch();
	const [streamedText, setStreamedText] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputText, setInputText] = useState('');
	const [isStreamingMessage, setIsStreamingMessage] = useState(false);
	const [latestStreamArray, setLatestStreamArray] = useState<StreamObj[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleSendMessage = () => {
		const newMessage: Message = {
			content: DOMPurify.sanitize(inputText),
			sender: 'right',
		};
		setMessages([...messages, newMessage]);
		setInputText('');
		setLatestStreamArray([...latestStreamArray]);

		// Simulate the server generating a response
		setTimeout(() => {
			dispatch(fetchChatbotRequest());
		}, 500);
	};

	const chatbotData = useSelector((state: RootState) => state.chatbot.data);

	useEffect(() => {
		const scrollToBottom = () => {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		};

		scrollToBottom();
	}, [messages, streamedText]);

	useEffect(() => {
		let newText = '';
		if (chatbotData.length > 0 && Array.isArray(chatbotData[0])) {
			setIsStreamingMessage(true);
			const latestStreamArray = chatbotData[0]; // Store the latest streamed array
			setLatestStreamArray(latestStreamArray);
			const wordStreamArray: StreamObj[] = chatbotData[0];
			console.log(chatbotData);
			console.log('latest', latestStreamArray);

			const appendText = (index: number) => {
				if (index < wordStreamArray.length) {
					const { text, done } = wordStreamArray[index];
					let decodedText = text
						? text
								.replace(/\\n\n/g, '<br/>')
								.replace(/\\n\\n/g, '<br/><br/>')
						: '';
					if (decodedText !== '') {
						setTimeout(() => {
							newText += decodedText;
							setStreamedText(
								prevStreamedText =>
									prevStreamedText + decodedText
							);
							appendText(index + 1);
						}, 200);
					} else if (done) {
						setIsStreamingMessage(false);
						setMessages(prevMessages => [
							...prevMessages,
							{
								content: DOMPurify.sanitize(newText),
								sender: 'left',
							},
						]);
						setStreamedText('');
						dispatch(clearChatbotResponse());
					}
				}
			};

			appendText(0);
		}
	}, [chatbotData]);

	return (
		<div>
			<S.Container>
				<S.MessagesWrapper>
					{messages.map((message, index) =>
						message.sender === 'left' ? (
							<S.MessageLeft key={index}>
								<Badge></Badge>
								<S.Content
									dangerouslySetInnerHTML={{
										__html: message.content,
									}}
								></S.Content>
							</S.MessageLeft>
						) : (
							<S.MessageRight key={index}>
								<S.Content>{message.content}</S.Content>
								<Badge></Badge>
							</S.MessageRight>
						)
					)}
					{streamedText && (
						<S.MessageLeft>
							<Badge></Badge>
							<S.Content
								dangerouslySetInnerHTML={{
									__html: streamedText,
								}}
							></S.Content>
						</S.MessageLeft>
					)}{' '}
					<div ref={messagesEndRef}></div>
					{/* This will be used to scroll to the bottom */}
				</S.MessagesWrapper>

				<div>
					<Input
						type="textarea"
						placeholder="Message VirtuousAI"
						value={inputText}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => setInputText(e.target.value)}
					></Input>
					<button
						disabled={isStreamingMessage}
						onClick={handleSendMessage}
					>
						Send Message
					</button>
				</div>
			</S.Container>
		</div>
	);
};

export default ChatWindow;
