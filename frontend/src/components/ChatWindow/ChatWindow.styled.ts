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
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 500px;
	max-width: 100%;

	margin: 20px auto;
	padding: 20px;
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: flex-end;
	height: 70vh; // Full height of the viewport

	overflow: hidden; // Prevent overflow
`;

export const MessagesWrapper = styled.div`
	flex: 1;
	overflow-y: auto; // Enable vertical scrolling
	padding: 10px;
`;

export const MessageLeft = styled.div`
	background-color: #fff;
	border-radius: 15px;
	padding: 10px;
	margin-bottom: 10px;
	display: flex;
	position: relative;
	text-align: left;
	border: 1px solid ${props => props.theme.colors.highlight};
`;

export const MessageRight = styled.div`
	background-color: #fff;
	border-radius: 15px;
	padding: 10px;
	margin-bottom: 10px;
	display: flex;
	position: relative;
	text-align: right;
	justify-content: flex-end;
	border: 1px solid ${props => props.theme.colors.highlight};
`;

export const Content = styled.span`
	color: black;
	font-size: 1rem;
	line-height: 1.5;
	margin: 0;
`;
