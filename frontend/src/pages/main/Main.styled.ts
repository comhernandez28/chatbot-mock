import styled from 'styled-components';

interface LeftSectionProps {
	isMenuOpen: boolean;
}

interface RightSectionProps {
	isMenuOpen: boolean;
}

export const Container = styled.div`
	background-color: ${props => props.theme.colors.dark};
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const LeftSection = styled.div<LeftSectionProps>`
	width: ${({ isMenuOpen }) =>
		isMenuOpen ? '30%' : '5%'}; /* Adjust width based on menu state */
	transition: width 0.3s ease;
	background-color: #222; /* Darker background for menu */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 768px) {
		width: 100%;
		height: ${({ isMenuOpen }) =>
			isMenuOpen ? '30%' : '5%'}; /* Adjust height based on menu state */
	}
`;

export const MenuButton = styled.button`
	color: #fff;
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
`;

export const RightSection = styled.div<RightSectionProps>`
	width: ${({ isMenuOpen }) =>
		isMenuOpen ? '70%' : '95%'}; /* Adjust width based on menu state */
	transition: width 0.3s ease;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	color: #fff; /* Text color */
`;
