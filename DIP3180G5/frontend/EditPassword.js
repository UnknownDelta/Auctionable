import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ChangePassword() {
  const [user, setUser] = useState({
    username: 'user1',
    password: 'password1',
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Validate inputs
    if (oldPassword !== user.password) {
      Alert.alert('Change Unsuccessful', 'Please enter the correct old password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Change Unsuccessful', 'New passwords do not match .');
      return;
    }

    // Update user password locally
    setUser((prevUser) => ({ ...prevUser, password: newPassword }));

    // Reset input fields
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    Alert.alert('Change Successful', 'You have successfully changed your password.');
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <Text style={styles.label}>Old Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter old password"
        value={oldPassword}
        onChangeText={(text) => setOldPassword(text)}
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChangePassword;