import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  ImageBackground,
} from "react-native";
import React, { useState,useRef ,useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingPage from "./frontend/LoadingPage";
import LoginPage from "./frontend/login-screen";
import ChatPage from "./frontend/ChatPage";
import ChatConversation from "./frontend/ChatConversation";
import ListingCategoryScreen from "./frontend/listing-category-screen";
import ListingPage from "./frontend/listing-screen";
import HomePage from "./frontend/HomeScreen";
import RegisterPage from "./frontend/RegistrationScreen";
import DetailsPage from "./frontend/DetailsScreen";
import WishlistPage from "./frontend/WishlistPage";
import createListPage from "./frontend/create-listing-screen";
import CreateAuctionScreen from "./frontend/create-auction-screen";
import ProfilePage from "./frontend/ProfileScreen";
import AuctionListPage from "./frontend/AuctionList";
import AuctionDetailsPage from "./frontend/AuctionDetails";
import PurchaseHistoryPage from "./frontend/PurchasePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WishlistProvider } from "./frontend/WishlistContext";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import TransactionScreen from "./frontend/TransactionScreen";
import AuctionSuccessPage from "./frontend/AuctionSuccess";
import ProfileAuctionPage from "./frontend/ProfileAuction";
import ProfileSettingsPage from "./frontend/ProfileSettings";
import CheckoutPage from "./frontend/CheckoutPage";
import TransactionAuctionPage from "./frontend/TransactionAuction";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import CostBreakdownPage from "./frontend/CostBreakdown";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import NotificationMain from "./frontend/NotificationMain";
import NotificationOutbid from "./frontend/NotificationOutbid";
import ReviewListingScreen from "./frontend/review-listing-screen";


function BottomTabScreens({route}) {
  console.log("Test log outside handleTabPress"); // Add this line
  const isFocused = useIsFocused(); // Check if the screen is focused
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

  const routeName = getFocusedRouteNameFromRoute(route);
  useEffect(() => {
    handleTabPress(routeName);
  }, [routeName]);

  console.log('Currently focused tab:', routeName);

  const tabOffsetValues = {
    Home: 0,
    Listing: getWidth(),
    Auction: getWidth() * 2,
    Chat: getWidth() * 3,
    Profile: getWidth() * 4,
  };

  const handleTabPress = (routeName) => {
    console.log("Tab pressed:", routeName);
    Animated.spring(tabOffsetValue, {
      toValue: tabOffsetValues[routeName],
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route, index }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Profile") {
              iconName = "ios-person";
            } else if (route.name === "Listing") {
              return <CustomListingTabIcon color={color} size={size} />;
            } else if (route.name === "Chat") {
              iconName = "ios-chatbubbles";
            } else if (route.name === "Auction") {
              return <CustomListingTabIconAuction color={color} size={size} />;
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
         listeners={() => ({
          tabPress: () => handleTabPress("Home"),
         })}
        />
        <Tab.Screen
          name="Listing"
          component={ListingStack}
          listeners={() => ({
            tabPress: () => handleTabPress("Listing"),
          })}
        />
        <Tab.Screen
          name="Auction"
          component={AuctionStack}
          listeners={() => ({
            tabPress: () => handleTabPress("Auction"),
          })}
        />
        <Tab.Screen
          name="Chat"
          component={ChatPage}
          listeners={() => ({
            tabPress: () => handleTabPress("Chat"),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          listeners={() => ({
            tabPress: () => handleTabPress("Profile"),
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
              transform: [{ translateX: tabOffsetValue}],
            }}
          />
        </>
      )}
    </View>
  );
}


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

const CustomListingTabIconAuction = ({ color, size }) => {
  return (
    <Image
      source={require("./assets/auction_logo.png")}
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

const GradientText = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={["#0077B5", "#00A859"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

const ProfileHeader = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("./assets/Aquasama.png")}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <GradientText style={{ marginLeft: 10, fontSize: 20 }}>
        Insert Name
      </GradientText>
    </View>
  );
};

const Stack = createStackNavigator();

function NonBottomTabScreens() {
  return (
    <Stack.Navigator initialRouteName="LoadingPage">
      <Stack.Screen
        name="LoadingPage"
        component={LoadingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false, // Hide the header by default
      }}
    >
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="DetailsPage" component={DetailsPage} />
      <Stack.Screen
        name="WishlistPage"
        component={WishlistPage}
        options={{
          headerShown: true,
          title: "Cart",
          headerStyle: {
            backgroundColor: "#BFE1E4", // Change the background color
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ListingStack() {
  return (
    <Stack.Navigator
      initialRouteName="ListingPage"
      screenOptions={{
        headerShown: false, // Hide the header by default
      }}
    >
      <Stack.Screen name="ListingPage" component={ListingPage} />
      <Stack.Screen name="createListPage" component={createListPage} />
      <Stack.Screen
        name="ListingCategoryScreen"
        component={ListingCategoryScreen}
      />
      <Stack.Screen name="CreateAuctionScreen" component={CreateAuctionScreen} />
      <Stack.Screen name="ReviewListingScreen" component={ReviewListingScreen} />
    </Stack.Navigator>
  );
}

function AuctionStack() {
  return (
    <Stack.Navigator
      initialRouteName="AuctionListPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuctionListPage" component={AuctionListPage} />
      <Stack.Screen name="AuctionDetailsPage" component={AuctionDetailsPage} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen
        name="PurchaseHistoryPage"
        component={PurchaseHistoryPage}
      />
      <Stack.Screen name="ProfileAuctionPage" component={ProfileAuctionPage} />
      <Stack.Screen
        name="ProfileSettingsPage"
        component={ProfileSettingsPage}
      />
      <Stack.Screen
        name="NotificationMain"
        component={NotificationMain}
      />
      <Stack.Screen
        name="NotificationOutbid"
        component={NotificationOutbid}
      />
      <Stack.Screen
        name="EditPasswordScreen"
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);

  if (fontsloaded) {
    return (
      <WishlistProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="NonBottomTabScreens"
              component={NonBottomTabScreens}
            />
            <Stack.Screen
              name="BottomTabScreens"
              component={BottomTabScreens}
              screenOptions={{
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="ChatConversation"
              component={ChatConversation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TransactionScreen"
              component={TransactionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AuctionSuccessPage"
              component={AuctionSuccessPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CheckoutPage"
              component={CheckoutPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TransactionAuctionPage"
              component={TransactionAuctionPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CostBreakdownPage"
              component={CostBreakdownPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </WishlistProvider>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
