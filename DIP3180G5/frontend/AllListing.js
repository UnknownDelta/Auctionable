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

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
  });

const HomeScreen = ({ navigation }) => {
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
        <View style={{ flexDirection: "row", paddingBottom: 20, marginLeft: 25 }}>
          <TouchableOpacity style={{ justifyContent: "flex-end" }}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../assets/appIcon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "flex-start" }}
          ></TouchableOpacity>
          <MaterialCommunityIcons
            name={"filter"}
            size={50}
            color={"#0077B5"}
            style={{ marginLeft: 150 }}
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
            <TouchableOpacity
              style={styles.productpage}
              onPress={() => navigation.navigate("DetailsPage")}
            >
              <View style={styles.container}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require("../assets/car.png")}
                    style={styles.avatar}
                  />
                </View>

                <View style={styles.sidecontentcontainer}>
                  <View>
                    <Text>Car</Text>
                    <Text style={{ paddingTop: 5, color: "grey" }}>Owner</Text>
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
                  source={require("../assets/teslacar.jpeg")}
                  style={{ height: 180, width: "100%", paddingTop: 10 }}
                ></Image>
              </View>
              <View style={styles.productList}>
                <Text style={styles.name}>Tesla X</Text>
                <Text style={{ paddingTop: 5, color: "grey" }}>$20000</Text>
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
                  used/9 months
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.productpage}
              onPress={() => navigation.navigate("DetailsPage")}
            >
              <View style={styles.container}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require("../assets/car.png")}
                    style={styles.avatar}
                  />
                </View>

                <View style={styles.sidecontentcontainer}>
                  <View>
                    <Text>Car</Text>
                    <Text style={{ paddingTop: 5, color: "grey" }}>Owner</Text>
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
                  source={require("../assets/fordcar.jpg")}
                  style={{ height: 180, width: "100% ", paddingTop: 10 }}
                ></Image>
              </View>
              <View style={styles.productList}>
                <Text style={styles.name}>Ford X</Text>
                <Text style={{ paddingTop: 5, color: "grey" }}>$2069000</Text>
              </View>
              <View
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
                  used/9 months
                </Text>
              </View>
            </TouchableOpacity>
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

export default HomeScreen;