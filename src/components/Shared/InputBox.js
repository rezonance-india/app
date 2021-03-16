import React, {useState, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {ACCENT, GRAY, PRIMARY} from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
// import Touchab from "react-native-gesture-handler"

const InputBox = (props) => {
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

	const handleIconPress = () => {
		console.log('lol');
		if (value.length > 0) {
			setValue('');
		}
	};

	return (
		<View style={{marginVertical: 10, ...props.viewStyle}}>
			<TextInput
				{...props}
				style={{
					backgroundColor: GRAY.T2,
					// borderColor: PRIMARY,
					borderWidth: 1,
					flex: 1,
					borderRadius: 2,
					height: 45,
					paddingHorizontal: 20,
					...props.style,
				}}
				placeholder={props.placeholder}
				onBlur={handleBlur}
				onFocus={handleFocus}
				onChangeText={(text) => handleType(text)}
				value={value}
				blurOnSubmit={true}
				ref={inputRef}
			/>

			{props.icon ? (
				<TouchableOpacity onPress={handleIconPress}>
					<Text
						// style={styles.searchIcon}
						// name="search-outline"
						style={{
							// position: 'absolute',
							right: 20,
							top: 8,
							fontSize: 24,
							color: 'black',
						}}
						color="red">
						{props.icon}
					</Text>
				</TouchableOpacity>
			) : (
				<Text>{''}</Text>
			)}

			<Text
				style={{
					position: 'absolute',
					left: 2,
					top: !isFocused && value === '' ? 13 : -20,
					color: !isFocused && value === '' ? GRAY.T1 : GRAY.T1,
				}}
				onPress={() => {
					inputRef.current.focus();
				}}>
				{props.label ? props.label : null}
			</Text>
		</View>
	);
};

export default InputBox;
