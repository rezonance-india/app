import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import ImageColors from 'react-native-image-colors';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import LinearGradientComp from '../../components/Shared/LinearGradient';

//Constants
import { userApiUrl, webClientId } from '../../constants/config';

//Assets
import LOGO from "../../../assets/rezonance-logo-blue-sq.png"
import BG from "../../../assets/bg.jpg"

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../../context/GlobalState';

const {height, width} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {

  const [color,setColor] = useState("");
  const {updateUser,updateIsAuthenticated} = useContext(GlobalContext);

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

    useEffect(() => {
      GoogleSignin.configure({
        webClientId
      });

      auth().onAuthStateChanged(async(user) => {
        if (user) {
          console.log(user,"user");
          axios.post(`${userApiUrl}/user/signup`,{
            name:user.displayName,
            email:user.email,
            photo:user.photoURL
          }).then(async (result) => {
            console.log(result.data,"data");
            
            updateUser(result.data.user);
            await AsyncStorage.setItem('user', JSON.stringify(result.data.user));  

            updateIsAuthenticated(true);
            await AsyncStorage.setItem('isAuthenticated',JSON.stringify(true));

            if (Platform.OS === 'android') {
              ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
            }

            //If username present
            if(result.data.user.username) {
              navigation.dispatch(StackActions.replace('MainApp'));
            }
            else{
              navigation.navigate("UsernameScreen");
            }
          
          }).catch((err) => {
            console.log(err);
            
            if (Platform.OS === 'android') {
              ToastAndroid.show('Network Error', ToastAndroid.SHORT);
            }
          })
        }
    });
    }, []);

    async function onGoogleButtonPress() {
    // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }


    return (

      <LinearGradientComp
			  bgcolors={{
				  colorOne: "#2d3436",
				  colorTwo: "#000000",
			}}>

      {/* <KeyboardAvoidingView
        keyboardVerticalOffset={-height / 2}
        style={{flex: 1, alignItems: 'center'}}
        behavior="position"> */}
        

        {/* <View style={{backgroundColor:"white", paddingHorizontal: 10}}> */}
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              marginTop:height/5,
              margin:30,
              minHeight: height / 10,
              maxHeight: height / 2.5,
            }}>
            <View
              style={{flexDirection: 'column',marginBottom:50, alignItems:"center"}}> 
              <Image
                source={LOGO}
                style={{height:height/4, width: width/2, marginBottom: 50}}
              />
              <Text style={{
                  color:"white",
                  fontSize:26,
                  // marginRight: "5%",
                  letterSpacing:1,
                  marginBottom:20,
                  alignContent: "center",
                  fontWeight:"bold"
                }}>{"Welcome Aboard!"}</Text>
            </View>
            <View style={{
              justifyContent:"center",
              alignItems:'center'
            }}>
              <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={onGoogleButtonPress} 
              />

            </View>
          </View>
      </LinearGradientComp>
  );
};

export default LoginScreen;