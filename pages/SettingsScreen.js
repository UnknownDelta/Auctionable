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
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import Collapsible from "react-native-collapsible";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIconss from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsss from "react-native-vector-icons/MaterialCommunityIcons";

const ContentComponent = () => {
  return (
    <TouchableOpacity style={styles.filter}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        ></TouchableOpacity>
      </View>

      <View style={styles.productList}>
        <Text style={styles.name}>Sort Results</Text>
      </View>
      <View style={styles.productList}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.names}>Names</Text>
        
        <MaterialCommunityIcons
                name={"upcircle"}
                size={20}
                color={"#0077B5"}
                style={{ marginLeft: 10 }}
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
      <View style={{flexDirection: "row"}}>
        <Text style={styles.names}>Usage</Text>
        <MaterialCommunityIcons
                name={"upcircle"}
                size={20}
                color={"#0077B5"}
                style={{ marginLeft: 10 }}
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
      <View style={{flexDirection: "row"}}>
        <Text style={styles.names}>Price</Text>
        <MaterialCommunityIcons
                name={"upcircle"}
                size={20}
                color={"#0077B5"}
                style={{ marginLeft: 10 }}
              />
                      <MaterialCommunityIcons
                name={"downcircle"}
                size={20}
                color={"#0077B5"}
                style={{ marginLeft: 10 }}
                
              />
      </View>
      </View>
      <View style={{ paddingTop: 20 }}>
        <View style={styles.productList}>
          <Text style={styles.name}>Fliter Results</Text>
          
        </View>
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
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Pressable style={styles.chatbutton}>
          <Text style={styles.text}>Chat Now!</Text>
        </Pressable>
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

  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <TouchableOpacity style={{ justifyContent: "flex-end" }}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require("./logo.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "flex-start" }}
          ></TouchableOpacity>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <Button title={"Show Component"} onPress={() => setShow(!show)} />
            {show && <ContentComponent />}
          </View>
          <ScrollView style={styles.scrollView}>
            <TouchableOpacity
              style={styles.productpage}
              onPress={() => navigation.navigate("Details")}
            >
              <View style={styles.container}>
                <View style={styles.avatarContainer}>
                  <Image source={require("./car.png")} style={styles.avatar} />
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
                  source={require("./teslacar.jpeg")}
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
              onPress={() => navigation.navigate("Details")}
            >
              <View style={styles.container}>
                <View style={styles.avatarContainer}>
                  <Image source={require("./car.png")} style={styles.avatar} />
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
                  source={require("./fordcar.jpg")}
                  style={{ height: 180, width: "100% ", paddingTop: 10 }}
                ></Image>
              </View>
              <View style={styles.productList}>
                <Text style={styles.name}>Ford X</Text>
                <Text style={{ paddingTop: 5, color: "grey" }}>$20q69000</Text>
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

        <LinearGradient
          style={styles.shadowProp}
          colors={["#0077B5", "#00A859"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
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
    margin: 10,

    borderRadius: 20,
    backgroundColor: "white",
    height: 500,
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
});
export default HomeScreen;
