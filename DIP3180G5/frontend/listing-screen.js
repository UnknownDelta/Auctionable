import React , {useState} from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from 'react-native-vector-icons'; // or any other icon library
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';

const backgroundImage = require('../assets/background3.png');

const TopTab = createMaterialTopTabNavigator();

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf")
  });

const CurrentTabContent = () => {

const navigation = useNavigation();

const [fontsloaded, setFontsLoaded] = useState(false);
const sell = [
  { 
    name: 'Mercedes-Benz S-Class', 
    key: '1', 
    imageSource: require("../assets/mercedes.jpg"),
    condition: 'Used',
    price: 10000
  },
  { 
    name: 'BMW 3 Series', 
    key: '2',
    imageSource: require("../assets/bmw.jpg"),
    condition: 'New',
    price: 15000
  },
  { 
    name: 'Ford Mustang', 
    key: '3',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '4',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '5',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '6',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '7',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
];

const auction = [
  { 
    name: 'Mercedes-Benz S-Class', 
    key: '1', 
    imageSource: require("../assets/mercedes.jpg"),
    condition: 'Used',
    price: 10000
  },
  { 
    name: 'BMW 3 Series', 
    key: '2',
    imageSource: require("../assets/bmw.jpg"),
    condition: 'New',
    price: 15000
  },
  { 
    name: 'Ford Mustang', 
    key: '3',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '4',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '5',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '6',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
  { 
    name: 'Ford Mustang', 
    key: '7',
    imageSource: require("../assets/ford.jpg"),
    condition: 'New',
    price: 7500
  },
];

const combinedList = [
  { key: 'sellHeader', status: 'SellHeader', order: 1 }, // Placeholder for the 'SELL' text
  ...sell.map(item => ({ ...item, status: 'Sell', order: 2 })),
  { key: 'auctionHeader', status: 'AuctionHeader', order: 3 }, // Placeholder for the 'AUCTION' text
  ...auction.map(item => ({ ...item, status: 'Auction', order: 4 })),
];

// Sort the combined array based on the specified order
combinedList.sort((a, b) => a.order - b.order);

// Render the list in FlatList
if (fontsloaded) {
  return (
    <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
      <FlatList 
  data={combinedList}
  keyExtractor={(item) => item.key}
  renderItem={({ item }) => (
    <View style={styles.container}>
      {item.status === 'SellHeader' || item.status === 'AuctionHeader' ? (
        <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {item.status === 'SellHeader' ? 'SELL' : 'AUCTION'}
        </Text>
        </View>
      ) : (
        <View style={styles.pinkBoxContainer}>
          <View style={styles.pinkBox}>
            <Image source={item.imageSource} style={styles.personImage} />
            <Text style={styles.listingText}>{item.name}</Text>
            <Text style={styles.listingText}>{item.condition}</Text>
            <Text style={styles.listingText}>{item.price}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditFormScreen', { itemData: item })}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )}
  numColumns={2}
/>
    </View>
  );
} else {
  return (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => {
        setFontsLoaded(true);
      }}
      onError={console.warn}
    />
  );
}
};
  

const PastTabContent = () => {

  const navigation = useNavigation();
  
  const [fontsloaded, setFontsLoaded] = useState(false);
  const sold = [
    { 
      name: 'Mercedes-Benz S-Class', 
      key: '1', 
      imageSource: require("../assets/mercedes.jpg"),
      condition: 'Used',
      price: 10000
    },
    { 
      name: 'BMW 3 Series', 
      key: '2',
      imageSource: require("../assets/bmw.jpg"),
      condition: 'New',
      price: 15000
    },
    { 
      name: 'Ford Mustang', 
      key: '3',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '4',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '5',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '6',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '7',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
  ];
  
  const auctioned = [
    { 
      name: 'Mercedes-Benz S-Class', 
      key: '1', 
      imageSource: require("../assets/mercedes.jpg"),
      condition: 'Used',
      price: 10000
    },
    { 
      name: 'BMW 3 Series', 
      key: '2',
      imageSource: require("../assets/bmw.jpg"),
      condition: 'New',
      price: 15000
    },
    { 
      name: 'Ford Mustang', 
      key: '3',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '4',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '5',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '6',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
    { 
      name: 'Ford Mustang', 
      key: '7',
      imageSource: require("../assets/ford.jpg"),
      condition: 'New',
      price: 7500
    },
  ];
     
    if (fontsloaded) {
      return (
        <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>Sold</Text>
        <FlatList 
          data={sold}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.pinkBox}>
              <Image source={item.imageSource} style={[styles.personImage, { alignSelf: 'center' }]} />
              <Text style={styles.listingText}>{item.name}</Text>
              <Text style={styles.listingText}>{item.condition}</Text>
              <Text style={styles.listingText}>{item.price}</Text>
              <View style={styles.editButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditFormScreen', { itemData: item })}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          numColumns={2}
        /><Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>Auction</Text>
        <FlatList 
          data={auctioned}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.pinkBox}>
              <Image source={item.imageSource} style={[styles.personImage, { alignSelf: 'center' }]} />
              <Text style={styles.listingText}>{item.name}</Text>
              <Text style={styles.listingText}>{item.condition}</Text>
              <Text style={styles.listingText}>{item.price}</Text>
              <View style={styles.editButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditFormScreen', { itemData: item })}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          numColumns={2}
        />
        </View>
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
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 15, 
    flexDirection:'column',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: (Dimensions.get('window').width - 32) / 2
  },
  listingText: {
    fontFamily:'roboto',
    color:'black',
    marginTop:10,
    textAlign: "left",
  },
  personImage: {
    width:160,
    height:160,
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 5, // Adjust this value to position the button as desired
    right: 5, // Adjust this value to position the button as desired
    backgroundColor: 'transparent',
  },
  editButtonText: {
    color: 'blue',
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50, // Increase the border radius to make it larger
    width: 55, // Adjust the width and height as needed
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pinkBoxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function ListingScreen() {

  const navigation = useNavigation();

    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1}}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10}}>My Listings</Text>
          </View>
          <TopTab.Navigator tabBarOptions={{ style: { backgroundColor: '#bfdee9' }}}>
            <TopTab.Screen name="Current" component={CurrentTabContent} options={{ tabBarIndicatorStyle: { backgroundColor: '#0077B5'} }} />
                <TopTab.Screen
                  name="Past"
                  component={PastTabContent}
                  options={{
                    tabBarIndicatorStyle: {
                      backgroundColor: '#0077B5', // Set your desired highlight color
                    },
                  }}
                />
              </TopTab.Navigator>
              <View style={styles.plusButtonContainer}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => navigation.navigate('ListingCategoryScreen')}
            >
              <FontAwesome name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>
      </ImageBackground>
    );
}

export default ListingScreen;