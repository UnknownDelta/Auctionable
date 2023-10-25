import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, Animated } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './frontend/LoadingPage';
import LoginPage from './frontend/login-screen';
import ChatPage from './frontend/ChatPage';
import ChatConversation from './frontend/ChatConversation';
import ListingPage from './frontend/listing-screen';
import HomePage from './frontend/HomeScreen';
import RegisterPage from './frontend/registration-screen';
import DetailsPage from './frontend/DetailsScreen';
import SettingsPage from './frontend/SettingsScreen';
import ProfilePage from './frontend/ProfileScreen';
import WishlistPage from './frontend/WishlistPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WishlistProvider } from './frontend/WishlistContext';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import TransactionScreen from './frontend/TransactionScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

const Tab = createBottomTabNavigator();

const getFonts = () =>
  Font.loadAsync({
    Roboto_LightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
    RobotoCondensed_Regular: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
  });

const CustomListingTabIcon = ({ color, size }) => {

  return (
    <Image
      source={require('./assets/listingIcon.png')}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

const tabLabelStyle = {
  fontFamily: 'RobotoCondensed_Regular', // Use the correct font family name
  fontSize: 13,
};

function getWidth() {
  let width = Dimensions.get("window").width
  return width / 5
}

function BottomTabScreens() {

  console.log('Test log outside handleTabPress'); // Add this line
  const isFocused = useIsFocused(); // Check if the screen is focused
  const [tabOffsetValue] = useState(new Animated.Value(0));
  //const tabBarHeight = useBottomTabBarHeight();


  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route, index }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'ios-home';
            } else if (route.name === 'Cart') {
              iconName = 'ios-cart';
            } else if (route.name === 'Listing') {
              return <CustomListingTabIcon color={color} size={size} />;
            } else if (route.name === 'Chat') {
              iconName = 'ios-chatbubbles';
            } else if (route.name === 'Profile') {
              iconName = 'ios-person';
            }

            const iconColor = focused ? '#0077B5' : '#BCE2F6';

            return <Ionicons name={iconName} color={iconColor} size={size} />;
          },
          tabBarActiveTintColor: '#0077B5',
          tabBarInactiveTintColor: '#BCE2F6',
          tabBarStyle: {
            backgroundColor: 'white',
          },
          tabBarLabelStyle: tabLabelStyle,
          tabBarLabel: ({ focused, color }) => {
            const label = route.name;

            return (
              <Text style={{ color: focused ? '#0077B5' : '#AFABAB', ...tabLabelStyle }}>
                {label}
              </Text>
            );
          },
          headerShown: route.name == 'Chat' || route.name == 'Cart' || route.name == 'Profile', //show only header for chat screen
          // Customize header style for the "Chat" screen
          headerBackground: () => (
            <ImageBackground
              source={require('./assets/header.png')}
              style={{ flex: 1 }}
              resizeMode="cover"
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} listeners={({ route }) => ({
          tabPress: e => {
            console.log('Tab pressed:', route.name);
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: false,
            }).start();
          },
        })} />
        <Tab.Screen name="Cart" component={WishlistPage} listeners={({ route }) => ({
          tabPress: e => {
            console.log('Tab pressed:', route.name);
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: false,
            }).start();
          },
        })} />
        <Tab.Screen name="Listing" component={ListingPage} listeners={({ route }) => ({
          tabPress: e => {
            console.log('Tab pressed:', route.name);
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: false,
            }).start();
          },
        })} />
        <Tab.Screen name="Chat" component={ChatPage} options={{ headerShown: true }}
          listeners={({ route }) => ({
            tabPress: e => {
              console.log('Tab pressed:', route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: false,
              }).start();
            },
          })} />
        <Tab.Screen name="Profile" component={ProfilePage}
          listeners={({ route }) => ({
            tabPress: e => {
              console.log('Tab pressed:', route.name);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: false,
              }).start();
            },
          })} />

      </Tab.Navigator>
      {isFocused && (
        <>
          <Animated.View
            style={{
              width: getWidth(),
              height: 2,
              backgroundColor: '#0077B5',
              position: 'absolute',
              bottom: 48, //48
              //left: 50,
              borderRadius: 20,
              transform: [
                { translateX: tabOffsetValue }
              ]
            }}
          />
        </>
      )}
    </View>
  );
}

const Stack = createStackNavigator();

function NonBottomTabScreens() {
  return (
    <Stack.Navigator initialRouteName="LoadingPage">
      <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


function Home() {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false, // Hide the header by default
      }}
    >
      <Stack.Screen
        name="HomePage"
        component={HomePage} />
      <Stack.Screen
        name="DetailsPage"
        component={DetailsPage} />
    </Stack.Navigator>
  );
}

export default function App() {

  //const isFocused = useIsFocused(); // Check if the screen is focused
  const [fontsloaded, setFontsLoaded] = useState(false);
  //const tabOffsetValue = useRef(new Animated.Value(0)).current; // Move this line to the top-level


  if (fontsloaded) {
    return (
      <StripeProvider publishableKey="pk_test_51NurNTAkVZ2pxoDv1HmWag8YA9QvKT4uqOxX4kgkvoVXH3TJYY2ZqV0VdSnslxtGlEn8BlAIPzKLeZOYGeL6Z2oj00iVdQpg3U">
        <WishlistProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="NonBottomTabScreens" component={NonBottomTabScreens} />
              <Stack.Screen name="BottomTabScreens" component={BottomTabScreens} screenOptions={{
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                }
              }} />
              <Stack.Screen name="ChatConversation" component={ChatConversation} />
              <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </WishlistProvider>
      </StripeProvider>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});