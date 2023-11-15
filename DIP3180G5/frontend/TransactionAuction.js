import React,{useEffect} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from "react-native";

import ConfettiCannon from "react-native-confetti-cannon"; // Import the ConfettiCannon library

const TransactionScreen = ({ navigation }) => {
  const [isConfettiActive, setConfettiActive] = React.useState(false);
  useEffect(() => {
    // Trigger confetti animation when the component mounts
    setConfettiActive(true);

    // Clear confetti after 3 seconds (adjust as needed)
    const timeout = setTimeout(() => {
      setConfettiActive(false);
    }, 4000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.message}>Congratulations!</Text>
          <Text style={styles.message}>You own 2021 Toyota Camry</Text>
          <View style={styles.appIconContainer}>
            <Image
              source={require("../assets/teslacar-removebg.png")}
              style={styles.appIcon}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonMargin]}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Confetti animation */}
        {isConfettiActive && (
          <ConfettiCannon
            count={400}
            origin={{ x:-10, y: Dimensions.get('window').height / 2 }}
            autoStart={true}
            fadeOut={true}
            onAnimationEnd={() => setConfettiActive(false)}
          />
        )}
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