import styled from 'styled-components';

export const Button = styled.button`
	background-color: ${props => props.theme.colors.highlight};
	color: white;
	border: none;
	padding: 15px;
	border-radius: 15px;
	margin: 0 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${props => props.theme.colors.black};
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;
