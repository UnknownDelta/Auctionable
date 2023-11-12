import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";

const TransactionScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.message}>Checkout</Text>
        <View style={styles.whiteContainer}>
          <View style={styles.itemContainer}>
            <Image
              style={styles.itemImage}
              source={require("../assets/teslacar.jpeg")}
            />
            <Text style={styles.itemName}>2021 Toyota Camry</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPrice}>
              Total Price <Text style={styles.price}>             $84,800</Text>
            </Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 2,
              }}
            />
          </View>
          <View  style={styles.additionalInfo}>
              <Text style={styles.additionalInfoHeader}>Inclusive of:</Text>
              <Text style={styles.additionalInfoContent}>Transferring of ownership paperwork</Text>
              <Text style={styles.additionalInfoContent}>Condition check by Clutch</Text>
              <Text style={styles.additionalInfoContent}>Additional 6 months warranty</Text>
          </View>
          <Image
            style={styles.imageIcon}
            source={require("../assets/card_payment.png")}
          />
          <Image
            style={styles.imageIcon}
            source={require("../assets/installment.png")}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("TransactionAuctionPage");
            }}
          >
            <Text style={styles.buttonText}>PAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  message: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    color: "white",
  },
  whiteContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    // Additional styles for the white container
  },
  button: {
    backgroundColor: "#00A859",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: 120,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  imageIcon: {
    width: 250,
    height: 70,
    alignSelf: "center",
  },
  itemImage: {
    width: 100,
    height: 80,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  priceContainer: {
    marginTop: 20,
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },

  price: {
    color: "#0077B5",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf:"flex-end"
  },

  additionalInfo:{
    marginTop:10,
    marginBottom:50,
  },

  additionalInfoHeader:{
    fontWeight:"bold",
    fontsize:16,
  },
  additionalInfoContent:{ 
    color:"#0077B5",
  },
});

export default TransactionScreen;
