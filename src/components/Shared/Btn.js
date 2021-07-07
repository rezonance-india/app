import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { GRAY, PRIMARY } from '../../constants/colors';

const Btn = (props) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true);
  };
  const handlePressOut = () => {
    setIsPressed(false);
  };
  return (
    <View>
      <TouchableOpacity
        {...props}
        style={{
          backgroundColor: props.loading ?  GRAY.T5 : PRIMARY,
          height: 40,
          width: null,
          borderRadius: 16 / 2,
          elevation: isPressed || props.loading ? 0 : 1,
          ...props.style,
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.75}>
        <Text
          style={{
            flex: 1,
            fontSize: 15,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: GRAY.T1,
            marginHorizontal: 20,
          }}>
          {props.loading
            ? props.loadingText
              ? props.loadingText
              : 'Loading...'
            : props.title}
        </Text>
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

export default Btn;