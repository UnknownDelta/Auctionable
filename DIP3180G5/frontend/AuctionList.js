// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  AppRegistry,
  LogBox, TextInput,
} from "react-native";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIconss from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsss from "react-native-vector-icons/MaterialCommunityIcons";
import { Slider, RangeSlider } from "@react-native-assets/slider";
import { AllListingsDataConstants } from "./Constants.js";
import "react-range-slider-input";

LogBox.ignoreAllLogs();

const ContentComponent = () => {
  return (
    <View style={styles.filter}>
      <View style={styles.productList}>
        <Text style={styles.name}>Sort Results</Text>
      </View>
      <View style={styles.productList}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.names}>Names</Text>
          <View>
            <MaterialCommunityIcons
              name={"upcircle"}
              size={20}
              color={"#0077B5"}
              style={{ marginLeft: 150 }}
            />
          </View>
          <MaterialCommunityIcons
            name={"downcircle"}
            size={20}
            color={"#0077B5"}
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
      <View style={styles.productList}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.names}>Usage </Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <MaterialCommunityIcons
              name={"upcircle"}
              size={20}
              color={"#0077B5"}
              style={{ marginLeft: 150 }}
            />
            <MaterialCommunityIcons
              name={"downcircle"}
              size={20}
              color={"#0077B5"}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
      <View style={styles.productList}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.names}>Price </Text>
          <MaterialCommunityIcons
            name={"upcircle"}
            size={20}
            color={"#0077B5"}
            style={{ marginLeft: 150 }}
          />
          <MaterialCommunityIcons
            name={"downcircle"}
            size={20}
            color={"#0077B5"}
            style={{ marginLeft: 10 }}
          />
        </View>
      </View>
      <View style={styles.productList}>
        <Text style={styles.name}>Fliter Results</Text>
      </View>
      <View style={styles.ridesFriends}>
        <View style={{ paddingTop: 20 }}>
          <View style={styles.productList}>
            <Text style={styles.names}>Vehicle</Text>
          </View>
          <View style={styles.productList}>
            <Text style={styles.names}>Accessories</Text>
          </View>
          <View style={styles.productList}>
            <Text style={styles.names}>Price</Text>
          </View>
          <View style={styles.productList}>
            <Text style={styles.names}>Conditions</Text>
          </View>
          <View style={styles.productList}>
            <Text style={styles.names}>Durations</Text>
          </View>
          <View style={styles.container}></View>
        </View>
        <View style={styles.verticleLine}></View>
        <View
          style={{ flexDirection: "column", marginTop: 10, marginRight: -25 }}
        >
          <View
            style={{
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            <Pressable style={styles.chatbutton}>
              <Text style={styles.textt}>Car</Text>
            </Pressable>
            <Pressable style={styles.chatbutton}>
              <Text style={styles.textt}>Motocycle</Text>
            </Pressable>
          </View>
          <View
            style={{
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingRight: 20,
              paddingLeft: 10,
            }}
          >
            <Pressable style={styles.chatbutton}>
              <Text style={styles.textt}>Help</Text>
            </Pressable>
            <Pressable style={styles.chatbutton}>
              <Text style={styles.textt}>Tires</Text>
            </Pressable>
            <Pressable style={styles.chatbutton}>
              <Text style={styles.textt}>Others</Text>
            </Pressable>
          </View>
          <View style={{ margin: 30, marginTop: 8, marginBottom: 0 }}>
            <Text>$20.5k - $550k</Text>
            <RangeSlider
              range={[0, 1]}
              minimumValue={0}
              maximumValue={1}
              step={0}
              inboundColor="#0077B5"
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Pressable style={styles.chatbutton}>
              <Text style={styles.textt}>New</Text>
            </Pressable>
            <Pressable style={styles.chatbutton}>
              <Text style={styles.textt}>Used</Text>
            </Pressable>
          </View>
          <View style={{ margin: 30, marginTop: 8, marginBottom: 0 }}>
            <Text>5 mthns - 3.5 yrs</Text>
            <RangeSlider
              range={[0, 1]}
              minimumValue={0}
              maximumValue={1}
              step={0}
              inboundColor="#0077B5"
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Pressable style={styles.applybutton}>
          <Text style={styles.text}>Reset</Text>
        </Pressable>
        <Pressable style={styles.applybutton}>
          <Text style={styles.text}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
};

const getYear = (date) => {
  return date.split("-")[2];
};

const commaNumber = (x) => {
  if (x === undefined) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
  });

