import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const OnboardingScreen = ({ navigation }) => {
    const slides = [
        {
            key: 's1',
            title: 'Ad free music and Offline Downloads',
            text: "Listen to the ad free music and download songs offline as many as you want",
            image: require("../../../assets/slide1.png")
        }
        , {
            key: 's2',
            title: 'In App Sharing',
            text: "Now share your favourite songs to your friends from within the app",
            image: require("../../../assets/slide2.png")
        },
        {
            key: 's3',
            title: 'Recommendations',
            text: "Now get recommendations for any song you wish to for",
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
        navigation.push("HomeScreen");
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
                        color: "black",
                        fontSize: 16,
                        fontFamily: "ProductSans"
                    }}>
                        Done
                </Text>
                </View>
            )}
            activeDotStyle={{ backgroundColor: "#BA68C8" }}
        />
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    slideContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontFamily: "IBMPlexSans-Bold",
        fontSize: 25,
        marginTop: 150,
        paddingHorizontal: 70,
        textAlign: "center"
    },
    text: {
        color: "black",
        fontSize: 14,
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
