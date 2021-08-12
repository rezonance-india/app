import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const OnboardingScreen = ({ navigation }) => {
    const slides = [
        {
            key: 's1',
            title: 'Ad Free Music',
            text: "Listen to ad free music and download songs without any hidden costs",
            image: require("../../../assets/slide1.png")
        }
        , {
            key: 's2',
            title: 'In App Sharing',
            text: "Share your favourite songs with friends, within the app",
            image: require("../../../assets/slide2.png")
        },
        {
            key: 's3',
            title: 'Recommendations',
            text: "Get recommendations for any song you wish for",
            image: require("../../../assets/slide2.png")
        }
    ];

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.slideContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.imagecontainer}>
                    <Image style={styles.image} source={item.image} />
                </View>
            </View>
        );
    }

    const _onDone = () => {
        console.log("I m here")
        navigation.navigate("LoginScreen");
    };

    return (
        <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            onDone={_onDone}
            renderDoneButton={() => (
                <View style={{
                    alignItems: "center",
                    backgroundColor: "#BA68C8",
                    width: 70,
                    height: 40,
                    justifyContent: "space-around",
                    borderRadius: 10,
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        fontFamily: "ProductSans"
                    }}>
                        Done
                </Text>
                </View>
            )}
            activeDotStyle={{ backgroundColor: "#BA68C8" }}
            dotStyle={{ backgroundColor: "grey" }}
        />
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    slideContainer: {
        backgroundColor: "#000000",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontFamily: "IBMPlexSans-Bold",
        fontSize: 35,
        fontWeight: 'bold',
        color: "white",
        marginTop: 150,
        paddingHorizontal: 65,
        textAlign: "center"
    },
    text: {
        color: "white",
        fontSize: 18,
        opacity: 60,
        fontFamily: "IBMPlexSans-Regular",
        marginTop: 20,
        paddingHorizontal: 80,
        textAlign: "center"
    },
    imagecontainer: {
        marginTop: 100
    },
    image: {
        width: 300,
        height: 300
    }
});
