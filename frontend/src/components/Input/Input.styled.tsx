import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const StyledInput = styled.input`
	width: 100%;
	padding: 15px;
	border: 1px solid #ccc;
	border-radius: 15px;
	font-size: 1rem;
	outline: none;
	transition: border-color 0.2s;

	&:focus {
		border-color: ${props => props.theme.colors.highlight};
	}
`;

export const StyledTextarea = styled.textarea`
	width: 100%;
	padding: 15px;
	border: 1px solid #ccc;
	border-radius: 15px;
	font-size: 1rem;
	outline: none;
	transition: border-color 0.2s;
	resize: none;

	&:focus {
		border-color: ${props => props.theme.colors.highlight};
	}
`;
