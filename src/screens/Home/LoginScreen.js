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
import LOGO from "../../../assets/logo.png"
import BG from "../../../assets/bg.jpg"

import { ACCENT, colors, GRAY, PRIMARY } from '../../constants/colors';

const {height, width} = Dimensions.get('window');

enableScreens();

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, isSubmitting] = useState(false);
  const [color,setColor] = useState("");

//   const {updateUser, user, token, updateToken} = useContext(GlobalContext);

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleForgot = () => {
    navigation.navigate('ForgotPasswordScene');
  };

  const handleSignUp = () => {
    navigation.dispatch(StackActions.replace('SignUpScene'));
  };

//   const [loginUser] = useMutation(LOGIN_USER, {
//     async onCompleted(data) {
//       console.log(data, 'data');

//       //Updating values in async storage
//       updateUser(data.loginUser.user);
//       updateToken(data.loginUser.token);

//       //Updating AsyncStorage for persistence
//       await AsyncStorage.setItem('token', data.loginUser.token);
//       await AsyncStorage.setItem('user', JSON.stringify(data.loginUser.user));
//       isSubmitting(false);
//       if (Platform.OS === 'android') {
//         ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
//       }
//       navigation.dispatch(StackActions.replace('Home'));
//     },
//     onError(error) {
//       isSubmitting(false);
//       if (Platform.OS === 'android') {
//         ToastAndroid.show(error.message, ToastAndroid.SHORT);
//       }
//     },
//   });

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

	navigation.navigate("HomeScreen");

     if (email) {
      if (password) {
        if (email.match(re)) {
          isSubmitting(true);
        //   loginUser({
        //     variables: {email, password},
        //   });
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
				  colorOne: PRIMARY,
				  colorTwo: ACCENT,
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
                  letterSpacing:2.5,
                  marginBottom:20,
                  fontWeight:"bold"
                }}>{"Sign In"}</Text>
            </View>
            <InputBox
              style={{
                backgroundColor: "transparent",
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
                  borderLeftWidth:0,
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
                  marginTop:10,
                  color: GRAY.T5,
                  textDecorationLine: 'underline',
                }}>
                {"Forgot Password ?"}
              </Text>
            </View>

            <View style={{
              flexDirection:"row",
              justifyContent:"center",
              marginTop:20
            }}>
              <Btn
                style={{
                  width:width/3,
                  backgroundColor:"#222422"
                }}
                title={"Login"}
                onPress={handleLogin}
                loading={submitting}
                loadingText={"Loading"}
              />

            </View>

            <Text onPress={handleSignUp} style={{textAlign: 'center',margin:20,color:"white"}}>
              {"Not registered? Sign In"}
              <Icon name="arrow-forward" style={{fontSize: 15}} />
            </Text>
          </View>
      </LinearGradientComp>
  );
};

export default LoginScreen;