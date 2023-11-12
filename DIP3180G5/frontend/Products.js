// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from "react";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
  });

const HomeScreen = ({ navigation }) => {
  const [fontsloaded, setFontsLoaded] = useState(false);
  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#00A859", "#0077B5"]}
          style={{ flex: 1, backgroundColor: "#0077B5" }}
        >
          <View>
            <Text
              style={{
                paddingLeft: 20,
                fontWeight: "bold",
                fontFamily: "roboto",
                fontSize: 20,
                color: "white",
              }}
            >
              Categories
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
                paddingRight: 40,
              }}
            >
              <View style={{ flex: 1, height: 5, backgroundColor: "white" }} />
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.contentContainer}
              style={{ flexgrow: 0, paddingVertical: 0 }}
            >
              <TouchableOpacity>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car2.jpeg")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>Kia Soul</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car.png")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>Mitsubishi</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car3.png")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>Tesla</Text>
                </View>
              </TouchableOpacity>

              <Text style={{ fontSize: 22, padding: 10 }}>
                React Native ScrollView Example
              </Text>
              <View style={[{ width: 220, height: 70, padding: 10 }]}>
                <Button
                  onPress={this.onPressButton}
                  title="Button 3"
                  color="#FFFF3D"
                />
              </View>
              <Text style={{ fontSize: 22, padding: 10 }}>If you like</Text>
              <View style={[{ width: 220, height: 70, padding: 10 }]}>
                <Button
                  onPress={this.onPressButton}
                  title="Button 4"
                  color="#FF3DFF"
                />
              </View>
              <Text style={{ fontSize: 22, padding: 10 }}>
                Scrolling horizontal
              </Text>
              <View style={[{ width: 220, height: 70, padding: 10 }]}>
                <Button
                  onPress={this.onPressButton}
                  title="Button 5"
                  color="#3DFF00"
                />
              </View>
            </ScrollView>
          </View>

          <Text
            style={{
              paddingLeft: 20,
              fontWeight: "bold",
              fontFamily: "roboto",
              fontSize: 20,
              color: "white",
            }}
          >
            Hot Deals
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 40,
            }}
          >
            <View style={{ flex: 1, height: 5, backgroundColor: "white" }} />
          </View>

          <View style={{ flex: 1, padding: 16 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                You are on Home Screen
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("SettingsPage", { screen: "Settings" })
                }
              >
                <Text>Go to settng Tab</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Details")}
              >
                <Text>Open Details Screen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  } else {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    height: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: 50,
    alignSelf: "center",
    backgroundColor: "white",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 11,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  contentContainer: {
    paddingVertical: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  sidecontentcontainer: {
    paddingLeft: 100,
  },
});
export default HomeScreen;
