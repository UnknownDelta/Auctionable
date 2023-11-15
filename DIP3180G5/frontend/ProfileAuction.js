import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PastAuctionList from "../frontend/PastAuctionList";
import CurrentAuctionList from "../frontend/CurrentAuctionList";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createMaterialTopTabNavigator();

function CurrentAuctionsScreen() {
  // Your content for the "Auctions" tab
  return (
    <View style={styles.contentContainer}>
      <CurrentAuctionList />
    </View>
  );
}

function PastAuctionsScreen() {
  // Your content for other tabs
  return (
    <View style={styles.contentContainer}>
      <PastAuctionList />
    </View>
  );
}

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5FA" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Auctions</Text>
        <Tab.Navigator
          screenOptions={{ tabBarStyle: { backgroundColor: "#F5F5FA" } }}
        >
          <Tab.Screen name="Current" component={CurrentAuctionsScreen} />
          <Tab.Screen name="Past" component={PastAuctionsScreen} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F5F5FA", // Change the content container color here
  },
  linearBar: {
    height: 20, // Set the height of the linear gradient bar
    width: "100%", // Set the width to 100% or your desired width
  },
});

export default ProfileScreen;
import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PastAuctionList from "../frontend/PastAuctionList";
import CurrentAuctionList from "../frontend/CurrentAuctionList";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createMaterialTopTabNavigator();

function CurrentAuctionsScreen() {
  // Your content for the "Auctions" tab
  return (
    <View style={styles.contentContainer}>
      <CurrentAuctionList />
    </View>
  );
}

function PastAuctionsScreen() {
  // Your content for other tabs
  return (
    <View style={styles.contentContainer}>
      <PastAuctionList />
    </View>
  );
}

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5FA" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Auctions</Text>
        <Tab.Navigator
          screenOptions={{ tabBarStyle: { backgroundColor: "#F5F5FA" } }}
        >
          <Tab.Screen name="Current" component={CurrentAuctionsScreen} />
          <Tab.Screen name="Past" component={PastAuctionsScreen} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F5F5FA", // Change the content container color here
  },
  linearBar: {
    height: 20, // Set the height of the linear gradient bar
    width: "100%", // Set the width to 100% or your desired width
  },
});

export default ProfileScreen;
