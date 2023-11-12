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
  AppRegistry,
} from "react-native";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIconss from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsss from "react-native-vector-icons/MaterialCommunityIcons";
import { Slider, RangeSlider } from "@react-native-assets/slider";
import "react-range-slider-input";

const ContentComponent = () => {};

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
    robotolite: require("../assets/fonts/Roboto-Light.ttf"),
    robotobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

const AuctionList = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <TouchableOpacity
            style={{ justifyContent: "flex-end" }}
          ></TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "flex-start" }}
          ></TouchableOpacity>

        </View>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.side}>
            <Image source={require("../assets/car.png")} style={styles.thumb} />
            <Text style={{fontFamily: "robotobold", fontSize: 20, marginTop: 15, paddingLeft: 20,}}>Car</Text>
          </View>
          <View>
            <LinearGradient
              style={styles.shadowProp}
              colors={["#0077B5", "#00A859"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={{fontFamily: "robotobold", fontSize: 20, marginTop: 15, paddingLeft: 30,}}>Notification</Text>
         
            <View
              style={styles.notificationbox}
            >
              <View style={styles.notificationtext}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      marginTop: -20,
                    }}
                  >
                    12/12/23
                  </Text>
                  <Text
                    style={{
                      color: "grey",
                      flexDirection: "row-reverse",
                      alignItems: "flex-end",
                      marginTop: -20,
                      paddingRight: 20,
                    }}
                  >
                    05:20
                  </Text>
                </View>
                <Text style={styles.name}>Outbid for Certain Items</Text>
                <Text style={{ paddingTop: 5, color: "grey" }}>
                  We regret to inform you that you have been outbid for an
                  ongoing auction of [Insert Item].
                </Text>
              </View>
              <Image source={require('../assets/fordcar.jpg')} style={{width:'auto', height:200}}></Image>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.bidnow}  onPress={() => navigation.navigate('Auction',{screen:"AuctionDetailsPage"})}>
                  <Text style={styles.bidtext}>Outbid Now</Text>
                </TouchableOpacity>

                <MaterialCommunityIconsss
                  name={"trash-can-outline"}
                  size={40}
                  color={"#0077B5"}
                  style={{ padding: 10 }}
                />
              </View>
            </View>    
        </SafeAreaView>
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
  textt: {},

  containers: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 10,
    height: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  side: {
    flexDirection: "row",
                    
    height: 50,
   paddingHorizontal:20,
   marginBottom: 10,
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
height:50,
width:50,
borderRadius: 50/2,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "roboto",
  },
  names: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "roboto",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  productpage: {
    margin: 10,
    paddingTop: 20,
    borderRadius: 20,
    backgroundColor: "white",
    height: 340,
  },

  filter: {
    margin: 20,

    borderRadius: 20,
    backgroundColor: "white",
    height: 520,
  },
  producttext: {
    padding: 20,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },

  sidecontentcontainer: {
    paddingLeft: 100,
    marginTop: -20,
    paddingBottom: 10,
  },
  container: {
    height: 10,
  },
  overlapContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    marginTop: 50,
    marginRight: 50,
  },
  notificationbox: {
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 10,
    paddingTop: 40,
    borderRadius: 20,

    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  heading: {

  },
  notificationtext: {
    padding: 10,
  },
  avatarContainer: {
    borderRadius: 16,
    height: 32,
    width: 32,
    marginLeft: 15,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "white",
    marginTop: -10,
  },
  avatar: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  bidnow: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    marginTop: 10,
    width: 90,
    marginLeft: 20,
    justifyContent: "center",
    borderRadius: 20,
    height: 40,
    flexDirection: "row",
    alignItems: "",
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
  verticleLine: {
    height: "100%",
    width: 2,
    backgroundColor: "#909090",
  },
  ridesFriends: {
    paddingTop: 20,

    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 20,
  },
  textt: {
    justifyContent: "center",
    textAlign: "center",
    color: "black",
  },
  bidtext: {
    fontSize: 13,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
  chatbutton: {
    marginTop: 6,
    textAlign: "center",
    backgroundColor: "white",
    padding: 2,
    paddingHorizontal: 10,

    width: "auto",
    height: 20,
    justifyContent: "center",
    borderRadius: 4,
    marginLeft: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  text: {
    color: "white",
  },
  applybutton: {
    alignItems: "center",
    backgroundColor: "#00A859",
    padding: 10,
    width: 100,
    marginHorizontal: 10,
    justifyContent: "center",
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
export default AuctionList;
AppRegistry.registerComponent("SliderExample", () => SliderExample);
