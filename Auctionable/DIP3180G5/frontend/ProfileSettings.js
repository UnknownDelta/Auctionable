import React from 'react';
import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const backgroundImage = require('../assets/background3.png');

function Settings() {

  const navigation = useNavigation();

  const handleSignOut = () => {
    // Implement your sign-out logic here
    // For example, navigate to the sign-in screen or call a sign-out API
    // You may use AsyncStorage, Redux, or any state management library to manage user authentication state
    // For illustration purposes, we'll navigate to the SignIn screen
    navigation.navigate('SignIn');
  };

  const handleChangePassword = () => {
    // Implement your change password logic here
    // You may navigate to a change password screen or show a modal for changing password
    // For illustration purposes, we'll log a message to the console
    console.log("Change Password clicked");
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{backgroundColor: '#F5F5FA'}}>

        <TouchableOpacity
            style={{backgroundColor: "white", padding: 12, marginBottom: 20, borderRadius: 8, flexDirection: "row", justifyContent: "space-between",}}
            onPress={() => {
              navigation.navigate("EditPasswordScreen")
            }}
          >
            <Text style={{color: "#5D5B5B", textAlign: "left"}}>Notification</Text>
            <Icon name="angle-right" size={20} color="#5D5B5B" style={{alignSelf: "center"}} />
          </TouchableOpacity>

        {/* Sign Out Button */}
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={{ marginTop: 20, backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Sign Out</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Settings;