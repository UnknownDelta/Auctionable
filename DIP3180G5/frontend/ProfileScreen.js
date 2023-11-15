import * as React from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity,StyleSheet  } from 'react-native';
import { Auth } from 'aws-amplify';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";


const ProfileScreen = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      console.log('Successfully signed out');  
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 ,padding: 16}}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: "bold"}}>
            Activity
          </Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              navigation.navigate("NotificationMain")
            }}
          >
            <Text style={styles.optionButtonText}>Notification</Text>
            <Icon name="angle-right" size={20} color="#5D5B5B" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
           style={styles.optionButton}
            onPress={() => {
              navigation.navigate("ProfileAuctionPage")
            }}
          >
            <Text style={styles.optionButtonText}>Auctions</Text>
            <Icon name="angle-right" size={20} color="#5D5B5B" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
           style={styles.optionButton}
            onPress={() => {
              navigation.navigate("PurchaseHistoryPage")
            }}
          >
            <Text style={styles.optionButtonText}>Purchase History</Text>
            <Icon name="angle-right" size={20} color="#5D5B5B" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: "center" }}>
          <Text style={{ marginTop:20,fontSize: 20, marginBottom: 20, fontWeight: "bold" }}>
            General
          </Text>
          <TouchableOpacity style={styles.optionButton}
            onPress={() => {
              navigation.navigate("ProfileSettingsPage")
            }}
          >
            <Text style={styles.optionButtonText}>Settings</Text>
            <Icon name="angle-right" size={20} color="#5D5B5B" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}
            onPress={() => {
              navigation.navigate("ProfileSettingsPage")
            }}
          >
            <Text style={styles.optionButtonText}>Settings</Text>
            <Icon name="angle-right" size={20} color="#5D5B5B" style={styles.icon} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={{ backgroundColor: '#00A859', padding: 13, borderRadius: 10, marginBottom: 30, width: '80%', alignItems: 'center' }}>
              <Text style={{ fontSize: 30, fontWeight: 700, color: 'white' }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
  },
  optionButton: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButtonText: {
    color: "#5D5B5B",
    textAlign: "left",
  },
  icon: {
    alignSelf: "center",
  },
  contentContainer:{
    backgroundColor:"#F5F5FA",
  }
});
export default ProfileScreen;