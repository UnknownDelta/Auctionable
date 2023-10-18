import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './frontend/login-reg-page/registration-screen';
import LoginScreen from './frontend/login-reg-page/login-screen';
import ListingScreen from './frontend/listing-page/listing-screen';
import CreateListingScreen from './frontend/listing-page/create-listing-screen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './frontend/LoadingPage';
import LoginPage from './frontend/login-screen';
import ChatPage from './frontend/ChatPage';
import ChatConversation from './frontend/ChatConversation';
import HomePage from './frontend/HomeScreen';
import RegisterPage from './frontend/registration-screen';
import DetailsPage from './frontend/DetailsScreen';
import SettingsPage from './frontend/SettingsScreen';
import ProfilePage from './frontend/ProfileScreen';
import WishlistPage from './frontend/WishlistPage';
import { WishlistProvider } from './frontend/WishlistContext';
import {Amplify} from 'aws-amplify';
import {Auth,Hub} from 'aws-amplify'
import config from './src/aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(config)
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingPage from "./frontend/LoadingPage";
import LoginPage from "./frontend/login-screen";
import ChatPage from "./frontend/ChatPage";
import ChatConversation from "./frontend/ChatConversation";
import ListingCategoryScreen from "./frontend/listing-category-screen";
import ListingPage from "./frontend/listing-screen";
import HomePage from "./frontend/HomeScreen";
import RegisterPage from "./frontend/registration-screen";
import DetailsPage from "./frontend/DetailsScreen";
import WishlistPage from "./frontend/WishlistPage";
import createListPage from "./frontend/create-listing-screen";
import SettingsPage from "./frontend/SettingsScreen";
import ProfilePage from "./frontend/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WishlistProvider } from "./frontend/WishlistContext";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import TransactionScreen from "./frontend/TransactionScreen";

const Tab = createBottomTabNavigator();

const getFonts = () =>
  Font.loadAsync({
    Roboto_LightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
    RobotoCondensed_Regular: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
  });

const CustomListingTabIcon = ({ color, size }) => {
  return (
    <Image
      source={require("./assets/listingIcon.png")}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

const tabLabelStyle = {
  fontFamily: "RobotoCondensed_Regular", // Use the correct font family name
  fontSize: 13,
};

function getWidth() {
  let width = Dimensions.get("window").width;
  return width / 5;
}

function getHeight() {
  let height = Dimensions.get("window").height;
  return height;
}

function BottomTabScreens() {
  console.log("Test log outside handleTabPress"); // Add this line
  const isFocused = useIsFocused(); // Check if the screen is focused
  const [tabOffsetValue] = useState(new Animated.Value(0));
  //const tabBarHeight = useBottomTabBarHeight();
  const screenHeight = getHeight();

  return (
    <View style={{ flex: 1}}>
      <Tab.Navigator
        screenOptions={({ route, index }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Cart") {
              iconName = "ios-cart";
            } else if (route.name === "Listing") {
              return <CustomListingTabIcon color={color} size={size} />;
            } else if (route.name === "Chat") {
              iconName = "ios-chatbubbles";
            } else if (route.name === "Profile") {
              iconName = "ios-person";
            }

            const iconColor = focused ? "#0077B5" : "#BCE2F6";

            return <Ionicons name={iconName} color={iconColor} size={size} />;
          },
          tabBarActiveTintColor: "#0077B5",
          tabBarInactiveTintColor: "#BCE2F6",
          tabBarStyle: {
            backgroundColor: "white",
          },
          tabBarLabelStyle: tabLabelStyle,
          tabBarLabel: ({ focused, color }) => {
            const label = route.name;

            return (
              <Text
                style={{
                  color: focused ? "#0077B5" : "#AFABAB",
                  ...tabLabelStyle,
                }}
              >
                {label}
              </Text>
            );
          },
          headerShown:
            route.name == "Chat" ||
            route.name == "Cart" ||
            route.name == "Profile", //show only header for chat screen
          //Customize header style for the "Chat" screen
          headerBackground: () => (
            <ImageBackground
              source={require("./assets/header.png")}
              style={{ flex: 1 }}
              resizeMode="cover"
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
          listeners={({ route }) => ({
            tabPress: (e) => {
              console.log("Tab pressed:", route.name);
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: false,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Cart"
          component={WishlistPage}
          listeners={({ route }) => ({
            tabPress: (e) => {
              console.log("Tab pressed:", route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: false,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Listing"
          component={ListingStack}
          listeners={({ route }) => ({
            tabPress: (e) => {
              console.log("Tab pressed:", route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: false,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Chat"
          component={ChatPage}
          options={{ headerShown: true }}
          listeners={({ route }) => ({
            tabPress: (e) => {
              console.log("Tab pressed:", route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: false,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          listeners={({ route }) => ({
            tabPress: (e) => {
              console.log("Tab pressed:", route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: false,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      {isFocused && (
        <>
          <Animated.View
            style={{
              width: getWidth(),
              height: 2,
              backgroundColor: "#0077B5",
              position: "absolute",
              bottom: 77, //48
              //left: 50,
              borderRadius: 20,
              transform: [{ translateX: tabOffsetValue }],
            }}
          />
        </>
      )}
    </View>
  );
}

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue', // Change primary color to blue
  },
};


const App = () => {
  const [user, setUser] = useState(undefined)
  const checkUser = async () => {
    try{
    const authUser = await Auth.currentAuthenticatedUser({bypassCache:true})
    setUser(authUser)
    }
    catch(error){
      setUser(null)
    }
  }

  useEffect(()=>{
    const listener = (data) =>{
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut'){
        checkUser();
      }
    }
    Hub.listen('auth',listener)
    return () => Hub.remove('auth',listener)
  })
  
  useEffect(()=>{
    checkUser();
  },[])


  return (
    <PaperProvider theme={theme}>
    <WishlistProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="LoadingPage">
          {!user? (
            <>   
               <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
               <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
               <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }}/>
               <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
            </>
          ) :
          (
            <>
            <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }} />
            <Stack.Screen name="ChatConversation" component={ChatConversation} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="DetailsPage" component={DetailsPage} options={{ headerShown: false }} />
             <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
            <Stack.Screen name="WishlistPage" component={WishlistPage} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="CreateListingScreen" component={CreateListingScreen} options={{ headerShown: false}}/>
            </>
          )}
      
          </Stack.Navigator>
        </NavigationContainer>
    </WishlistProvider>
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});




//for old app.js for loadingpage and login page will integrate tgt soon
/*<NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingPage">
        <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>*/