import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StreamedResponse = styled.span`
	animation: ${fadeIn} 0.3s ease-in-out;
`;

export const Container = styled.div`
	background-color: #f8f8f8;
	border: 1px solid ${props => props.theme.colors.buttonMain};
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 500px;
	margin: 20px auto;
	padding: 20px;
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: flex-end;
	height: 80vh;
	overflow: hidden;

	@media (max-width: 768px) {
		max-width: 80vw;
	}
`;

export const MessagesWrapper = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 10px;
`;

export const MessageLeft = styled.div`
	background-color: #fff;
	border-radius: 15px;
	padding: 10px 20px 10px 10px;
	margin-bottom: 10px;
	display: flex;
	position: relative;
	text-align: left;
	border: 1px solid ${props => props.theme.colors.highlight};
`;

export const MessageRight = styled.div`
	background-color: #fff;
	border-radius: 15px;
	padding: 10px 10px 10px 20px;
	margin-bottom: 10px;
	display: flex;
	position: relative;
	text-align: right;
	justify-content: flex-end;
	overflow-wrap: anywhere;
	border: 1px solid ${props => props.theme.colors.highlight};
`;

export const Content = styled.span`
	color: black;
	font-size: 1rem;
	line-height: 1.5;
	margin: 0;
`;

export const SubmitContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;
