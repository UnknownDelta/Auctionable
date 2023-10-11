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
  Pressable,
} from "react-native";
import { SearchBar } from "react-native-elements";
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
      <LinearGradient
        // Background Linear Gradient
        colors={["#00A859", "#0077B5"]}
        style={{ flex: 1, backgroundColor: "#0077B5" }}
      >
        <SafeAreaView style={{ flex: 1 }}>
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

              <TouchableOpacity style={styles.individ}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car.png")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>Mitsubishi</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.individ}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car3.png")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>Tesla</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.individ}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car4.png")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>Bently</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.individ}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car3.png")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>Hyudai</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.individ}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/car3.png")}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>BMW</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                paddingLeft: 20,
                fontWeight: "bold",
                fontFamily: "roboto",
                fontSize: 20,
                color: "white",
              }}
            >
              Ending Dash Deals
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 40,
              marginTop: -100,
            }}
          >
            <View style={{ flex: 1, height: 5, backgroundColor: "white" }} />
            <Pressable
              title="See More"
              color="#f194ff"
              style={styles.button}
              onPress={() =>
                navigation.navigate("SettingsPage", { screen: "Settings" })
              }
            >
              <Text style={styles.text}>See More</Text>
            </Pressable>
          </View>
          <ScrollView>
            <View style={{ flex: 1, padding: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.productList}
                  onPress={() => navigation.navigate("DetailsPage")}
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/Kia.jpeg")}
                  />
                  <Text>Tesla Model X</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text>23 Bids</Text>
                    <Text
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      {" "}
                      $5000
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.productList}>
                  <Image
                    style={styles.image}
                    source={require("../assets/carmod.jpeg")}
                  />
                  <Text>Ferrari</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text>66 Bids</Text>
                    <Text
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      {" "}
                      $1000
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.productList}
                  onPress={() => navigation.navigate("DetailsPage")}
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/carmod2.jpeg")}
                  />
                  <Text>Bently</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text>2 Bids</Text>
                    <Text
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      {" "}
                      $8000
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.productList}>
                  <Image
                    style={styles.image}
                    source={require("../assets/carmod3.webp")}
                  />
                  <Text>Ford</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text>55 Bids</Text>
                    <Text
                      style={{
                        flex: 1,
                        alignItems: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      {" "}
                      $9000
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
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
                    navigation.navigate("SettingsStack", {
                      screen: "SettingsPage",
                    })
                  }
                >
                  <Text>Go to setting Tab</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("DetailsPage")}
                >
                  <Text>Open Details Screen</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
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
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  individ: {
    paddingLeft: 5,
    paddingRight: 5,
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
  productList: {
    height: 150,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
export default HomeScreen;
