import React, { useState } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const backgroundImage = require("../assets/background.png");

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });

const people = [
  { name: 'shaun', key: '1', imageSource: require("../assets/mercedes.jpg") },
  { name: 'yoshi', key: '2' },
  { name: 'mario', key: '3' },
  { name: 'luigi', key: '4' },
  { name: 'peach', key: '5' },
  { name: 'toad', key: '6' },
  { name: 'bowser', key: '7' },
];

const ListingScreen = () => {
  const [index, setIndex] = useState(0);
  const [fontsloaded, setFontsLoaded] = useState(false);

  const routes = [
    { key: 'current', title: 'Current Listings' },
    { key: 'past', title: 'Past Listings' },
  ];

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'current':
        return (
          <FlatList
            data={people}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.pinkBox}>
                <Image source={item.imageSource} style={styles.personImage} />
                <Text style={styles.listingText}>{item.name}</Text>
              </View>
            )}
          />
        );

      case 'past':
        return (
          <FlatList
            data={people}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.pinkBox}>
                <Image source={item.imageSource} style={styles.personImage} />
                <Text style={styles.listingText}>{item.name}</Text>
              </View>
            )}
          />
        );

      default:
        return null;
    }
  };

  if (fontsloaded) {
    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={styles.tabBar}
                labelStyle={styles.tabLabel}
                indicatorStyle={styles.tabIndicator}
              />
            )}
          />
        </SafeAreaView>
      </ImageBackground>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
};

const styles = StyleSheet.create({
  pinkBox: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    padding: 10,
    marginVertical: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabLabel: {
    color: 'white',
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
  listingText: {
    textAlign: 'right',
    fontFamily: 'roboto',
    color: 'white',
    marginLeft: 10,
  },
  personImage: {
    width: 70,
    height: 70,
    marginRight: 10
  }
});

export default ListingScreen
