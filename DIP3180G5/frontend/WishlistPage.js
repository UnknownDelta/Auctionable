import React, { useState } from "react";
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

const Tab = createMaterialTopTabNavigator();

const AuctionScreen = () => {
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

  // Dummy data for testing
  const [dummyWishlistItems, setDummyWishlistItems] = useState([
    {
      id: "1",
      itemName: "Helmet Lightweight",
      itemPrice: "$10",
      itemCondition: "New",
      itemPicture: require("../assets/helmet.png"),
      checked: false, // Track the checked state
    },
    // Add more dummy items as needed
  ]);

  const navigation = useNavigation();
  console.log("wishlistItems", wishlistItems);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCheckout = () => {
    setModalVisible(false); //close it incase open

    // Get selected items
    const selectedItemsList = wishlistItems.filter((item) =>
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

  if (!wishlistItems || wishlistItems.length === 0) {
    return <EmptyWishlistMessage />;
  }

  const handleDeleteItem = (itemId) => {
    console.log("Deleting", itemId);
    const item = wishlistItems.find((item) => item.id === itemId);

    if (item) {
      removeFromWishlist(item);
    }

    if (wishlistItems.length === 0) {
      return <EmptyWishlistMessage />;
    }
  };

  const toggleCheckbox = (itemId) => {
    // Find the item you want to update in the wishlistItems
    const updatedWishlist = wishlistItems.map((item) => {
      if (item.id === itemId) {
        // Toggle the checked state for the item
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    // Update the wishlist
    updateWishlistItems(updatedWishlist);

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((item) => item.id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  // Function to calculate the total price based on selected items
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const itemId of selectedItems) {
      const item = wishlistItems.find((item) => item.id === itemId);
      if (item) {
        const itemPrice = parseFloat(item.itemPrice.replace("$", ""));
        const itemQuantity = quantities[itemId] || 1;
        totalPrice += itemPrice * itemQuantity;
      }
    }
    return totalPrice.toFixed(2); // Format total price to 2 decimal places
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item, index) => `${item.itemName}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <CheckBox
                size={17}
                checked={item.checked}
                onPress={() => toggleCheckbox(item.id)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#0077B5"
                label=""
                containerStyle={styles.checkboxContainer} // Add this line to apply custom styles
              />
              <Image source={item.itemPicture} style={styles.itemImage} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>
                  <Text style={{ fontWeight: "bold" }}>{item.itemName}</Text>
                </Text>
                <Text style={styles.itemText}>{item.itemCondition}</Text>
                <Text style={styles.itemText}>
                  <Text
                    style={{
                      color: "#0077B5",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {item.itemPrice}
                  </Text>{" "}
                  each
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
          onPress={() => navigation.navigate("CostBreakdownPage")}
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
              ${calculateTotalPrice()}
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
    </View>
  );
};

const CheckoutScreen = () => {
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

  const navigation = useNavigation();
  console.log("wishlistItems", wishlistItems);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCheckout = () => {
    setModalVisible(false); //close it incase open

    // Get selected items
    const selectedItemsList = wishlistItems.filter((item) =>
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

  if (!wishlistItems || wishlistItems.length === 0) {
    return <EmptyWishlistMessage />;
  }

  const handleDeleteItem = (itemId) => {
    console.log("Deleting", itemId);
    const item = wishlistItems.find((item) => item.id === itemId);

    if (item) {
      removeFromWishlist(item);
    }

    if (wishlistItems.length === 0) {
      return <EmptyWishlistMessage />;
    }
  };

  const toggleCheckbox = (itemId) => {
    // Find the item you want to update in the wishlistItems
    const updatedWishlist = wishlistItems.map((item) => {
      if (item.id === itemId) {
        // Toggle the checked state for the item
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    // Update the wishlist
    updateWishlistItems(updatedWishlist);

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((item) => item.id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  // Function to calculate the total price based on selected items
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const itemId of selectedItems) {
      const item = wishlistItems.find((item) => item.id === itemId);
      if (item) {
        const itemPrice = parseFloat(item.itemPrice.replace("$", ""));
        const itemQuantity = quantities[itemId] || 1;
        totalPrice += itemPrice * itemQuantity;
      }
    }
    return totalPrice.toFixed(2); // Format total price to 2 decimal places
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item, index) => `${item.itemName}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <CheckBox
                size={17}
                checked={item.checked}
                onPress={() => toggleCheckbox(item.id)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#0077B5"
                label=""
                containerStyle={styles.checkboxContainer} // Add this line to apply custom styles
              />
              <Image source={item.itemPicture} style={styles.itemImage} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>
                  <Text style={{ fontWeight: "bold" }}>{item.itemName}</Text>
                </Text>
                <Text style={styles.itemText}>{item.itemCondition}</Text>
                <Text style={styles.itemText}>
                  <Text
                    style={{
                      color: "#0077B5",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {item.itemPrice}
                  </Text>{" "}
                  each
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
              ${calculateTotalPrice()}
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
