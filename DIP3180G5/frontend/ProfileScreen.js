import * as React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { Auth } from 'aws-amplify';

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            You are on Profile Screen
          </Text>
          <Button
            title="Logout"
            onPress={handleLogout}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        >
          React Native Bottom Navigation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "grey",
          }}
        >
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
