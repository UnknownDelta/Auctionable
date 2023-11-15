// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIconss from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsss from "react-native-vector-icons/MaterialCommunityIcons";
import { useWishlist } from "../frontend/WishlistContext"; // Import the useWishlist hook
import { useNavigation } from "@react-navigation/native";

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
    robotobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

const DetailsScreen = () => {
  const navigation = useNavigation();
  const handleChatNowPress = () => {
    navigation.navigate('Chat'); // Navigate to the "ChatConversation" screen
  };
  
  const handleAuctionButtonPress = () => {
    navigation.navigate('Auction'); // Navigate to the "AuctionListPage" screen
  };

  const item = {
    id: "1",
    itemName: "Tesla X", // Replace with the actual name of the item
    itemPrice: "$2000", // Replace with the actual price of the item
    itemCondition: "used/9 months",
    itemPicture: require("../assets/teslacar.jpeg"),
    checked: false, // Track the checked state
  };

  const [fontsloaded, setFontsLoaded] = useState(false);
  const {
    wishlistItems,
    isWishlistSelected,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  } = useWishlist();

  const isItemInWishlist = () => {
    return wishlistItems.some((wishlistItem) => wishlistItem.id === item.id);
  };

  const handleAddToWishlist = () => {
    if (isWishlistSelected) {
      removeFromWishlist(item); // You may need to replace 'item' with your actual item
    } else {
      addToWishlist(item); // You may need to replace 'item' with your actual item
    }
    toggleWishlist();
  };

  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={styles.image}
          source={require("../assets/teslacar.jpeg")}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Tesla X</Text>
          <Text style={styles.price}>$2000</Text>
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
                paddingRight: 40,
                marginTop: -20,
              }}
            >
              used/9 months
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.side}>
            <Image source={require("../assets/car.png")} style={styles.thumb} />
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
            onPress={handleAddToWishlist}
          >
            <Text
              style={{
                color: "grey",
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: -16,
                marginRight: -90,
              }}
            >
              <MaterialCommunityIcons
                name={isItemInWishlist() ? "heart" : "hearto"}
                size={20}
                color={"#0077B5"}
                style={{ marginLeft: -10 }}
              />{" "}
              {isItemInWishlist()
                ? "Remove from Cart"
                : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, paddingTop: 30, paddingLeft: 20 }}>
          <View
            style={{
              height: 200,
            }}
          >
            <ScrollView>
              <Text>
                Are you looking for a reliable and stylish car that will turn
                heads on the road? Look no further! Our [insert car make and
                model] is the perfect choice for you. With its sleek design and
                powerful engine, this car is built to impress. It offers a
                smooth and comfortable ride, making every journey a pleasure.
                Whether you’re driving in the city or on the highway, this car
                will deliver an exceptional experience. Safety is our top
                priority. Equipped with advanced safety features such as [insert
                safety feature 1] and [insert safety feature 2], you can have
                peace of mind knowing that you and your loved ones are
                protected. Not only is this car reliable and safe, but it also
                offers great fuel efficiency. Say goodbye to frequent trips to
                the gas station and hello to more savings in your pocket. But
                don’t just take our word for it. Come down to our showroom and
                take this beauty for a test drive. Experience the thrill of
                driving this exceptional car and see for yourself why it’s the
                perfect fit for you. Don’t miss out on this amazing opportunity.
                Contact us today to schedule a test drive and make this car
                yours!
              </Text>
            </ScrollView>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Pressable style={styles.chatbutton} onPress={handleChatNowPress} >
              <Text style={styles.text}>Chat Now!</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Pressable style={styles.auctionbutton} onPress={ handleAuctionButtonPress}>
              <MaterialCommunityIconsss
                name={"gavel"}
                size={40}
                color={"white"}
              />
            </Pressable>
          </View>
          <View
            stlye={{ justifyContent: "flex-end", flexDirection: "row" }}
          ></View>
        </View>
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
  auctionbutton: {
    alignItems: "center",
    backgroundColor: "#0077B5",
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: "center",
    display: "flex",
    marginRight: 30,
    marginTop: -30,
  },
  text: {
    color: "white",
    fontFamily: "roboto",
  },
  chatbutton: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#00A859",
    padding: 10,
    width: 100,
    marginTop: -100,
    justifyContent: "center",
    borderRadius: 40,

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
    height: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: 50,

    backgroundColor: "white",
  },
  infoContainer: {
    paddingTop: 10,
    paddingLeft: 25,
  },
  name: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "robotobold",
  },
  price: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "robotobold",
    color: "#0077B5",
  },
  container: {
    display: "flex",
    width: 300,
  },

  side: {
    flex: 1,
    padding: 20,
  },
  sidecontentcontainer: {
    paddingLeft: 100,
    marginTop: -10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  image: {
    flex: 1,
    width: 500,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
export default DetailsScreen;
