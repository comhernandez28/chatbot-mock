import styled from 'styled-components';

export const Button = styled.button`
	background-color: ${props => props.theme.colors.primary};
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${props => props.theme.colors.primaryDark};
	}
`;
