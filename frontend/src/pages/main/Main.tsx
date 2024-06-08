import React, { useState } from 'react';
import * as S from './Main.styled';
import vaiLogo from '../../assets/images/vai-logo.png';

import ChatWindow from '../../components/ChatWindow/ChatWindow';

function Main() {
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	return (
		<div>
			<S.Container>
				<S.LeftSection isMenuOpen={isMenuOpen}>
					<S.MenuButton onClick={toggleMenu}>
						{isMenuOpen ? 'Close' : 'Menu'}
					</S.MenuButton>
					{isMenuOpen && <S.Content>Menu items here</S.Content>}
				</S.LeftSection>

				<S.RightSection isMenuOpen={isMenuOpen}>
					<S.Content>
						<img src={vaiLogo} alt="VirtuousAI Logo" />
						<ChatWindow></ChatWindow>
					</S.Content>
				</S.RightSection>
			</S.Container>
		</div>
	);
}

export default Main;
