import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
  Platform,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageColors from 'react-native-image-colors';

import LinearGradientComp from '../../components/Shared/LinearGradient';
import Btn from "../../components/Shared/Btn";
import InputBox from "../../components/Shared/InputBox"

//Constants

//Assets
import LOGO from "../../../assets/rezonance-logo-blue-sq.png"
import BG from "../../../assets/bg.jpg"

import { ACCENT, colors, GRAY, PRIMARY } from '../../constants/colors';
import { userApiUrl } from '../../constants/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../../context/GlobalState';

const {height, width} = Dimensions.get('window');

enableScreens();

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, isSubmitting] = useState(false);
  const [color,setColor] = useState("");

  const {updateUser,updateToken} = useContext(GlobalContext);

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleForgot = () => {
    navigation.navigate('ForgotPasswordScene');
  };

  const handleSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

	useEffect(() => {
		const getDominantColors = async () => {
			const colors = await ImageColors.getColors(BG, {
				fallback: '#7f8c8d',
			});
			if (colors.platform === 'android') {
				averageColor = colors.average;
				setColor(averageColor);
			} else {
				const backgroundColor = colors.background;
				setColor(backgroundColor);
			}
			return averageColor;
		};
		getDominantColors();
	}, []);

  const handleLogin = () => {
	const re=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

     if (email) {
      if (password) {
        if (email.match(re)) {
          isSubmitting(true);
            axios.post(`${userApiUrl}/user/signin`,{
              email,
              password
            }).then(async (result) => {
              // const {user,token} = res.data;
              const user = result.data.user;
              const token = result.data.token;

              updateUser(user);
              updateToken(token);     
              await AsyncStorage.setItem('token',token);
              await AsyncStorage.setItem('user', JSON.stringify(user));
              isSubmitting(false);
              if (Platform.OS === 'android') {
                ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
              }
              navigation.navigate("HomeScreen");              
            }).catch((err) => {
              isSubmitting(false);
              if (Array.isArray(err.response.data.errors)) {
                if (Platform.OS === 'android') {
                  ToastAndroid.show(err.response.data.errors[0].msg, ToastAndroid.SHORT);
                }
              }
            })
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
          }
        }
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Password can not be empty', ToastAndroid.SHORT);
        }
      }
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Email can not be empty', ToastAndroid.SHORT);
      }
    }
  };

  return (
	    // <SafeAreaView style={{flex: 0.5,flexDirection:"column", justifyContent: 'center'}}>

      <LinearGradientComp
			  bgcolors={{
				  // colorOne: PRIMARY,
				  colorOne: "#004e92",
				  colorTwo: "#000428",
			}}>
      {/* <KeyboardAvoidingView
        keyboardVerticalOffset={-height / 2}
        style={{flex: 1, alignItems: 'center'}}
        behavior="position"> */}
        

        {/* <View style={{backgroundColor:"white", paddingHorizontal: 10}}> */}
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              marginTop:height/3,
              margin:30,
              minHeight: height / 10,
              maxHeight: height / 2.5,
            }}>
            <View
              style={{flexDirection: 'column',marginBottom:60, alignItems:"center"}}> 
              <Image
                source={LOGO}
                style={{height:height/4, width: width/2}}
              />
              <Text style={{
                  color:"white",
                  fontSize:26,
                  marginRight: "5%",
                  letterSpacing:1,
                  marginBottom:5,
                  alignContent: "center",
                  fontWeight:"bold"
                }}>{"Sign In"}</Text>
            </View>
            <InputBox
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontSize: 16,
                borderLeftWidth:0,
                borderRightWidth:0,
                borderTopWidth:0,
                borderWidth: 1,
              }}
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize={'none'}
              autoCompleteType={'email'}
            />
            <InputBox
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  borderLeftWidth:0,
                  fontSize: 16,
                  borderRightWidth:0,
                  borderTopWidth:0,
                  borderWidth: 1,
                }}
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              textContentType={'password'}
              autoCompleteType={'password'}
              secureTextEntry={true}
              viewStyle={{marginBottom: 2}}
            />

            <View style={{flexDirection: 'row-reverse'}}>
              <Text
                onPress={handleForgot}
                style={{
                  marginTop:25,
                  color: GRAY.T5,
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                {"Forgot Password ?"}
              </Text>
            </View>

            <View style={{
              flexDirection:"row",
              justifyContent:"center",
              marginTop:50
            }}>
              <Btn
                style={{
                  width:width/3,
                  color: "black",
                  backgroundColor:"rgb(243, 244, 246)"
                }}
                title={"Login"}
                onPress={handleLogin}
                loading={submitting}
                loadingText={"Loading"}
              />

            </View>

            <Text onPress={handleSignUp} style={{textAlign: 'center', margin:30, color:"white", fontSize: 16}}>
              {"Don't have an account? Sign Up"}
              <Icon name="arrow-forward" style={{fontSize: 15}} />
            </Text>
          </View>
      </LinearGradientComp>
  );
};

export default LoginScreen;