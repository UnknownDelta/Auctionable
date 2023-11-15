import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../src/components/card';

export default function BuyScreen({ route }) {
  // pressHandler is for button
  // const pressHandler = () => {
  //   navigation.goBack(); // pops the screen off the stack
  // }
  return (
    // <View style={globalStyles.container}>
    //   {/* <Text>Buy Screen</Text> */}
    //   <StatusBar style="auto" />
    //   <Text style={globalStyles.titleText}>Buy Screen</Text>
    //   <Button title='back to home screen' onPress={pressHandler} />
    // </View>
    <View style={globalStyles.container}>
      <Card>
      <Image
        source={{ uri: route.params.images[0] }} // Set the source prop to the image URL
        style={{
          width: (Dimensions.get('window').width * 0.8), // xx% of the screen width
          height: (Dimensions.get('window').width * 0.4), //xx% of the screen height
        }}
      />
      <Text style={globalStyles.priceText}>${ route.params.price }</Text>
      <Text style={globalStyles.titleText}>{ route.params.brand } { route.params.model }</Text>
      <Text style={globalStyles.itemText}>Mileage: { route.params.mileage }</Text>
      <Text style={globalStyles.itemText}>Registration Date: { route.params.registration_date }</Text>
      <Text style={globalStyles.itemText}>Years used: { route.params.years_used } years</Text>
      {/* <Text style={globalStyles.itemText}>Past Owners: { route.params.pastOwners }</Text> */}
      {/* <Text style={globalStyles.itemText}>Seats: { route.params.seats }</Text> */}
      {/* <Text style={globalStyles.itemText}>Transmission: { route.params.transmission }</Text> */}
      <Text style={globalStyles.itemText}>Fuel Type: { route.params.fuelType }</Text>
      <Text style={globalStyles.itemText}>Category: { route.params.category }</Text>
      <Text style={globalStyles.itemText}>Description: { route.params.description }</Text>
      </Card>
    </View>
  );
}