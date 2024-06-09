import * as S from './Main.styled';
import vaiLogo from '../../assets/images/vai-logo.png';

import { ChatWindow } from '../../components';

function Main() {
	return (
		<div>
			<S.Container>
				<S.MainSection>
					<S.Content>
						<img src={vaiLogo} alt="VirtuousAI Logo" />
						<ChatWindow></ChatWindow>
					</S.Content>
				</S.MainSection>
			</S.Container>
		</div>
	);
}

export default Main;
