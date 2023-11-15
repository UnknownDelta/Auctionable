import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChatList from '../frontend/ChatList';
import ListingScreen from '../frontend/listing-screen';
import HomeScreen from '../frontend/HomeScreen';
import ProfileScreen from '../frontend/ProfileScreen';
import WishlistScreen from '../frontend/WishlistPage';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const getFonts = () =>
    Font.loadAsync({
        Roboto_LightItalic: require("../assets/fonts/Roboto-LightItalic.ttf"),
        RobotoCondensed_Regular: require("../assets/fonts/RobotoCondensed-Regular.ttf"),
    });


function SellerScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ChatList />
            <StatusBar style="auto" />
        </View>
    );
}

function BuyerScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ChatList />
            <StatusBar style="auto" />
        </View>
    );
}

function ChatScreen() {
    return (
        <View style={{ flex: 1 }}>
            <TopTab.Navigator>
                <TopTab.Screen name="Seller" component={SellerScreen} />
                <TopTab.Screen name="Buyer" component={BuyerScreen} />
            </TopTab.Navigator>
            {/* Rest of your ChatScreen content */}
        </View>
    );
}

export default function Chat() {

    const [fontsloaded, setFontsLoaded] = useState(false);

    if (fontsloaded) {
        return (
            <ChatScreen />
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
    if (fontsloaded) {
        return (
            <ChatScreen />
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
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});