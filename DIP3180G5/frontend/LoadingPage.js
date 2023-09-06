import React, { useEffect, useState } from "react";
import { View, ImageBackground, Image, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

const backgroundImage = require("../assets/background.png");
const logoImage = require("../assets/logo.png");

export default function LoadingPage() {
    const edges = useSafeAreaInsets();
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Function to load custom fonts
    /*const loadFonts = async () => {
        await Font.loadAsync({
            "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
            "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
            "Roboto-LightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
            // Add more font families as needed
        });
        setFontsLoaded(true); // Set the state to indicate that fonts have been loaded
    };*/

    useEffect(() => {
        //loadFonts();

        // Use setTimeout to navigate to the homepage after 5 seconds
        const timer = setTimeout(() => {
            navigation.navigate("LoginPage"); // Replace "Home" with the name of your homepage screen
        }, 5000); // 5000 milliseconds = 5 seconds

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (

        <ImageBackground source={backgroundImage} style={styles.container}>

            <View>
                <Image source={logoImage} style={styles.logo} />
            </View>
            <View style={styles.loadingContent}>
                <Text style={styles.loadingText}>Getting ready to drive deals {'\n'} your way, please wait</Text>
            </View>

        </ImageBackground>
    );
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