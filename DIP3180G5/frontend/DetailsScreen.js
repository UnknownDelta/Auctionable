// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWishlist } from "../frontend/WishlistContext";

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
  });

const DetailsScreen = () => {
  const [fontsloaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const {
    isWishlistSelected,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist(); // Access isWishlistSelected, toggleWishlist, and addToWishlist from the context
  //const [isWishlistSelected, setIsWishlistSelected] = useState(false); // New state
  const newItem = {
    itemName: "Tesla",
    itemPrice: "$20",
    itemCondition: "used/9 months",
    itemPicture: require("../assets/Kia.jpeg"),
  };

  const handleAddToWishlist = () => {
    if (isWishlistSelected) {
      removeFromWishlist(newItem); // Remove the item from the wishlist
    } else {
      addToWishlist(newItem); // Add the newItem to the wishlist
    }
    toggleWishlist(); // Toggle the wishlist state
  };

  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image style={styles.image} source={require("../assets/Kia.jpeg")} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Tesla</Text>
          <Text style={styles.price}>$20</Text>
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
            onPress={handleAddToWishlist} // Handle press to toggle wishlist
          >
            <Ionicons
              name={isWishlistSelected ? "heart" : "heart-outline"} // Change icon based on state
              size={24}
              color={isWishlistSelected ? "black" : "black"} // Change color based on state
              style={{ marginRight: 8 }}
            />

            <Text
              style={{
                color: "grey",
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: -16,
                marginRight: -90,
              }}
            >
              {isWishlistSelected ? "Remove from wishlist" : "Add to wishlist"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, paddingTop: 30, paddingLeft: 20 }}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text>And I say hey, what a wonderful time of day.</Text>
          </View>
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
    fontFamily: "roboto",
  },
  price: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "roboto",
    color: "grey",
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
    resizeMode: "cover",
    justifyContent: "center",
  },
});
export default DetailsScreen;
