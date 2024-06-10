import React, { useRef } from 'react';
import * as S from './Input.styled';

//Potentially make input a catch-all shared component
type InputType = 'text' | 'textarea' | 'email' | 'password' | 'date';

interface InputProps {
	type: InputType;
	placeholder: string;
	value: string;
	onKeyDown: React.KeyboardEventHandler;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	value,
	onKeyDown,
	onChange,
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleInput = () => {
		if (textareaRef.current) {
			const rows = textareaRef.current.value.split('\n').length;
			textareaRef.current.rows = rows;
		}
	};

	return (
		<S.Container>
			{type === 'textarea' ? (
				<S.StyledTextarea
					ref={textareaRef}
					onInput={handleInput}
					rows={1}
					placeholder={placeholder}
					value={value}
					onKeyDown={onKeyDown}
					onChange={onChange}
				/>
			) : (
				<S.StyledInput
					type={type}
					placeholder={placeholder}
					value={value}
					onKeyDown={onKeyDown}
					onChange={onChange}
				/>
			)}
		</S.Container>
	);
};

export default Input;
