// PastAuctionsList.js
import React from 'react';
import { FlatList, Text, View, StyleSheet,Image } from 'react-native';

const data = [
  { id: '1', title: 'Audi Q5' ,image: require("../assets/AudiQ5.png"), bid: '$156,300', date: '15/11/23',time:'15:20',result:'loss'},
  { id: '2', title: 'Volkswagen Golf' ,image: require("../assets/volkswagen.png"), bid: '$69,000', date: '10/03/23',time:'19:20',result:'win'},
  // Add more items as needed
];

const PastAuctionsList = () => {
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
                <Text style={styles.textHeader}>Ended on:</Text>
                <Text style={styles.additionalText}>{item.date}         {item.time}</Text>
            </View>
          </View>
          {item.result === 'loss' ? (
            <Text style={{ paddingTop: 10, color: '#B50000', textAlign: 'center' ,fontWeight:'bold',fontSize:12}}>
              You did not win this auction :(
            </Text>
          ) : (
            <Text style={{ paddingTop: 10, color: '#0077B5', textAlign: 'center',fontWeight:'bold',fontSize:12}}>
              You won this auction :D
            </Text>
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
    elevation: 5,
  },
  image: {
    width: 150,
    height: 100,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection:"row",
  },
  additionalText: {
    fontSize: 15,
    color: '#0077B5', 
  },
  bidText:{
    fontSize: 20,
    color: '#0077B5',
  },
  textHeader: {
    fontSize: 14,
    color: '#5D5B5B', 
  },
  textContainer:{
    flexDirection:"column",
    justifyContent:"space-between",
  },
  itemTitle:{
    fontSize:20,
    color: '#5D5B5B',
    paddingBottom:10,
  }

});

export default PastAuctionsList;
// PastAuctionsList.js
import React from 'react';
import { FlatList, Text, View, StyleSheet,Image } from 'react-native';

const data = [
  { id: '1', title: 'Audi Q5' ,image: require("../assets/AudiQ5.png"), bid: '$156,300', date: '15/11/23',time:'15:20',result:'loss'},
  { id: '2', title: 'Volkswagen Golf' ,image: require("../assets/volkswagen.png"), bid: '$69,000', date: '10/03/23',time:'19:20',result:'win'},
  // Add more items as needed
];

const PastAuctionsList = () => {
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
                <Text style={styles.textHeader}>Ended on:</Text>
                <Text style={styles.additionalText}>{item.date}         {item.time}</Text>
            </View>
          </View>
          {item.result === 'loss' ? (
            <Text style={{ paddingTop: 10, color: '#B50000', textAlign: 'center' ,fontWeight:'bold',fontSize:12}}>
              You did not win this auction :(
            </Text>
          ) : (
            <Text style={{ paddingTop: 10, color: '#0077B5', textAlign: 'center',fontWeight:'bold',fontSize:12}}>
              You won this auction :D
            </Text>
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
    elevation: 5,
  },
  image: {
    width: 150,
    height: 100,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection:"row",
  },
  additionalText: {
    fontSize: 15,
    color: '#0077B5', 
  },
  bidText:{
    fontSize: 20,
    color: '#0077B5',
  },
  textHeader: {
    fontSize: 14,
    color: '#5D5B5B', 
  },
  textContainer:{
    flexDirection:"column",
    justifyContent:"space-between",
  },
  itemTitle:{
    fontSize:20,
    color: '#5D5B5B',
    paddingBottom:10,
  }

});

export default PastAuctionsList;
