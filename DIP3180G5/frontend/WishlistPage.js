import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useWishlist } from "../frontend/WishlistContext";
import Counter from "react-native-counters";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import TransactionSuccessScreen from "../frontend/TransactionScreen"; // Import the new component
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const AuctionScreen = () => {
  const user = useSelector((state) => state.user);
  const [quantities, setQuantities] = useState({}); // Store quantities for each item
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [showTransactionSuccess, setShowTransactionSuccess] = useState(false); // State for showing transaction success screen
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const {
    wishlistItems,
    toggleWishlist,
    removeFromWishlist,
    isWishlistSelected,
    setWishlistItems,
    updateWishlistItems,
  } = useWishlist();
  const[data, setData] = useState(wishlistItems);
  const fetchCartData = async () => {
    let response, data;
    try {
      response = await fetch(
        "http://localhost:4000/api/cars/"+user._id+"/auctionCart"
      );
      data = await response.json();
      console.log("api: "+JSON.stringify(data));
      if (data === undefined){
        setData(AllListingsDataConstants);
      }
      data.map((item) => {
        item["checked"] = false;
      });
      setData(data); // Update the state with fetched data
    } catch (error) {
      console.log("response: "+JSON.stringify(data));
      setData(AllListingsDataConstants);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const navigation = useNavigation();
  console.log("data", data);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCheckout = () => {
    setModalVisible(false); //close it incase open

    // Get selected items
    const selectedItemsList = data.filter((item) =>
      selectedItems.includes(item.id)
    );

    // Remove the selected items from the wishlist
    selectedItemsList.forEach((item) => {
      removeFromWishlist(item);
    });

    // Clear selected items and quantities
    setSelectedItems([]);
    setQuantities({});

    navigation.navigate("TransactionScreen");
  };

  const EmptyWishlistMessage = () => (
    <View style={styles.container}>
      <Text>No items found in the cart.</Text>
    </View>
  );

  if (!data || data.length === 0) {
    return <EmptyWishlistMessage />;
  }

  const handleDeleteItem = (itemId) => {
    console.log("Deleting", itemId);
    const item = data.find((item) => item.id === itemId);

    if (item) {
      removeFromWishlist(item);
    }

    if (data.length === 0) {
      return <EmptyWishlistMessage />;
    }
  };

  const toggleCheckbox = (itemId) => {
    // Find the item you want to update in the wishlistItems
    const updatedWishlist = data.map((item) => {
      if (item._id === itemId) {
        // Toggle the checked state for the item
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    // // Update the wishlist
    setData(updatedWishlist);

    // setSelectedItems((prevSelectedItems) => {
    //   if (prevSelectedItems.includes(itemId)) {
    //     return prevSelectedItems.filter((item) => item.id !== itemId);
    //   } else {
    //     return [...prevSelectedItems, itemId];
    //   }
    // });
    console.log("halo")
  };

  // Function to calculate the total price based on selected items
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    data.map((item) =>{
      if (item.checked)
        totalPrice += item.highestPrice;
    })
    return totalPrice; // Format total price to 2 decimal places
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
  const commaNumber = (x) => {
    if (x === undefined) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.itemName}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <CheckBox
                size={17}
                checked={item.checked}
                onPress={() => toggleCheckbox(item._id)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#0077B5"
                label=""
                containerStyle={styles.checkboxContainer} // Add this line to apply custom styles
              />
              <Image source={item.images} style={styles.itemImage} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>
                  <Text style={{ fontWeight: "bold" }}>{item.brand + " " + item.model}</Text>
                </Text>
                <Text style={styles.itemText}>{calculateDuration(item.registration_date)}</Text>
                <Text style={styles.itemText}>
                  <Text
                    style={{
                      color: "#0077B5",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {"$"+commaNumber(item.highestPrice)}
                  </Text>
                </Text>
              </View>

              <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                  <MaterialIcons
                    name="delete-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => showModal()}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {"$"+commaNumber(calculateTotalPrice())+".00"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}> Confirmation</Text>
            <Text style={styles.modalSubMessage2}>
              {" "}
              You are about to pay{" "}
              <Text style={{ color: "#0077B5" }}>${calculateTotalPrice()}</Text>
            </Text>
            <Text style={styles.modalSubMessage}>Payment Method:</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => {
                  handleCheckout();
                  setModalVisible(false);
                }}
              >
                <Image
                  style={{ alignSelf: "center", width: 35, height: 25 }}
                  source={require("../assets/mastercard.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => {
                  handleCheckout();
                  setModalVisible(false);
                }}
              >
                <Image
                  style={{ alignSelf: "center", width: 50, height: 15 }}
                  source={require("../assets/VISA.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => {
                  handleCheckout();
                  setModalVisible(false);
                }}
              >
                <Image
                  style={{ alignSelf: "center", width: 60, height: 15 }}
                  source={require("../assets/paypal.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>
                Let me review my cart again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CheckoutScreen = () => {
  const user = useSelector((state) => state.user);
  const [quantities, setQuantities] = useState({}); // Store quantities for each item
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items
  const [showTransactionSuccess, setShowTransactionSuccess] = useState(false); // State for showing transaction success screen
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const {
    wishlistItems,
    toggleWishlist,
    removeFromWishlist,
    isWishlistSelected,
    setWishlistItems,
    updateWishlistItems,
  } = useWishlist();
  const[data, setData] = useState(wishlistItems);
  const fetchCartData = async () => {
    let response, data;
    try {
      response = await fetch(
        "http://localhost:4000/api/cars/"+user._id+"/cart"
      );
      data = await response.json();
      console.log("api: "+JSON.stringify(data));
      if (data === undefined){
        setData(AllListingsDataConstants);
      }
      data.map((item) => {
        item["checked"] = false;
      });
      setData(data); // Update the state with fetched data
    } catch (error) {
      console.log("response: "+JSON.stringify(data));
      setData(AllListingsDataConstants);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const navigation = useNavigation();
  console.log("data", data);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCheckout = () => {
    setModalVisible(false); //close it incase open

    // Get selected items
    const selectedItemsList = data.filter((item) =>
      selectedItems.includes(item.id)
    );

    // Remove the selected items from the wishlist
    selectedItemsList.forEach((item) => {
      removeFromWishlist(item);
    });

    // Clear selected items and quantities
    setSelectedItems([]);
    setQuantities({});

    navigation.navigate("TransactionAuction");
  };

  const EmptyWishlistMessage = () => (
    <View style={styles.container}>
      <Text>No items found in the cart.</Text>
    </View>
  );

  if (!data || data.length === 0) {
    return <EmptyWishlistMessage />;
  }

  const handleDeleteItem = (itemId) => {
    console.log("Deleting", itemId);
    const item = data.find((item) => item.id === itemId);

    if (item) {
      removeFromWishlist(item);
    }

    if (data.length === 0) {
      return <EmptyWishlistMessage />;
    }
  };

  const toggleCheckbox = (itemId) => {
    // Find the item you want to update in the wishlistItems
    const updatedWishlist = data.map((item) => {
      if (item._id === itemId) {
        // Toggle the checked state for the item
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    // // Update the wishlist
    setData(updatedWishlist);

    // setSelectedItems((prevSelectedItems) => {
    //   if (prevSelectedItems.includes(itemId)) {
    //     return prevSelectedItems.filter((item) => item.id !== itemId);
    //   } else {
    //     return [...prevSelectedItems, itemId];
    //   }
    // });
    console.log("halo")
  };

  // Function to calculate the total price based on selected items
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    data.map((item) =>{
      if (item.checked)
        totalPrice += item.price;
    })
    return totalPrice; // Format total price to 2 decimal places
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
  const commaNumber = (x) => {
    if (x === undefined) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.itemName}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <CheckBox
                size={17}
                checked={item.checked}
                onPress={() => toggleCheckbox(item._id)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#0077B5"
                label=""
                containerStyle={styles.checkboxContainer} // Add this line to apply custom styles
              />
              <Image source={item.images} style={styles.itemImage} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>
                  <Text style={{ fontWeight: "bold" }}>{item.brand + " " + item.model}</Text>
                </Text>
                <Text style={styles.itemText}>{calculateDuration(item.registration_date)}</Text>
                <Text style={styles.itemText}>
                  <Text
                    style={{
                      color: "#0077B5",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {"$"+commaNumber(item.price)}
                  </Text>
                </Text>
              </View>

              <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                  <MaterialIcons
                    name="delete-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => showModal()}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {"$"+commaNumber(calculateTotalPrice())+".00"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}> Confirmation</Text>
            <Text style={styles.modalSubMessage2}>
              {" "}
              You are about to pay{" "}
              <Text style={{ color: "#0077B5" }}>${calculateTotalPrice()}</Text>
            </Text>
            <Text style={styles.modalSubMessage}>Payment Method:</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => {
                  handleCheckout();
                  setModalVisible(false);
                }}
              >
                <Image
                  style={{ alignSelf: "center", width: 35, height: 25 }}
                  source={require("../assets/mastercard.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => {
                  handleCheckout();
                  setModalVisible(false);
                }}
              >
                <Image
                  style={{ alignSelf: "center", width: 50, height: 15 }}
                  source={require("../assets/VISA.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => {
                  handleCheckout();
                  setModalVisible(false);
                }}
              >
                <Image
                  style={{ alignSelf: "center", width: 60, height: 15 }}
                  source={require("../assets/paypal.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>
                Let me review my cart again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const WishlistPage = ({ navigation }) => {
  return (
    <View style={styles.maincontainer}>
      <Tab.Navigator>
        <Tab.Screen name="Checkout" component={CheckoutScreen} />
        <Tab.Screen name="Auction" component={AuctionScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    padding: 12,
  },
  itemContainer: {
    marginTop:10,
    marginBottom: 10,
    backgroundColor: "white",
    //paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 5, // Add elevation for Android shadow
      },
      ios: {
        shadowColor: "black", // Set shadow color for iOS
        shadowOffset: { width: 0, height: 10 }, // Set shadow offset
        shadowOpacity: 0.5, // Set shadow opacity
        shadowRadius: 2, // Set shadow radius
      },
    }),
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginLeft: 0,
    borderRadius: 5,
    objectFit: "contain",
  },
  itemTextContainer: {
    flex: 1,
    width: 150,
  },
  itemText: {
    fontSize: 16,
    color: "black",
  },

  checkboxContainer: {
    width: 10, // Set the width of the checkbox container
    padding: 0,
    justifyContent: "flex-start",
  },

  counterContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    width: 90, // Customize the width here
    height: 30,
    borderWidth: 1,
    borderColor: "#0077B5",
    justifyContent: "space-between", // Center content horizontally
  },
  counterText: {
    fontSize: 16,
    width: 30,
    height: 30,
    color: "#0077B5",
    textAlign: "center", // Center text horizontally
    lineHeight: 30, // Ensure the line height is equal to the container height
  },

  counterButton: {
    width: 30,
    height: 30,
    //borderWidth: 1,
    //borderColor: '#0077B5',
    justifyContent: "center", // Optional: Center the icon vertically
    alignItems: "center", // Optional: Center the icon horizontally
  },

  checkoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#00A859",
    borderRadius: 10,
    //marginLeft: 15,
    //marginRight: 15,
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00A859",
    padding: 10,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  checkoutButtonContainer: {
    flex: 1, // Take up the remaining space
    paddingLeft: 20, // Add left padding
    paddingRight: 10, //Add right padding
  },

  gradientLine: {
    height: 5, // Adjust the height as needed
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalMessage: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0077B5",
  },
  modalSubMessage: {
    fontSize: 14,
    textAlign: "center",
  },
  modalSubMessage2: {
    fontSize: 14,
    textAlign: "center",
  },
  modalButtonContainer: {
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
  modalButton1: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 7, // Increase vertical padding to make the button taller
    paddingHorizontal: 12,
  },
  modalButton2: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#DB0A0A",
    paddingVertical: 7, // Increase vertical padding to make the button taller
    paddingHorizontal: 12,
  },
  termsAndConditions: {
    alignItems: "center",
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
  },
  termsLink: {
    color: "#0077B5",
    fontSize: 12,
    textDecorationLine: "underline",
  },

  modalContainer2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent2: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default WishlistPage;