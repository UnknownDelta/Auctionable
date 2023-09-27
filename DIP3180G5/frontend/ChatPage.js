import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatList from '../frontend/ChatList';

import Avatar from '../assets/avatar.jpg'

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

//For Testing Pages
function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <StatusBar style="auto" />
        </View>
    );
}

function CartScreen() {
    return (
        <View style={styles.container}>
            <Text>Cart Screen</Text>
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

function ListingScreen() {
    return (
        <View style={styles.container}>
            <Text>My Listing Screen</Text>
            <StatusBar style="auto" />
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <StatusBar style="auto" />
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
                    } else if (route.name === 'Cart') {
                        iconName = 'ios-cart';
                    } else if (route.name === 'Listing') {
                        iconName = 'ios-list';
                    } else if (route.name === 'Chat') {
                        iconName = 'ios-chatbubbles';
                    } else if (route.name === 'Profile') {
                        iconName = 'ios-person';
                    }

                    // Customize the icon color here based on the route name
                    let tabColor = 'white'; // Default color
                    return <Ionicons name={iconName} color={tabColor} size={size} />;
                },
                tabBarActiveTintColor: '#84EFDB', // Set active tab color
                tabBarInactiveTintColor: 'white',  // Set inactive tab color
                tabBarStyle: {
                    backgroundColor: '#0077B5', // Set background color of the entire bottom tab navigator
                },
                headerStyle: {
                    backgroundColor: '#BFE1E39', // Set the background color of the header
                },
                headerShown: route.name == 'Chat' //show only header for chat screen
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
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