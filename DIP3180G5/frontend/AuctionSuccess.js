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

const AuctionSuccessScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.message}>You successfully bid!</Text>
          <View style={styles.appIconContainer}>
            <Image
              source={require("../assets/auctionBidLogo.png")}
              style={styles.appIcon}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textContent}>
              We eagerly await the outcome and{"\n"} truly appreciate your
              support!{" "}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonMargin]}
              onPress={() => {
                navigation.navigate("AuctionDetailsPage");
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: "black",
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
    marginTop: 30,
    justifyContent: "center", // Center horizontally
  },

  buttonMargin: {
    marginHorizontal: 10,
  },
});

export default AuctionSuccessScreen;
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

const AuctionSuccessScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.message}>You successfully bid!</Text>
          <View style={styles.appIconContainer}>
            <Image
              source={require("../assets/auctionBidLogo.png")}
              style={styles.appIcon}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textContent}>
              We eagerly await the outcome and{"\n"} truly appreciate your
              support!{" "}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonMargin]}
              onPress={() => {
                navigation.navigate("AuctionDetailsPage");
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: "black",
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
    marginTop: 30,
    justifyContent: "center", // Center horizontally
  },

  buttonMargin: {
    marginHorizontal: 10,
  },
});

export default AuctionSuccessScreen;
