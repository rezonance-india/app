import React, {useState, useRef} from 'react';
import {View, Text, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ACCENT, GRAY, PRIMARY } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

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
          color:"white",
		      opacity:1,
          ...props.style,
        }}
        placeholderTextColor={props.searchbox ? "black" : "white"}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit={true}
        value={value}
        onChangeText={(text) => handleType(text)}
      />

		{props.icon ? (
			<TouchableOpacity style={{
        justifyContent:"center",
        alignItems:"center",
      }}onPress={handleIconPress}>
        <Icon
            size={30}
            name="close-circle-outline"
            style={[
              {
                marginTop:"20%",
                color: "black",
              },
            ]}
        />
			</TouchableOpacity>
			) : (
        <>
        </>
		)}

      <Text
        style={{
          position: 'absolute',
          left:8,
          top: !isFocused && value === '' ? 13 : -20,
          color: !isFocused && value === '' ? "white" : GRAY.T5,
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