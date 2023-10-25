import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CountDown from "react-native-countdown-component";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const ImageSection = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/teslacar.jpeg")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

const DetailTabContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Image
            source={require("../assets/Aquasama.png")}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
            Aquasama
          </Text>
        </View>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Name:</Text> Tesla Model X
        </Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Base Price:</Text> $53,000
        </Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Condition:</Text> used/9 mnths
        </Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Description:</Text> {"\n"}Testing
        </Text>
      </View>
    </View>
  );
};

const BidTabContent = () => {
  const [bidAmount, setBidAmount] = useState(0); // Initialize the bid amount state
  const [highestBid, setHighestBid] = useState(53000); // Initialize the highest bid state
  const [modalVisible, setModalVisible] = useState(false); // State for the modal

  const closeModal = () => {
    setModalVisible(false);
  };

  const resetBid = () => {
    setBidAmount(0); // Reset the bid amount to 0
  };

  const handleBidButtonClick = (amount) => {
    setBidAmount(bidAmount + amount);
  };

  const handleConfirmBid = () => {
    // Add the current bid amount on top of the highest bid
    const newHighestBid = highestBid + bidAmount;
    setHighestBid(newHighestBid);
    closeModal();
  };
  return (
    <View style={{ flex: 1, padding: 18, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Highest Bid:</Text>
          <Text style={{ fontSize: 30, color: "grey" }}>
            $<Text style={{ color: "black" }}>{highestBid}</Text>
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "right" }}
          >
            Buy Out Price:
          </Text>
          <Text style={{ fontSize: 30, textAlign: "right", color: "grey" }}>
            $<Text style={{ color: "black" }}>73,500</Text>
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Your Bid:</Text>
        <Text style={{ fontSize: 10 }}>Select an amount to bid</Text>
        <Text style={{ fontSize: 30, color: "grey" }}>
          $<Text style={{ color: "black" }}>{bidAmount}</Text>
        </Text>
      </View>
      <ButtonSection handleBidButtonClick={handleBidButtonClick} />
      <LastSection
        resetBid={resetBid}
        handleConfirmBid={handleConfirmBid}
        bidAmount={bidAmount}
      />
    </View>
  );
};

const ButtonSection = ({ handleBidButtonClick }) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBidButtonClick(500)}
        >
          <Text style={styles.buttonText}>$500</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBidButtonClick(1000)}
        >
          <Text style={styles.buttonText}>$1000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBidButtonClick(2000)}
        >
          <Text style={styles.buttonText}>$2000</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBidButtonClick(5000)}
        >
          <Text style={styles.buttonText}>$5000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleBidButtonClick(10000)}
        >
          <Text style={styles.buttonText}>$10000</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LastSection = ({ resetBid, handleConfirmBid, bidAmount }) => {
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 16, alignItems: "center" }}>
      <CountDown
        until={60 * 10 + 30}
        size={20}
        onFinish={() => alert("Finished")}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "red" }}
        timeToShow={["H", "M", "S"]}
        timeLabels={{ h: "HH", m: "MM", s: "SS" }}
        style={{ marginTop: -20 }}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Submit Bid</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={resetBid}>
          <Text style={styles.buttonText}>Reset Bid</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}> Confirm Bid</Text>
            <Text style={styles.modalSubMessage2}>
              {" "}
              Are you sure you want to place a bid of{" "}
              <Text style={{ color: "#0077B5" }}>${bidAmount}?</Text>
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton1}
                onPress={() => {
                  handleConfirmBid();
                  resetBid(); //reset bid to $0
                  closeModal(); // Close the modal when confirming the bid
                }}
              >
                <Text style={styles.modalButtonText}>Confirm bid</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Cancel/Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const OtherSection = () => {
  return (
    <View style={{ flex: 2, padding: 16, backgroundColor: "white" }}>
      <Text>This is your content section. You can add your content here</Text>
    </View>
  );
};

const ContentSection = () => {
  return (
    <View style={{ flex: 2 }}>
      <TopTab.Navigator>
        <TopTab.Screen name="Detail" component={DetailTabContent} />
        <TopTab.Screen name="Bids" component={BidTabContent} />
        <TopTab.Screen name="Leaderboard" component={OtherSection} />
      </TopTab.Navigator>
    </View>
  );
};

const ThreeTabScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageSection />
      <ContentSection />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#00A859",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },

  button2: {
    alignItems: "center",
    backgroundColor: "#0077B5",
    borderRadius: 10,
    padding: 10,
  },

  buttonText: {
    color: "white",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 20,
  },
  content: {
    padding: 16,
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
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  modalSubMessage2: {
    fontSize: 12,
    textAlign: "center",
  },
  modalButtonContainer: {
    borderRadius: 10,
    padding: 10,
  },
  modalButtonText: {
    color: "white",
    textAlign: "center",
  },
  modalButton1: {
    marginTop: 10,
    backgroundColor: "#0077B5",
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
});

export default ThreeTabScreen;
