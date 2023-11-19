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
import { useNavigation } from "@react-navigation/native";
import { Table, Row, Rows } from 'react-native-table-component';
import { useRoute } from '@react-navigation/native';
import { AppState } from 'react-native';


const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const ImageSection = (itemId) => {
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

const itemConstant = {
  "_id": "655a12abf52baefc4c9f5f42",
  "brand": "BMW",
  "model": "M5",
  "colour": "Black",
  "fuel_type": "Hybrid",
  "mileage": 20000,
  "buyout_price": 550000,
  "starting_bid": 400000,
  "reserve_price": 500000,
  "ending_time": "11-11-2011|10:24:30",
  "description": "The BMW M5 2011 is an epitome of automotive excellence, combining luxury and high-performance seamlessly. This iconic sports sedan boasts a powerful 4.4-liter V8 engine, delivering an exhilarating driving experience with 560 horsepower and lightning-quick acceleration. Its sophisticated design showcases a perfect blend of elegance and aggression, featuring aerodynamic enhancements, distinctive M styling, and luxurious interiors.",
  "years_used": 3,
  "registration_date": "10-9-2008",
  "category": "Car",
  "new_used": false,
  "images": [
  "https://imgd.aeplcdn.com/370x208/n/jz5684a_1522493.jpg?q=80",
  "https://imgd.aeplcdn.com/370x208/n/jz5684a_1522493.jpg?q=80"
  ],
  "seller_id": "65389826e5bccac6ac77cac7",
  "seller_name": "Bryan",
  "seller_image": "https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg",
  "sold": false,
  "highestBidder": "654b39525043e64ab92e85bd",
  "createdAt": "2023-11-19T13:50:35.073Z",
  "updatedAt": "2023-11-19T13:50:35.073Z",
  "__v": 0
  }

const DetailTabContent = (itemId) => {
  const [data, setData] = useState(itemId.route.params.itemId);
  console.log("itemId in DetailTabContent: ", itemId)
  console.log("data in DetailTabContent:", data);
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
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Image
            source={data.seller_image === "NA" ? require("../assets/appIcon.png") : {uri: data.seller_image}}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>
            {data.seller_name}
          </Text>
        </View>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Name:</Text> {data.brand + " " + data.model}
        </Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Starting Bid:</Text> ${data.starting_bid}
        </Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Condition:</Text> used for {calculateDuration(data.registration_date)}
        </Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", textAlign: 'justify' }}>Description:</Text> {data.description}
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
const BidTabContent = (itemId) => {
  const [bidAmount, setBidAmount] = useState(0); // Initialize the bid amount state
  const [highestBid, setHighestBid] = useState(53000); // Initialize the highest bid state
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const [data, setData] = useState(itemId.route.params.itemId);
  console.log("itemId in BidTabContent: ", data)
  console.log("itemId in BidTabContent: ",itemId.route.params.itemId);
  console.log(data)

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
    let newHighestBid = highestBid;
    if (bidAmount>newHighestBid) {
      newHighestBid = bidAmount;
    }
    setHighestBid(newHighestBid);
    closeModal();
    navigation.navigate("AuctionSuccessPage");
  };
  const commaNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <View style={{ flex: 1, padding: 18, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Highest Bid:</Text>
          <Text style={{ fontSize: 30, color: "grey" }}>
            $<Text style={{ color: "black" }}>{commaNumber(highestBid)}</Text>
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "right" }}
          >
            Buy Out Price:
          </Text>
          <Text style={{ fontSize: 30, textAlign: "right", color: "grey" }}>
            $<Text style={{ color: "black" }}>{commaNumber(data.buyout_price)}</Text>
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Reserve Price</Text>
        <Text style={{ fontSize: 30, color: "grey" }}>
          $<Text style={{ color: "black" }}>{commaNumber(data.reserve_price)}</Text>
        </Text>
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

const handleTermsAndConditionsClick = ({ visible, onClose }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer2}>
        <View style={styles.modalContent2}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle2}>Terms and Conditions</Text>
          <ScrollView style={styles.scrollContainer}>
            <Text>1. Only bidders who have been verified, accepted</Text>
            <Text>   our terms and conditions, and executed the</Text>
            <Text>   Bidding Agreement are contractually binding</Text>
            <Text>2. All bids are contractually binding.</Text>
            <Text>3. General application users are able to view the</Text>
            <Text>   highest bid only. Registered bidders are able to</Text>
            <Text>   see all bids</Text>
            <Text>4. Any bid placeed within 3 minutes of closing</Text>
            <Text>   extends the closing by another 3 minutes. There</Text>
            <Text>   is no limit to this extension.</Text>
            <Text>5. All auctions, unless otherwise stated, shall be</Text>
            <Text>   conducted in Singapore dollars.</Text>
            <Text>6. All auctions shall be subject to a minimum price</Text>
            <Text>   determined by Auctionable and any bid of a</Text>
            <Text>   value less than such minimum price will be</Text>
            <Text>   declined</Text>
            <Text>7. The increase in each bid will be regulated by</Text>
            <Text>   Auctionable.</Text>
            <Text>8. All auctions are subject to a reserve price and</Text>
            <Text>   Auctionable shall have the right at any time at</Text>
            <Text>   its discretion to withdraw the property from the </Text>
            <Text>   Online Auction without disclosing the reserve</Text>
            <Text>   price.</Text>
            <Text>9. Any vendor reserves the right of bidding itself or</Text>
            <Text>   by its agents as often as it shall please.</Text>
            <Text>10. Where the reserve price has been met, the</Text>
            <Text>    vehicle will be sold to the highest bidder at the</Text>
            <Text>    end of the auction period</Text>
            <Text>11. In the event of a dispute in respect of any bid,</Text>
            <Text>    Auctionable reserves the right to re-open</Text>
            <Text>    bidding or determine which bidder submitted</Text>
            <Text>    the Successful Bid.</Text>
            <Text>12. All prices, offers and bids, unless stated</Text>
            <Text>    otherwise, exclude applicable duties, taxes and</Text>
            <Text>    levies including without limitation stamp duty.</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  const [modalVisible2, setModalVisible2] = useState(false);


   // Function to open the first modal
   const handleFirstModalClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Function to open the second modal (Terms and Conditions)
  const handleTermsAndConditionsClick = () => {
    // Close the first modal
    setModalVisible(false);
    // Open the second modal
    setModalVisible2(true);
  };

  // Function to close the second modal (Terms and Conditions)
  const closeModal2 = () => {
    setModalVisible2(false);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 16, alignItems: "center" }}>
      {/* <CountDown
        until={60 * 10 + 30}
        size={20}
        onFinish={() => alert("Finished")}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "red" }}
        timeToShow={["H", "M", "S"]}
        timeLabels={{ h: "HH", m: "MM", s: "SS" }}
        style={{ marginTop: -20 }}
      /> */}
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
            <View style={styles.termsAndConditions}>
              <Text style={styles.termsText}>
                By confirming bidding, you agree with our{" "}
                <TouchableOpacity onPress={handleTermsAndConditionsClick}>
                  <Text style={styles.termsLink}>Terms and Conditions</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={modalVisible2}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal2}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle2}>Terms and Conditions</Text>
            <ScrollView style={styles.scrollContainer}>
            <Text>1.   Only bidders who have been verified, </Text>
            <Text>       accepted our terms and conditions, and</Text>
            <Text>       executed the Bidding Agreement are</Text>
            <Text>       contractually binding</Text>
            <Text>2.   All bids are contractually binding.</Text>
            <Text>3.   General application users are able to view</Text>
            <Text>       the highest bid only. Registered bidders </Text>
            <Text>       are able to see all bids</Text>
            <Text>4.   Any bid placeed within 3 minutes of</Text>
            <Text>       closing extends the closing by another 3</Text>
            <Text>       minutes. There is no limit to this</Text>
            <Text>       extension.</Text>
            <Text>5.   All auctions, unless otherwise stated,</Text>
            <Text>       shall be conducted in Singapore dollars.</Text>
            <Text>6.   All auctions shall be subject to a</Text>
            <Text>       minimum price determined by</Text>
            <Text>       Auctionable and any bid of a value less</Text>
            <Text>       than such minimum price will be declined</Text>
            <Text>7.   The increase in each bid will be regulated </Text>
            <Text>       by Auctionable.</Text>
            <Text>8.   All auctions are subject to a reserve price</Text>
            <Text>       and Auctionable shall have the right at</Text>
            <Text>       any time at its discretion to withdraw the </Text>
            <Text>       property from the Online Auction without</Text>
            <Text>       disclosing the reserve price.</Text>
            <Text>9.   Any vendor reserves the right of bidding</Text>
            <Text>       itself or by its agents as often as it shall</Text>
            <Text>       please.</Text>
            <Text>10. Where the reserve price has been met,</Text>
            <Text>       the vehicle will be sold to the highest</Text>
            <Text>       bidder at the end of the auction period</Text>
            <Text>11. In the event of a dispute in respect of any</Text>
            <Text>       bid, Auctionable reserves the right to</Text>
            <Text>       re-open bidding or determine which</Text>
            <Text>       bidder submitted the Successful Bid.</Text>
            <Text>12. All prices, offers and bids, unless stated</Text>
            <Text>       otherwise, exclude applicable duties,</Text>
            <Text>       taxes and levies including without</Text>
            <Text>       limitation stamp duty.</Text>
            </ScrollView>
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

