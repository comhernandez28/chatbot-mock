import styled from 'styled-components';

export const Container = styled.div`
	background-color: ${props => props.theme.colors.dark};
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const MainSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	margin-top: 20px;
	color: #fff;
`;
