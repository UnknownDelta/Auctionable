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
  TextInput,
  Pressable,
} from "react-native";
import { SearchBar } from "react-native-elements";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIconss from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsss from "react-native-vector-icons/MaterialCommunityIcons";
import { Auth } from 'aws-amplify';

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
    robotolite: require("../assets/fonts/Roboto-Light.ttf"),
    robotobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

const HomeScreen = ({ navigation }) => {


  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProfileScreen' }],
      });
      console.log('Successfully signed out');  
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }
  const [fontsloaded, setFontsLoaded] = useState(false);
  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", height: "10%", marginLeft: "5%"}}>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}  onPress={handleLogout}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../assets/appIcon.png")} 
            />
          </TouchableOpacity>
          <View style={{ flex: 4, justifyContent: "center", alignItems: "center", marginLeft: "5%"}}>
            <TextInput
              placeholder="Search..."
              style={{ borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 5, width: "100%" }}
            />
          </View>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", marginLeft: "5%"}}>
            <MaterialCommunityIcons
              name={"hearto"}
              size={30}
              color={"#0077B5"}
              style={{ width: "100%" }}
            />
          </TouchableOpacity>
        </View>


        <LinearGradient
          style={styles.shadowProp}
          colors={["#0077B5", "#00A859"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name={"appstore1"}
            size={20}
            color={"#0077B5"}
            style={{ paddingLeft: 40, paddingTop: 11 }}
          />
          <Text
            style={{
              paddingTop: 10,
              paddingLeft: 5,
              fontWeight: "bold",
              fontFamily: "roboto",
              fontSize: 20,
              color: "#0077B5",
              paddingBottom: 5,
            }}
          >
            Categories
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 40,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 6,
              backgroundColor: "#0077B5",
              borderRadius: 30,
              marginRight: 130,
            }}
          />
        </View>
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.contentContainer}
            style={{ flexgrow: 0, paddingLeft: 20 }}
          >
            <TouchableOpacity style={styles.individ}>
              <View style={styles.centerer}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/kia.png")}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>Kia</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.individ}>
              <View style={styles.centerer}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/Tesla.png")}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>Tesla</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.individ}>
              <View style={styles.centerer}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/bentley.png")}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>Bently</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.individ}>
              <View style={styles.centerer}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/hyundai.png")}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>Hyudai</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.individ}>
              <View style={styles.centerer}>
                <Image
                  style={styles.thumb}
                  source={require("../assets/bmw.png")}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>BMW</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <LinearGradient
          style={styles.shadowProp}
          colors={["#0077B5", "#00A859"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <ScrollView>
          <View style={{ flexDirection: "row", paddingTop: 4 }}>
            <MaterialCommunityIconss
              name={"stopwatch"}
              size={20}
              color={"#0077B5"}
              style={{ paddingLeft: 38, paddingTop: 11 }}
            />
            <Text
              style={{
                paddingTop: 10,
                paddingLeft: 8,
                fontWeight: "bold",
                fontFamily: "roboto",
                fontSize: 20,
                color: "#0077B5",
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
              marginTop: -50,
              paddingTop: 37,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 6,
                backgroundColor: "#0077B5",
                marginRight: 40,
                borderRadius: 30,
              }}
            />
            <Pressable
              title="See More"
              color="#0077B5"
              style={styles.button}
              onPress={() => navigation.navigate("SettingsPage")}
            >
              <Text style={styles.text}>See More</Text>
            </Pressable>
          </View>

          <View>
            <TouchableOpacity
              style={styles.productList}
              onPress={() => navigation.navigate("DetailsPage")}
            >
              <Image
                style={styles.image}
                source={require("../assets/teslacar.jpeg")}
              />
              <View style={{ position: "absolute" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "87.7%"}}>
                  <Text
                    style={{
                      marginTop: 120,
                      paddingLeft: 10,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Tesla Model X
                  </Text>
                  <View
                    style={{
                      fontSize: 20,
                      marginTop: 21,

                      color: "white",
                      justifyContent: "flex-end",
                      backgroundColor: "rgba(52, 52, 52, 0.8)",
                      padding: 20,
                      borderBottomRightRadius: 16,
                      borderTopLeftRadius: 60,
                    }}
                  >
                    <View style={{ paddingBottom: 10 }}>
                      <Text style={{ color: "white", fontSize: 10 }}>
                        Current Bid
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "robotobold",
                          fontSize: 20,
                        }}
                      >
                        $5000
                      </Text>
                    </View>
                    <View style={{ paddingBottom: 10, fontSize: 10 }}>
                      <Text style={{ color: "white" }}>25 Bids</Text>
                    </View>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      Ending in
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "robotobold",
                        fontSize: 20,
                        color: "red",
                      }}
                    >
                      20:12
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <MaterialCommunityIconsss
              name={"gavel"}
              size={25}
              color={"#0077B5"}
              style={{ paddingLeft: 30 }}
            />
            <Text
              style={{
                paddingLeft: 10,
                fontWeight: "bold",
                fontFamily: "roboto",
                fontSize: 20,
                color: "#0077B5",
              }}
            >
              Popular
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 20,
              paddingRight: 40,
              marginTop: -50,
              paddingTop: 37,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 6,
                backgroundColor: "#0077B5",
                borderRadius: 30,
                marginRight: 30,
              }}
            />
            <Pressable
              title="See More"
              color="#0077B5"
              style={styles.button}
              onPress={() => navigation.navigate("SettingsPage")}
            >
              <Text style={styles.text}>See More</Text>
            </Pressable>
          </View>

          <TouchableOpacity
            style={styles.productList}
            onPress={() => navigation.navigate("DetailsPage")}
          >
            <Image
              style={styles.image}
              source={require("../assets/bentleycar.jpg")}
            />
            <View style={{ position: "absolute" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "82.4%" }}>
                <Text
                  style={{
                    marginTop: 120,
                    paddingLeft: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Bently
                </Text>
                <View
                  style={{
                    fontSize: 20,
                    marginTop: 21,
                    color: "white",
                    justifyContent: "flex-end",
                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                    padding: 20,
                    borderBottomRightRadius: 16,
                    borderTopLeftRadius: 60,
                  }}
                >
                  <View style={{ paddingBottom: 10 }}>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      Current Bid
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "robotobold",
                        fontSize: 20,
                      }}
                    >
                      $5000
                    </Text>
                  </View>
                  <View style={{ paddingBottom: 10, fontSize: 10 }}>
                    <Text style={{ color: "white" }}>25 Bids</Text>
                  </View>
                  <Text style={{ color: "white", fontSize: 10 }}>
                    Ending in
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "robotobold",
                      fontSize: 20,
                      color: "red",
                    }}
                  >
                    20:12
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  individ: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  centerer: {
    justifyContent: "center",
    borderRadius: 80 / 2,
    backgroundColor: "#eeeeee",
    height: 90,
    width: 90,
    paddingRight: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    width: 60,
    height: 60,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#eeeeee",
  },
  infoContainer: {
    padding: 16,
    textAlign: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0077B5",
    textAlign: "center",
    fontFamily: "roboto",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productList: {
    height: 170,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.60)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: "100%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#0077B5",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    height: 10,
    elevation: 7,
    backgroundColor: "white",
  },
});
export default HomeScreen;
