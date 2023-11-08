import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Animated,
  Easing,
  ScrollView
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CountDown from "react-native-countdown-component";
import { useNavigation } from "@react-navigation/native";
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Animatable from 'react-native-animatable';
import { Table, Row, Rows } from 'react-native-table-component';

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
const tableDataSample = {
  tableHead: ['Pos.', 'Name', 'Amount', 'Date', 'Time' ],
  widthArr: [50,80, 80, 100, 100,],
  tableData: [['#1','Alice', '100', '2023-10-25', '10:00 AM'],
  ['#2','Bob', '90','2023-10-25', '10:00 AM'],
  ['#3','Barker', '10','2023-10-25', '10:00 AM'],
  ['#4','Dave', '20',  '2023-10-25', '10:00 AM'],
  ['#5','Elison', '40',  '2023-10-25', '10:00 AM'],
  ]
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

const TableTwo = () => {
  const [data, setData] = React.useState(tableDataSample);
  return (
      <View style={styles.tablecontainer}>
          <ScrollView horizontal={false}>
              <View>
                  <Table borderStyle={{ borderWidth: 0, }}>
                      <Row
                          data={data.tableHead}
                          widthArr={data.widthArr}
                          style={styles.head}
                          textStyle={styles.headText}
                      />
                  </Table>
                  <ScrollView>
                      <Table borderStyle={{ borderWidth: 0,}}>
                          {data.tableData.map((rowData, index) => (
                              <Row
                                  key={index}
                                  data={rowData}
                                  widthArr={data.widthArr}
                                  style={styles.rowSection}
                                  textStyle={styles.text}
                              />
                          ))}
                      </Table>
                  </ScrollView>
              </View>
          </ScrollView>
      </View>
  );
}
const BidTabContent = () => {
  const navigation = useNavigation();
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
    navigation.navigate("AuctionSuccessPage");
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

const bids = [
  { name: 'Alice', amount: 100, date: '2023-10-25', time: '10:00 AM' },
  { name: 'Bob', amount: 90, date: '2023-10-25', time: '10:30 AM' },
  { name: 'Dave', amount: 10, date: '2023-10-25', time: '11:00 AM' },
  { name: 'Elison', amount: 60, date: '2023-10-25', time: '11:30 AM' },
  { name: 'Greg', amount: 40, date: '2023-10-25', time: '12:00 AM' },
  { name: 'Hunter', amount: 30, date: '2023-10-25', time: '12:30 PM' },
  { name: 'Jacob', amount: 70, date: '2023-10-25', time: '01:00 PM' },
  { name: 'Zavier', amount: 80, date: '2023-10-25', time: '01:30 PM' },
  { name: 'Ferah', amount: 50, date: '2023-10-25', time: '02:30 PM' },
  { name: 'Natalie', amount: 20, date: '2023-10-25', time: '02:30 PM' },
];

const sortedBids = bids.slice().sort((a, b) => b.amount - a.amount);
const first = sortedBids[0];
const second = sortedBids[1];
const third = sortedBids[2];

const Podium = ({ animation, showFirst, showSecond, showThird }) => {
  const rectangleHeight1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 160], 
  });
  const rectangleHeight2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 130], 
  });
  const rectangleHeight3 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.containers}>
        <View style={styles.rectanglesContainer}>
          <Animated.View
            style={[styles.rectangle2, { height: rectangleHeight2 }]}
          />
          <Animated.View
            style={[styles.rectangle1, styles.shadow, { height: rectangleHeight1 }]}
          />
          <Animated.View
            style={[styles.rectangle3, { height: rectangleHeight3 }]}
          />
        </View>
        <View style={styles.horizontalLine} />
        {showThird && (
  <View style={styles.thirdBidInfo}>
    <Text style={styles.textWithCustomFont}>{third.name}</Text>
    <Text style={styles.textWithCustomFont}>{third.amount}</Text>
  </View>
)}
{showSecond && (
  <View style={styles.secondBidInfo}>
    <Text style={styles.textWithCustomFont}>{second.name}</Text>
    <Text style={styles.textWithCustomFont}>{second.amount}</Text>
  </View>
)}
{showFirst && (
  <View style={styles.firstBidInfo}>
    <Text style={styles.textWithCustomFont}>{first.name}</Text>
    <Text style={styles.textWithCustomFont}>{first.amount}</Text>
  </View>
)}

    </View>
  );
};

const RankList = ({ data }) => {

};

const LeaderBoard = () => {

  };

