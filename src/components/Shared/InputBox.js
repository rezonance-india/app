import React, {useState, useRef} from 'react';
import {View, Text, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ACCENT, GRAY, PRIMARY } from '../../constants/colors';

// import {THEME, GRAY, PRIMARY, ACCENT} from '../../constants/colors';

const InputBox = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const inputRef = useRef();

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur();
  };

  const handleType = (text) => {
    setValue(text);
    if (props.onChangeText) props.onChangeText(text);
  };

  const handleIconPress = () => {
		console.log('lol');
		if (value.length > 0) {
			setValue('');
		}
	};

  return (
    <View style={{marginVertical: 10, marginVertical: 15, ...props.viewStyle}}>
      <TextInput
        {...props}
        style={{
          backgroundColor:"white",
          borderColor:"white",
          borderRadius: 8,
          height: 45,
		      opacity:1,
          ...props.style,
        }}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit={true}
        value={value}
        onChangeText={(text) => handleType(text)}
      />

		{props.icon ? (
			<TouchableOpacity onPress={handleIconPress}>
				<Text	
					style={{
						opacity: 0.8,
						top: 4,
						fontSize: 20,
						color: 'black',
					}}>
					{props.icon}
				</Text>
			</TouchableOpacity>
			) : (
				// <View style={{
				// 	marginTop:-5
				// }}>
				// </View>
				<>
				</>
		)}

      <Text
        style={{
          position: 'absolute',
          left:8,
          top: !isFocused && value === '' ? 13 : -20,
          color: !isFocused && value === '' ? GRAY.T5 : "white",
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