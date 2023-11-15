import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Animated, Easing, FlatList, Text} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

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
const tableDataSample = {
  tableHead: [ 'Name', 'Amount', 'Date', 'Time' ],
  widthArr: [90, 90, 100, 120,],
  tableData: [['Alice', '100', '2023-10-25', '10:00 AM'],
  ['Bob', '90','2023-10-25', '10:00 AM'],
  ['Barker', '10','2023-10-25', '10:00 AM'],
  ['Dave', '20',  '2023-10-25', '10:00 AM'],
  ['Elison', '40',  '2023-10-25', '10:00 AM'],
  ]
};
const TableTwo = () => {
  const [data, setData] = React.useState(tableDataSample);
  return (
      <View style={styles.containers}>
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
const Podium = ({ animation }) => {
  const rectangleHeight1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400], 
  });
  const rectangleHeight2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], 
  });
  const rectangleHeight3 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
        <View style={styles.rectanglesContainer}>
          <Animated.View
            style={[styles.rectangle2, { height: rectangleHeight2 }]}
          />
          <Animated.View
            style={[styles.rectangle1, styles.shadow, { height: rectangleHeight1 }]}
          />
          <Animated.View
            style={[styles.rectangle3, styles.pushToBack, { height: rectangleHeight3 }]}
          />
        </View>
        <View style={styles.horizontalLine} />
    </View>
  );
};

const RankList = ({ data }) => {
  return (
    <View style={styles.rankingsContainer}>
          <FlatList
            data={bids}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.rankCard} key={index}>
                <Text>{item.name}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.date}</Text>
                <Text>{item.time}</Text>
              </View>
            )}
          />
        </View>
  );
};

const LeaderBoard = () => {
  const [animation] = useState(new Animated.Value(0));
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1, 
      duration: 1000, 
      easing: Easing.linear, 
      useNativeDriver: false, 
    }).start(() => {
      // Animation is complete, activate the confetti cannon
      setIsConfettiActive(true);
    });
  }, []);
  
  return (
      <View style={styles.container}>
        <Podium animation={animation} />
        
        <Animatable.View animation="fadeOut" duration={2000} delay={4000} style={styles.confettiContainer}>
          {isConfettiActive && <ConfettiCannon count={200} origin={{ x: 200, y: 1000 }} />}
        </Animatable.View>
        <TableTwo/>
      </View>
    );
  };

const styles = StyleSheet.create({
  containers: { width:400, justifyContent:'center', marginTop:-300, },
  rowSection: { height: 60, backgroundColor: '#E7E6E1' },
  head: { height: 44, backgroundColor: 'darkblue' },
  headText: { fontSize: 15, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
  text: { margin: 6, fontSize: 12, textAlign: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  horizontalLine: {
    position: 'absolute',
    bottom: 300, 
    width: '100%',
    height: 6, 
    backgroundColor: 'black', 
  },
  rectanglesContainer: {
    position: 'absolute',
    bottom: 300, // Adjust the top value to position the line
    flexDirection: 'row',
    alignItems: 'flex-end', // Align the rectangles with the top of the parent
  },
  rectangle1: {
    width: 100,
    height: 400,
    backgroundColor: 'blue',
    zIndex: 1,
  },
  rectangle2: {
    width: 100,
    height: 300,
    backgroundColor: 'blue', // Change the color as needed
  },
  rectangle3: {
    width: 100,
    height: 200,
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
});

export default LeaderBoard;
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Animated, Easing, FlatList, Text} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

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
const tableDataSample = {
  tableHead: [ 'Name', 'Amount', 'Date', 'Time' ],
  widthArr: [90, 90, 100, 120,],
  tableData: [['Alice', '100', '2023-10-25', '10:00 AM'],
  ['Bob', '90','2023-10-25', '10:00 AM'],
  ['Barker', '10','2023-10-25', '10:00 AM'],
  ['Dave', '20',  '2023-10-25', '10:00 AM'],
  ['Elison', '40',  '2023-10-25', '10:00 AM'],
  ]
};
const TableTwo = () => {
  const [data, setData] = React.useState(tableDataSample);
  return (
      <View style={styles.containers}>
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
const Podium = ({ animation }) => {
  const rectangleHeight1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400], 
  });
  const rectangleHeight2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300], 
  });
  const rectangleHeight3 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
        <View style={styles.rectanglesContainer}>
          <Animated.View
            style={[styles.rectangle2, { height: rectangleHeight2 }]}
          />
          <Animated.View
            style={[styles.rectangle1, styles.shadow, { height: rectangleHeight1 }]}
          />
          <Animated.View
            style={[styles.rectangle3, styles.pushToBack, { height: rectangleHeight3 }]}
          />
        </View>
        <View style={styles.horizontalLine} />
    </View>
  );
};

const RankList = ({ data }) => {
  return (
    <View style={styles.rankingsContainer}>
          <FlatList
            data={bids}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.rankCard} key={index}>
                <Text>{item.name}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.date}</Text>
                <Text>{item.time}</Text>
              </View>
            )}
          />
        </View>
  );
};

const LeaderBoard = () => {
  const [animation] = useState(new Animated.Value(0));
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1, 
      duration: 1000, 
      easing: Easing.linear, 
      useNativeDriver: false, 
    }).start(() => {
      // Animation is complete, activate the confetti cannon
      setIsConfettiActive(true);
    });
  }, []);
  
  return (
      <View style={styles.container}>
        <Podium animation={animation} />
        
        <Animatable.View animation="fadeOut" duration={2000} delay={4000} style={styles.confettiContainer}>
          {isConfettiActive && <ConfettiCannon count={200} origin={{ x: 200, y: 1000 }} />}
        </Animatable.View>
        <TableTwo/>
      </View>
    );
  };

const styles = StyleSheet.create({
  containers: { width:400, justifyContent:'center', marginTop:-300, },
  rowSection: { height: 60, backgroundColor: '#E7E6E1' },
  head: { height: 44, backgroundColor: 'darkblue' },
  headText: { fontSize: 15, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
  text: { margin: 6, fontSize: 12, textAlign: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  horizontalLine: {
    position: 'absolute',
    bottom: 300, 
    width: '100%',
    height: 6, 
    backgroundColor: 'black', 
  },
  rectanglesContainer: {
    position: 'absolute',
    bottom: 300, // Adjust the top value to position the line
    flexDirection: 'row',
    alignItems: 'flex-end', // Align the rectangles with the top of the parent
  },
  rectangle1: {
    width: 100,
    height: 400,
    backgroundColor: 'blue',
    zIndex: 1,
  },
  rectangle2: {
    width: 100,
    height: 300,
    backgroundColor: 'blue', // Change the color as needed
  },
  rectangle3: {
    width: 100,
    height: 200,
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
});

export default LeaderBoard;