const OtherSection = () => {
  const [animation] = useState(new Animated.Value(0));
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1, 
      duration: 1000, 
      easing: Easing.linear, 
      useNativeDriver: false, 
    }).start(() => {
      setTimeout(() => {
        setShowThird(true);
      }, 500);
    });
  }, []);

  useEffect(() => {
    if (showThird) {
      // Trigger the second action after a 1 second delay
      setTimeout(() => {
        setShowSecond(true);
      }, 1000);
    }
  }, [showThird]);

  useEffect(() => {
    if (showSecond) {
      // Trigger the third action after a 1 second delay
      setTimeout(() => {
        setShowFirst(true);
      }, 1000);
    }
  }, [showSecond]);

  useEffect(() => {
    if (showFirst) {
      setTimeout(() => {
        setIsConfettiActive(true);
      }, 0); // Setting a minimal delay to show the crown instantly when showFirst is true
  
      // Set the confetti to turn off after a delay
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 5000); // Keep it active for 5 seconds
    }
  }, [showFirst]);  
  
  return (
      <View style={styles.containers}>
        
        <Podium animation={animation} showFirst={showFirst} showSecond={showSecond} showThird={showThird} isConfettiActive={isConfettiActive}/>
        {showFirst && (
                <Image
                source={require('../assets/crown.png')}
                style={styles.crownImage}
              />
      )}
        
        <Animatable.View animation="fadeOut" duration={2000} delay={6000} style={styles.confettiContainer}>
          {isConfettiActive && (
            <ConfettiCannon count={200} origin={{ x: 200, y: 1000 }} fadeOut={true} fadeOutDelay={3000} />
          )}
        </Animatable.View>
        <TableTwo/>

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
  tablecontainer:{
    width:400, justifyContent:'center', marginTop:-300, height:200,
  },
  containers: {    
    justifyContent: 'center',
    alignItems: 'center',
   
    flexDirection: 'column',
    zIndex:-1,
  paddingTop:280,
},
  rowSection: { height: 60, backgroundColor: '#E7E6E1' },
  head: { height: 44, backgroundColor: 'darkblue' },
  headText: { fontSize: 15, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
  text: { margin: 6, fontSize: 15, textAlign: 'center' },
 
  horizontalLine: {
    position: 'absolute',
    bottom: 300, 
    width: '100%',
    height: 6, 
    backgroundColor: 'black', 
  },
  rectanglesContainer: {
    
    bottom: 300, // Adjust the top value to position the line
    flexDirection: 'row',
    alignItems: 'flex-end', // Align the rectangles with the top of the parent
  },
  rectangle1: {
    width: 100,
    height: 50,
    backgroundColor: 'blue',
    zIndex: 1,
  },
  rectangle2: {
    width: 100,
    height: 50,
    backgroundColor: 'blue', // Change the color as needed
  },
  rectangle3: {
    width: 100,
    height: 50,
    backgroundColor: 'blue', // Change the color as needed
  },
  shadow: {
    shadowColor: 'black', // Shadow color
    shadowOffset: { width: -4, height: 0 }, // Negative width for the left shadow and positive width for the right shadow
    shadowOpacity: 0.3, // Adjust the opacity as needed
    shadowRadius: 10, // Adjust the radius as needed
  },  
  pushToBack: {
    zIndex: 0, // Lower zIndex to push it to the back
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rankingsContainer: {
    position: 'absolute',
    top: 0,
    marginTop: 550, // Adjust the top value as needed
    width: 380,
    flex: 1,
    height: 100,
  },
  rankCard: {
    backgroundColor: 'cyan',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection:'row',
  },

  crownImage: {
    position: 'absolute',
    marginTop: -80,
    top: 80, // Adjust the top value to position the crown on rect1
    left: 170, // Adjust the left value to position the crown on rect1
    width: 50, // Adjust the width of the crown
    height: 50, // Adjust the height of the crown
    zIndex: 2, // Set a higher z-index to display the crown on top
  },
  thirdBidInfo: {
    position: 'absolute',
    top: -170, // Adjust the top position as needed
    left: 225, // Adjust the left position as needed
    zIndex: 10, // Ensure it's displayed on top
  },
  secondBidInfo: {
    position: 'absolute',
    top: -200, // Adjust the top position as needed
    left: 25, // Adjust the left position as needed
    zIndex: 10, // Ensure it's displayed on top
  },
  firstBidInfo: {
    position: 'absolute',
    top: -230, // Adjust the top position as needed
    left: 120, // Adjust the left position as needed
    zIndex: 10, // Ensure it's displayed on top
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWithCustomFont: {
    fontSize: 20, // Define the font size or other styles as needed
    fontWeight: 'bold', // Apply font weight for boldness
    textAlign: 'center', // Center-align the text
  },  
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
