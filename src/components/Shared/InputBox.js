import React, {useState, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {ACCENT, GRAY, PRIMARY} from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

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
					backgroundColor: GRAY.T8,
					opacity: 0.6,
					borderWidth: 1,
					borderColor: 'transparent',
					flex: 1,
					color: 'white',
					borderRadius: 5,
					height: 50,
					paddingLeft: 20,
					marginRight: -20,
					...props.style,
				}}
				placeholder={props.placeholder}
				placeholderTextColor="white"
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
							opacity: 0.6,
							right: 20,
							top: 10,
							fontSize: 20,
							color: 'white',
						}}>
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
					color: !isFocused && value === '' ? 'white' : 'white',
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
