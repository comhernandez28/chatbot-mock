import * as S from './Button.styled';

interface ButtonProps {
	disabled: boolean;
	onClick: () => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ disabled, onClick, children }) => {
	return (
		<>
			<S.Button disabled={disabled} onClick={onClick}>
				{children}
			</S.Button>
		</>
	);
};

export default Button;
