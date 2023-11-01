import React, { Component } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

class PurchaseHistoryScreen extends Component {
  constructor(props) {
    super(props);

    // Sample data for purchase history
    this.state = {
      purchases: [
        {
          id: "1",
          productName: "Tesla",
          price: "$20,000",
          date: "2023-10-25",
          image: require("../assets/teslacar.jpeg"), // Replace with the actual image path
        },
        {
          id: "2",
          productName: "Fordcar",
          price: "$15,000",
          date: "2023-10-20",
          image: require("../assets/fordcar.jpg"), // Replace with the actual image path
        },
        // Add more purchase history items here
      ],
    };
  }

  renderPurchaseItem = ({ item }) => (
    <View style={styles.purchaseItem}>
      <View style={styles.leftContainer}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Purchase History</Text>
        <FlatList
          data={this.state.purchases}
          renderItem={this.renderPurchaseItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    padding: 12,
  },
  purchaseItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between", // Align items to the ends of the row
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
});

export default PurchaseHistoryScreen;
