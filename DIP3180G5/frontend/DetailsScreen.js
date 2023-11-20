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
import { useRoute } from '@react-navigation/native';

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
    robotobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const itemConstant = {
    "_id": "652f8b52567e4097cdafec57",
    "brand": "Toyota",
    "model": "Corolla",
    "colour": "Silver",
    "fuel_type": "Petrol",
    "price": 105000,
    "description": "Droved 1000 km",
    "years_used": 2,
    "registration_date": "12-12-2019",
    "category": "car",
    "new_used": true,
    "images": [
    "https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1600.jpg",
    "https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1600.jpg"
    ],
    "sold": false,
    "createdAt": "2023-10-18T07:37:54.975Z",
    "updatedAt": "2023-10-18T07:37:54.975Z",
    "__v": 0,
    "mileage": 1000,
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_image": "https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg",
    "seller_name": "Bryan"
  };

const DetailsScreen = () => {
  const [data, setData] = useState(itemConstant);
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;
  console.log(itemId);
  const handleChatNowPress = () => {
    navigation.navigate('Chat'); // Navigate to the "ChatConversation" screen
  };
  
  const handleAuctionButtonPress = () => {
    navigation.navigate('Auction'); // Navigate to the "AuctionListPage" screen
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
    return wishlistItems.some((wishlistItem) => wishlistItem.id === itemConstant.id);
  };

  const handleAddToWishlist = () => {
    if (isWishlistSelected) {
      removeFromWishlist(itemConstant); // You may need to replace 'item' with your actual item
    } else {
      addToWishlist(itemConstant); // You may need to replace 'item' with your actual item
    }
    toggleWishlist();
  };

  const fetchItemDetails = async () => {
    try {
      const response = await fetch(
        // "https://xvu285j6da.execute-api.us-east-1.amazonaws.com/dev/api/cars"
        "http://localhost:4000/api/cars/"+itemId
      );
      const dataJSON = await response.json();
      const parsedData = JSON.parse(JSON.stringify(dataJSON[0]));
      setData(parsedData); // Update the state with fetched data
    } catch (error) {
      console.log(error)
      setData(itemConstant);
    }
  };

  function calculateDuration(dateString) {
    const parts = dateString.split('-');
    const inputDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const currentDate = new Date();
    const timeDifference = currentDate - inputDate;
    console.log("inputDate: "+inputDate);
    console.log("currentDate: "+currentDate);
    console.log("timeDifference: "+timeDifference);
    let difference = "";
    let monthsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    let yearDifference = 0;
    if (monthsDifference>11){
      yearDifference = Math.floor(monthsDifference/12);
      monthsDifference = monthsDifference%12;
      if (yearDifference === 1)
        difference = yearDifference + " year";
      else
        difference = yearDifference + " years";
      if (monthsDifference === 1)
        difference = difference + " " + monthsDifference + " month";
      else
        difference = difference + " " + monthsDifference + " month";
    }
    else
    {
      if (monthsDifference === 1)
        difference = monthsDifference + " month";
      else
        difference = monthsDifference + " month";
    }
    return difference;
  }

  useEffect(() => {
    // Fetch data when the component mounts
    fetchItemDetails();
  }, []);

  if (fontsloaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={styles.image}
          source={data.images ? data.images : require("../assets/teslacar.jpeg")}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{data.brand + " " + data.model}</Text>
          <Text style={styles.price}>${data.price}</Text>
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
              used for {calculateDuration(data.registration_date)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.side}>
            <Image source={data.seller_image === "NA" ? require("../assets/appIcon.png") : {uri: data.seller_image}} style={styles.thumb} />
          </View>
          <View style={styles.sidecontentcontainer}>
            <View>
            <Text style={{ paddingTop: 2, color: "black", fontSize: 20, height: 30, marginLeft: -20 }}>{data.seller_name}</Text>
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

        <View style={{ flex: 1, paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
          <View
            style={{
              height: 200,
            }}
          >
            <ScrollView>
              <Text style={{ flex: 1, textAlign: "justify" }}>
                {data.description}
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
