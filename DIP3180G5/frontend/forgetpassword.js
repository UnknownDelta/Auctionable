import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Modal from 'react-native-modal';

const backgroundImage = require("../assets/background.png");

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    robotobold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

const ForgetPasswordScreen = ({ navigation }) => {
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSend = () => {
    // Implement your logic to send a password reset email
    console.log(`Send reset email to: ${email}`);

    setModalVisible(true);
};

const closeModal = () => {
  // Close the modal
  setModalVisible(false);
};

  if (fontsloaded) {
    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1}}>
          <View style={{ paddingHorizontal: 25 }}>
            <Text style={{ fontFamily: 'roboto', fontSize: 50, fontWeight: '500', color: '#fff',marginTop: 50, marginBottom: 15}}>Forgot Password</Text>
            <Text style={{ fontFamily: 'roboto', fontSize: 20, color: '#fff', marginBottom: 20 }}>Enter your email</Text>
            <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, marginBottom: 15 }}>
              <TextInput
                placeholder='Email'
                placeholderTextColor="#FFF"
                style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }}
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <TouchableOpacity onPress={handleSend} style={{ backgroundColor: '#00A859', padding: 13, borderRadius: 10, marginBottom: 30 }}>
              <Text style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Send</Text>
            </TouchableOpacity>

            {/* Modal for confirmation message */}
            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>An email has been sent to you!</Text>
                <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Return to login page</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  } else {
    return (
      <AppLoading
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
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontFamily: 'roboto',
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#00A859',
      padding: 13,
      borderRadius: 10,
    },
    modalButtonText: {
      fontFamily: 'roboto',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
      color: '#fff',
    },
  });

export default ForgetPasswordScreen;