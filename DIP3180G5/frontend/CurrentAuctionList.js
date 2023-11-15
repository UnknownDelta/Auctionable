// PastAuctionsList.js
import React from 'react';
import { FlatList, Text, View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const data = [
  { id: '1', title: 'Tesla X' ,image: require("../assets/teslacar.jpeg"), bid: '$53,000', time:'7:09:15',result:'highest'},
  { id: '2', title: 'Honda Civic' ,image: require("../assets/honda.png"), bid: '$76,900', time:'16:21:23',result:'not highest'},
  // Add more items as needed
];

const CurrentAuctionsList = () => {
  
const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.contentContainer}>
            <Image source={item.image} style={styles.image} /> 
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>Highest Bid:</Text>
                <Text style={styles.bidText}>{item.bid}</Text>
                <Text style={styles.textHeader}>Ended in:</Text>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
          {item.result === 'not highest' ? (
            <View>
            <Text style={{ paddingTop: 10, color: '#B50000', textAlign: 'center' ,fontWeight:'bold',fontSize:12,paddingBottom:5}}>
              You are currently not the highest bidder :(
            </Text>
            <TouchableOpacity style={styles.overbidButton}>
            <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Overbid Now!</Text>
          </TouchableOpacity>
            </View>
          ) : (
            <View>
            <Text style={{ paddingTop: 10, color: '#0077B5', textAlign: 'center',fontWeight:'bold',fontSize:12,paddingBottom:5}}>
              You are the currently the highest bidder!
            </Text>
            <TouchableOpacity style={styles.visitButton} onPress={() => navigation.navigate('Auction',{screen:"AuctionDetailsPage"})}>
            <Text style={{textAlign:"center",color:"white"}}>Visit Auction Now!</Text>
          </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    elevation:5,
  },
  image: {
    width: 150, // Adjust the width and height as needed
    height: 100,
    marginRight: 10, // Add some margin to separate the title and image
  },
  contentContainer: {
    flex: 1, // Allow the text to expand and take available space
    flexDirection:"row",
  },
  bidText: {
    fontSize: 20, // Customize the style for additional text
    color: '#0077B5', // Adjust text color as needed
  },
  timeText:{
    fontSize: 20, // Customize the style for additional text
    color: '#D50808', // Adjust text color as needed
  },
  textHeader: {
    fontWeight:'bold',
    fontSize: 12, // Customize the style for additional text
    color: '#5D5B5B', // Adjust text color as needed
  },
  textContainer:{
    flexDirection:"column",
    justifyContent:"space-between",
  },
  visitButton: {
    backgroundColor: '#0077B5', // Background color of the button
    borderRadius: 8,
    padding: 8,
    width: 150, // Specify the width of the button
    marginTop: 5,
    alignSelf:'center',
  },
  overbidButton: {
    backgroundColor: '#D50808', // Background color of the button
    borderRadius: 8,
    padding: 8,
    width: 150, // Specify the width of the button
    marginTop: 5,
    alignSelf:'center',
  },
  itemTitle:{
    fontSize:20,
    color: '#5D5B5B',
    paddingBottom:10,
  },
});

export default CurrentAuctionsList;
// PastAuctionsList.js
import React from 'react';
import { FlatList, Text, View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const data = [
  { id: '1', title: 'Tesla X' ,image: require("../assets/teslacar.jpeg"), bid: '$53,000', time:'7:09:15',result:'highest'},
  { id: '2', title: 'Honda Civic' ,image: require("../assets/honda.png"), bid: '$76,900', time:'16:21:23',result:'not highest'},
  // Add more items as needed
];

const CurrentAuctionsList = () => {
  
const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.contentContainer}>
            <Image source={item.image} style={styles.image} /> 
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>Highest Bid:</Text>
                <Text style={styles.bidText}>{item.bid}</Text>
                <Text style={styles.textHeader}>Ended in:</Text>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
          {item.result === 'not highest' ? (
            <View>
            <Text style={{ paddingTop: 10, color: '#B50000', textAlign: 'center' ,fontWeight:'bold',fontSize:12,paddingBottom:5}}>
              You are currently not the highest bidder :(
            </Text>
            <TouchableOpacity style={styles.overbidButton}>
            <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Overbid Now!</Text>
          </TouchableOpacity>
            </View>
          ) : (
            <View>
            <Text style={{ paddingTop: 10, color: '#0077B5', textAlign: 'center',fontWeight:'bold',fontSize:12,paddingBottom:5}}>
              You are the currently the highest bidder!
            </Text>
            <TouchableOpacity style={styles.visitButton} onPress={() => navigation.navigate('Auction',{screen:"AuctionDetailsPage"})}>
            <Text style={{textAlign:"center",color:"white"}}>Visit Auction Now!</Text>
          </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    elevation:5,
  },
  image: {
    width: 150, // Adjust the width and height as needed
    height: 100,
    marginRight: 10, // Add some margin to separate the title and image
  },
  contentContainer: {
    flex: 1, // Allow the text to expand and take available space
    flexDirection:"row",
  },
  bidText: {
    fontSize: 20, // Customize the style for additional text
    color: '#0077B5', // Adjust text color as needed
  },
  timeText:{
    fontSize: 20, // Customize the style for additional text
    color: '#D50808', // Adjust text color as needed
  },
  textHeader: {
    fontWeight:'bold',
    fontSize: 12, // Customize the style for additional text
    color: '#5D5B5B', // Adjust text color as needed
  },
  textContainer:{
    flexDirection:"column",
    justifyContent:"space-between",
  },
  visitButton: {
    backgroundColor: '#0077B5', // Background color of the button
    borderRadius: 8,
    padding: 8,
    width: 150, // Specify the width of the button
    marginTop: 5,
    alignSelf:'center',
  },
  overbidButton: {
    backgroundColor: '#D50808', // Background color of the button
    borderRadius: 8,
    padding: 8,
    width: 150, // Specify the width of the button
    marginTop: 5,
    alignSelf:'center',
  },
  itemTitle:{
    fontSize:20,
    color: '#5D5B5B',
    paddingBottom:10,
  },
});

export default CurrentAuctionsList;
