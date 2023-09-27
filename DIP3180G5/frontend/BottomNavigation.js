import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../frontend/HomePage'
import CartScreen from '../frontend/CartPage';
import ListingScreen from '../frontend/ListingPage';
import ChatScreen from '../frontend/ChatPage';
import ProfileScreen from '../frontend/ProfilePage';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
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
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Listing" component={ListingScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
    );
}