// const Podium = ({ animation, showFirst, showSecond, showThird }) => {
//   const rectangleHeight1 = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 160], 
//   });
//   const rectangleHeight2 = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 130], 
//   });
//   const rectangleHeight3 = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 100],
//   });

//   return (
//     <View style={styles.containers}>
//         <View style={styles.rectanglesContainer}>
//           <Animated.View
//             style={[styles.rectangle2, { height: rectangleHeight2 }]}
//           />
//           <Animated.View
//             style={[styles.rectangle1, styles.shadow, { height: rectangleHeight1 }]}
//           />
//           <Animated.View
//             style={[styles.rectangle3, { height: rectangleHeight3 }]}
//           />
//         </View>
//         <View style={styles.horizontalLine} />
//         {showThird && (
//         <View style={styles.thirdBidInfo}>
//           <Text style={styles.textWithCustomFont}>{third.name}</Text>
//           <Text style={styles.textWithCustomFont}>{third.amount}</Text>
//         </View>
//         )}
//         {showSecond && (
//           <View style={styles.secondBidInfo}>
//             <Text style={styles.textWithCustomFont}>{second.name}</Text>
//             <Text style={styles.textWithCustomFont}>{second.amount}</Text>
//           </View>
//         )}
//         {showFirst && (
//           <View style={styles.firstBidInfo}>
//             <Text style={styles.textWithCustomFont}>{first.name}</Text>
//             <Text style={styles.textWithCustomFont}>{first.amount}</Text>
//           </View>
//         )}

