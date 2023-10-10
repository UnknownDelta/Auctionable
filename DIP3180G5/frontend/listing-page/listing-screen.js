import React , {useState} from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from 'react-native-vector-icons'; // or any other icon library
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const backgroundImage = require('./assets/background2.png');

const TopTab = createMaterialTopTabNavigator();

const getFonts = () =>
  Font.loadAsync({
    roboto: require("./assets/Roboto-Regular.ttf"),
  });

const people = [
  { name: 'shaun', key: '1', imageSource: require("./assets/mercedes.jpg") },
  { name: 'yoshi', key: '2' },
  { name: 'mario', key: '3' },
  { name: 'luigi', key: '4' },
  { name: 'peach', key: '5' },
  { name: 'toad', key: '6' },
  { name: 'bowser', key: '7' },
];

const styles = StyleSheet.create({
    pinkBox: {
      backgroundColor: 'transparent',
      borderColor: 'black',
      borderWidth: 2,
      padding: 10,
      marginVertical: 10,
      borderRadius: 8,
      paddingHorizontal: 15, 
      flexDirection:'row',
      alignItems:'center',
      marginHorizontal:10,
    },
    listingText: {
      textAlign: 'right',
      fontFamily:'roboto',
      color:'black',
      marginLeft:10,
    },
    personImage: {
      width:70,
      height:70,
      marginRight: 10
    }
  });

const CurrentTabContent = () => {

const [fontsloaded, setFontsLoaded] = useState(false);
const people = [
    { name: 'shaun', key: '1', imageSource: require("./assets/mercedes.jpg") },
    { name: 'yoshi', key: '2' },
    { name: 'mario', key: '3' },
    { name: 'luigi', key: '4' },
    { name: 'peach', key: '5' },
    { name: 'toad', key: '6' },
    { name: 'bowser', key: '7' },
  ];

    if (fontsloaded) {
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
                style={{ backgroundColor: 'white' }}
            />
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

function ListingScreen() {

const navigation = useNavigation();

    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1}}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>My Listings</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateListingScreen')} style={{ marginRight:10}}>
                        <FontAwesome name="plus" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                    <TopTab.Navigator tabBarOptions={{ style: { backgroundColor: 'transparent' },}}>
                        <TopTab.Screen name="Current" component={CurrentTabContent} />
                        <TopTab.Screen name="Past" component={CurrentTabContent} />
                    </TopTab.Navigator>
            </SafeAreaView>
        </ImageBackground>
    );
}

export default ListingScreen;