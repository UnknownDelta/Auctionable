import React , {useState}from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { CheckBox } from "react-native-elements";

const TransactionScreen = ({ navigation }) => {
const [isWarrantySelected, setWarrantySelected] = useState(false);
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
              Total Price <Text style={styles.price}>             $80,000</Text>
            </Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 2,
              }}
            />
          </View>
          <View  style={styles.additionalInfo}>
              <Text style={styles.additionalInfoHeader}>Service Fee 1%  <Text style={styles.price}>             $800</Text></Text>
              <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 2,
              }}
            />
            <Text style={styles.additionalInfoHeader}>Inclusive of:</Text>
              <Text style={styles.additionalInfoContent}>Transferring of ownership paperwork</Text>
              <Text style={styles.additionalInfoContent2}>Condition check by Clutch</Text>
              <Text style={styles.totalPrice}>
              Total Price <Text style={styles.price}>             $80,800</Text>
            </Text>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 2,
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button2}
          >
            <View style={styles.checkboxText}>
            <CheckBox
              checked={isWarrantySelected}
              onPress={() => setWarrantySelected(!isWarrantySelected)}
              containerStyle={styles.checkboxContainer}
            /><Text style={styles.buttonText2}>Additional Six Months Warranty</Text>
            </View>
            <Text style={styles.price2}>$4000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Check if the warranty checkbox is selected
              if (isWarrantySelected) {
                navigation.navigate("CheckoutPage");
              } else {
                navigation.navigate("TransactionAuctionPage");
              }
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: 120,
    alignSelf: "center",
    elevation:5,
  },
  button2:{
    backgroundColor: "white",
    width:270,
    borderRadius: 10,
    alignItems: "center",
    padding:10,
    alignSelf:"center",
    elevation:5,
  },
  buttonText: {
    color: "#0077B5",
    fontWeight: "bold",
    fontSize: 18,
  },

  buttonText2:{
    color: "black",
    fontWeight:"bold",
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
  price2:{
    color:"#0077B5",
    fontSize: 19,
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
  additionalInfoContent2:{ 
    marginBottom:70,
    color:"#0077B5",
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  checkboxText:{
    flexDirection:"row",
  }
});

export default TransactionScreen;
