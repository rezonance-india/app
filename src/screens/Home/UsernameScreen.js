import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
} from 'react-native';
import ImageColors from 'react-native-image-colors';

import LinearGradientComp from '../../components/Shared/LinearGradient';
import Btn from "../../components/Shared/Btn";
import InputBox from "../../components/Shared/InputBox"

//Constants
import { userApiUrl } from '../../constants/config';

//Assets
import LOGO from "../../../assets/rezonance-logo-blue-sq.png"
import BG from "../../../assets/bg.jpg"

import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const UsernameScreen = ({navigation}) => {
  const [username,setUsername] = useState('');
  const [submitting, isSubmitting] = useState(false);
  const [color,setColor] = useState("");

  const {user,updateUser} = useContext(GlobalContext);

  const  handleUsernameChange= (text) => setUsername(text);

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

  const handleUpdateUsername = () => {
    isSubmitting(true);
    axios.post(`${userApiUrl}/user/updateUsername`,{
        username,
        email:user.email,
      }).then(async (result) => {
        console.log(result.data,"data");
        isSubmitting(false);
        updateUser(result.data.user);
        await AsyncStorage.setItem('user', JSON.stringify(result.data.user));  
        if (Platform.OS === 'android') {
          ToastAndroid.show('Username added successfully', ToastAndroid.SHORT);
        }
        navigation.dispatch(StackActions.replace('MainApp'));   
      }).catch((err) => {
        console.log(err.response.data,"error");
        isSubmitting(false);
        if (Platform.OS === 'android') {
          ToastAndroid.show("network", ToastAndroid.SHORT);
        }
      })        
  };

  return (

      <LinearGradientComp
			  bgcolors={{
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
                }}>{"Add Username"}</Text>
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
              label="Username"
              value={username}
              onChangeText={handleUsernameChange}
              autoCapitalize={'none'}
              autoCompleteType={'username'}
            />

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
                title={"Submit"}
                loading={submitting}
                loadingText={"Loading"}
                onPress={handleUpdateUsername}
              />

            </View>
          </View>
      </LinearGradientComp>
  );
};

export default UsernameScreen;