//     </View>
//   );
// };

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

  // useEffect(() => {
  //   Animated.timing(animation, {
  //     toValue: 1, 
  //     duration: 1000, 
  //     easing: Easing.linear, 
  //     useNativeDriver: false, 
  //   }).start(() => {
  //     setTimeout(() => {
  //       setShowThird(true);
  //     }, 500);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (showThird) {
  //     // Trigger the second action after a 1 second delay
  //     setTimeout(() => {
  //       setShowSecond(true);
  //     }, 1000);
  //   }
  // }, [showThird]);

  // useEffect(() => {
  //   if (showSecond) {
  //     // Trigger the third action after a 1 second delay
  //     setTimeout(() => {
  //       setShowFirst(true);
  //     }, 1000);
  //   }
  // }, [showSecond]);

  // useEffect(() => {
  //   if (showFirst) {
  //     setTimeout(() => {
  //       setIsConfettiActive(true);
  //     }, 0); // Setting a minimal delay to show the crown instantly when showFirst is true
  
  //     // Set the confetti to turn off after a delay
  //     setTimeout(() => {
  //       setIsConfettiActive(false);
  //     }, 5000); // Keep it active for 5 seconds
  //   }
  // }, [showFirst]);  
  
  return (
      <View style={styles.containers}>
        
        {/* <Podium animation={animation} showFirst={showFirst} showSecond={showSecond} showThird={showThird} isConfettiActive={isConfettiActive}/>
        {showFirst && (
                <Image
                source={require('../assets/crown.png')}
                style={styles.crownImage}
              />
      )} */}
        
        {/* <Animatable.View animation="fadeOut" duration={2000} delay={6000} style={styles.confettiContainer}>
          {isConfettiActive && (
            <ConfettiCannon count={200} origin={{ x: 200, y: 1000 }} fadeOut={true} fadeOutDelay={3000} />
          )}
        </Animatable.View> */}
        <TableTwo/>

      </View>
    );
};

const ContentSection = (params) => {
  console.log("params in ContentSection: ",params.params);
  let itemId = params.params;
  return (
    <View style={{ flex: 2 }}>
      <TopTab.Navigator>
        <TopTab.Screen name="Detail" component={DetailTabContent} initialParams={{ itemId }} />
        <TopTab.Screen name="Bids" component={BidTabContent} initialParams={{ itemId }}/>
        <TopTab.Screen name="Leaderboard" component={OtherSection} initialParams={{ itemId }}/>
      </TopTab.Navigator>
    </View>
  );
};

const ThreeTabScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;
  const [data, setData] = useState(itemConstant);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/cars/auctions/id=" + itemId
        );
        const dataJSON = await response.json();
        const parsedData = JSON.parse(JSON.stringify(dataJSON[0]));
        setData(parsedData);
        setIsLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.log("Error fetching item details:", error);
        setData(itemConstant);
        setIsLoading(false); // Set loading state to false on error
      }
    };

    fetchItemDetails();
  }, [itemId]); // Include itemId as a dependency

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ImageSection params={data} />
          <ContentSection params={data} />
        </>
      )}
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
    paddingLeft: 10,
    paddingRight: 10,
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
    margin:20,
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
    fontSize:12,
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
    margin:20,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0077B5",
  },
  modalTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0077B5",
  },
  scrollContainer: {
    maxHeight: 500, // Adjust the maximum height as needed
  },
});

export default ThreeTabScreen;
