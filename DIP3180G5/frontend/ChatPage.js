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

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

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

function AuctionScreen() {
    return (
        <View style={styles.container}>
            <Text>Auction Screen</Text>
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
    const loadIoniconsFont = async () => {
        await useFonts({
            Ionicons: Ionicons.font,
        });
    };

    useEffect(() => {
        // Load the Ionicons font when the component mounts
        loadIoniconsFont();
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'ios-home';
                    } else if (route.name === 'Wishlist') {
                        iconName = 'ios-heart-outline';
                    } else if (route.name === 'Listing') {
                        iconName = 'ios-list';
                    } else if (route.name === 'Chat') {
                        iconName = 'ios-chatbubbles';
                    } else if (route.name === 'Profile') {
                        iconName = 'ios-person';
                    }

                    // Customize the icon color here based on the route name
                    let tabColor = 'white'; // Default color
                    return <Ionicons name={iconName} color={color} size={size} />;
                },
                tabBarActiveTintColor: '#84EFDB', // Set active tab color
                tabBarInactiveTintColor: 'white',  // Set inactive tab color
                tabBarStyle: {
                    backgroundColor: '#0077B5', // Set background color of the entire bottom tab navigator
                },
                /*headerStyle: {
                    backgroundColor: 'black', // Set the background color of the header #BFE1E39
                },*/
                // Customize header style for the "Chat" screen
                headerBackground: () => (
                    <ImageBackground
                        source={require('../assets/header.png')}
                        style={{ flex: 1 }}
                        resizeMode="cover"
                    />
                ),
                headerShown: route.name == 'Chat' || route.name == 'Wishlist', //show only header for chat screen
                //headerShown: route.name == 'Wishlist',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Listing" component={ListingScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            {/* Add more tab screens if needed */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});