import React, { useEffect, useState } from "react";
import { View, ImageBackground, Image, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { SplashScreen } from "expo-splash-screen"; // Import SplashScreen

const backgroundImage = require("../assets/background.png");
const logoImage = require("../assets/logo.png");
const getFonts = () =>
    Font.loadAsync({
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-LightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
    })

export default function LoadingPage() {
    const edges = useSafeAreaInsets();
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [timeoutCompleted, setTimeoutCompleted] = useState(false);

    // Set a timeout to navigate to the login-screen after 5 seconds
    useEffect(() => {
        const timeout = setTimeout(() => {
            setTimeoutCompleted(true);
        }, 1000); //Change to 5000 in the future
        }, 1000); //Change to 5000 in the future

        // Clear the timeout if it's no longer needed
        return () => clearTimeout(timeout);
    }, []);

    // Check if the timeout has completed and navigate to the login-screen
    useEffect(() => {
        if (timeoutCompleted) {
            navigation.navigate("LoginPage");
        }
    }, [timeoutCompleted, navigation]);


    if (fontsLoaded) {
        return (
            <ImageBackground source={backgroundImage} style={styles.container}>

                <View>
                    <Image source={logoImage} style={styles.logo} />
                </View>
                <View style={styles.loadingContent}>
                    <Text style={styles.loadingText}>Getting ready to drive deals {'\n'} your way, please wait...</Text>
                </View>

            </ImageBackground>
        );
    } else {
        return (
            <Apploading
                startAsync={getFonts}
                onFinish={() => {
                    setFontsLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 199, // Adjust the width as needed
        height: 100, // Adjust the height as needed
    },
    loadingContent: {
        padding: 20,
        borderRadius: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 17,
        color: "#ffffff",
        textAlign: 'center',
        fontFamily: "Roboto-Regular",
    },
});