const AuctionList = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(false);
  const [AllListingsData, setAllListingsData] = useState(AllListingsDataConstants);
  const handleClick = () => {
    setActive(!active);
  };

  const fetchListingsData = async () => {
    let response, data;
    try {
      response = await fetch(
        // "https://xvu285j6da.execute-api.us-east-1.amazonaws.com/dev/api/cars"
        "http://localhost:4000/api/cars/auctions"
      );
      data = await response.json();
      console.log("api: "+JSON.stringify(data));
      if (data === undefined){
        setAllListingsData(AllListingsDataConstants);
      }
      setAllListingsData(data); // Update the state with fetched data
    } catch (error) {
      console.log("response: "+JSON.stringify(data));
      setAllListingsData(AllListingsDataConstants);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchListingsData();
    console.log(AllListingsData);
    // Load fonts and set fontsLoaded to true
    getFonts().then(() => setFontsLoaded(true));
  }, []);

  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent:"space-around", paddingBottom: 20, marginLeft: 25, marginRight: 25, alignItems: "center" }}>
          <TouchableOpacity style={{ justifyContent: "flex-end", marginRight: 10}}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../assets/appIcon.png")}
            />
          </TouchableOpacity>
          <View style={{ flex: 4, justifyContent: "center", alignItems: "center", marginRight: 5}}>
            <TextInput
              placeholder="Search..."
              style={{ borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 5, width: "100%", height: 35 }}
            />
          </View>
          <MaterialCommunityIcons
            name={"filter"}
            size={50}
            color={"#0077B5"}
            onPress={() => setShow(!show)}
          />
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <LinearGradient
              style={styles.shadowProp}
              colors={["#0077B5", "#00A859"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            {show && <ContentComponent />}
          </View>
          <ScrollView style={styles.scrollView}>

          {AllListingsData.map((item) => (
              <TouchableOpacity
              style={styles.productpage}
              onPress={() => {navigation.navigate("AuctionDetailsPage", { itemId: item._id })}}
            >
              <View style={styles.container}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={item.seller_image === "NA" ? require("../assets/appIcon.png") : {uri: item.seller_image}}
                    style={styles.avatar}
                  />
                </View>

                <View style={styles.sidecontentcontainer}>
                  <View>
                    <Text style={{ paddingTop: 2, color: "black", fontSize: 20, height: 30, marginLeft: -20 }}>{item.seller_name}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                ></TouchableOpacity>
              </View>
              <View style={{ paddingTop: 50 }}>
                <Image
                  source={item.images}
                  style={{ height: 180, width: "100%", paddingTop: 10 }}
                ></Image>
              </View>
              <View style={styles.productList}>
                <Text style={styles.name}>{item.brand + " " + item.model}</Text>
                <Text style={{ paddingTop: 5, color: "grey" }}>starts from ${commaNumber(item.starting_bid)}</Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    marginTop: -20,
                    paddingRight: 20,
                  }}
                >
                  registered in {getYear(item.registration_date)}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          </ScrollView>
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
    alignContent: "flex-start",
    height: 50,
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
    height: 40,
    paddingLeft: 20,
    alignContent: "center",
    resizeMode: "contain",
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
    marginHorizontal: 20,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  image: {
    flex: 1,
    alignContent: "center",
    resizeMode: "cover",
    justifyContent: "center",
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
  productList: {
    paddingLeft: 30,
    paddingTop: 20,
  },
  avatarContainer: {
    borderRadius: 16,
    height: 32,
    width: 30,
    marginLeft: 15,
    borderStyle: "solid",
    marginTop: -5,
  },
  avatar: {
    borderRadius: 25,
    height: 50,
    width: 50,
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
AppRegistry.registerComponent("SliderExample", () => SliderExample);

export default AuctionList;