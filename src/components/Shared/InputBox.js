import React, {useState, useRef} from 'react';
import {View, Text, TextInput} from 'react-native';
import {GRAY, PRIMARY} from '../../constants/colors';

const TextBox = (props) => {
	const [isFocused, setIsFocused] = useState(false);
	const [value, setValue] = useState('');

	const inputRef = useRef();

	const handleFocus = () => {
		setIsFocused(true);
		if (props.onFocus) {
			props.onFocus();
		}
	};

	const handleBlur = () => {
		setIsFocused(false);
		if (props.onBlur) {
			props.onBlur();
		}
	};

	const handleType = (text) => {
		setValue(text);
		if (props.onChangeText) {
			props.onChangeText(text);
		}
	};

	return (
		<View style={{marginVertical: 10, ...props.viewStyle}}>
			<TextInput
				{...props}
				style={{
					backgroundColor: GRAY.T2,
					borderColor: PRIMARY,
					borderWidth: 1,
					borderRadius: 2,
					height: 45,
					paddingHorizontal: 5,
					...props.style,
				}}
				onBlur={handleBlur}
				onFocus={handleFocus}
				onChangeText={(text) => handleType(text)}
				value={value}
				blurOnSubmit={true}
				ref={inputRef}
			/>

			<Text
				style={{
					position: 'absolute',
					left: 2,
					top: !isFocused && value === '' ? 13 : -20,
					color: !isFocused && value === '' ? GRAY.T1 : ACCENT,
				}}
				onPress={() => {
					inputRef.current.focus();
				}}>
				{props.label ? props.label : null}
			</Text>
		</View>
	);
};

export default TextBox;
