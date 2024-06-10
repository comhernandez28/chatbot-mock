import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	StreamObj,
	fetchChatbotRequest,
	clearChatbotResponse,
} from '../../store/actions/chatbotActions';
import { RootState } from '../../store/store';
import * as S from './ChatWindow.styled';
import { Badge, Button, Input } from '../index';
import DOMPurify from 'dompurify';

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
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const handleSendMessage = () => {
		const newMessage: Message = {
			content: DOMPurify.sanitize(inputText),
			sender: 'right',
		};
		setMessages([...messages, newMessage]);
		setInputText('');

		// Simulate the server generating a response
		setTimeout(() => {
			dispatch(fetchChatbotRequest());
		}, 500);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' && inputText.trim() !== '') {
			event.preventDefault();
			handleSendMessage();
		}
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
			const wordStreamArray: StreamObj[] = chatbotData[0];
			console.log(wordStreamArray);

			const appendText = (index: number) => {
				if (index < wordStreamArray.length) {
					const { text, done } = wordStreamArray[index];
					let decodedText: string = text
						? text
								.replace(/\n```/g, '</code></pre>')
								.replace(/```\n/g, '<pre><code>')
								.replace(/\n/g, '<br />')
						: '';
					if (decodedText !== '') {
						setTimeout(() => {
							newText += decodedText;
							setStreamedText(
								prevStreamedText =>
									prevStreamedText + decodedText
							);
							appendText(index + 1);
						}, 1);
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
		<>
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
					{/* This div is used to scroll to the bottom */}
				</S.MessagesWrapper>
				<S.SubmitContainer>
					<Input
						type="textarea"
						placeholder="Message VirtuousAI"
						value={inputText}
						onKeyDown={handleKeyDown}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => setInputText(e.target.value)}
					/>
					<Button
						disabled={isStreamingMessage || inputText.trim() === ''}
						onClick={handleSendMessage}
					>
						Ask
					</Button>
				</S.SubmitContainer>
			</S.Container>
		</>
	);
};

export default ChatWindow;
