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
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.message}>Thank you for your order!</Text>
          <View style={styles.appIconContainer}>
            <Image
              source={require("../assets/transactionIcon.png")}
              style={styles.appIcon}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textContent}>
              The road ahead looks exciting {"\n"} with your new purchase!{" "}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textContent}>Now drive to...... </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonMargin]}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonMargin]}
              onPress={() => {
                navigation.navigate("PurchaseHistoryPage"); // Replace 'Home' with the desired screen name
              }}
            >
              <Text style={styles.buttonText}>View Purchase</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: "center",
  },
  appIconContainer: {
    width: 250,
    height: 250,
    borderRadius: 125, // Half of 250 to create a circle
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    color: "white",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  textContent: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 120,
  },
  buttonText: {
    fontSize: 15,
    color: "#0077B5",
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },

  buttonMargin: {
    marginHorizontal: 10,
  },
});

export default TransactionScreen;
