import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ColoursScreen({ route, navigation }) {
  const [selectedColours, setSelectedColours] = useState([]);
  const saveSelectedColoursToStorage = async (colours) => {
    try {
      await AsyncStorage.setItem('selectedColours', JSON.stringify(colours));
    } catch (error) {
      console.error('Error saving selected colours:', error);
    }
  };
  const loadSelectedColoursFromStorage = async () => {
    try {
      const savedColours = await AsyncStorage.getItem('selectedColours');
      if (savedColours !== null) {
        setSelectedColours(JSON.parse(savedColours));
      }
    } catch (error) {
      console.error('Error loading selected colours:', error);
    }
  };
  useEffect(() => {
    loadSelectedColoursFromStorage();
  }, []);

  const toggleBrand = (colour) => {
    let updatedColours;
    if (selectedColours.includes(colour)) {
      updatedColours = selectedColours.filter((b) => b !== colour);
    } else {
      updatedColours = [...selectedColours, colour];
    }
      setSelectedColours(updatedColours);
      saveSelectedColoursToStorage(updatedColours);
  };
  const applyColoursFilter = () => {
    navigation.navigate('Home', { selectedColours });
  };
  return (
    <ScrollView style ={globalStyles.brandContainer}>
        <View>
            <Text style={globalStyles.brandText}>Colours</Text>
        </View>
        <View style={globalStyles.row}>
            <TouchableOpacity
                onPress={() => toggleBrand('Black')}
                style={[globalStyles.category, {borderColor : selectedColours.includes('Black') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedColours.includes('Black') ? "#3388FF" : "#C1C0C9"}]}>Black</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('White')}
                style={[globalStyles.category, {borderColor : selectedColours.includes('White') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedColours.includes('White') ? "#3388FF" : "#C1C0C9"}]}>White</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Blue')}
                style={[globalStyles.category, {borderColor : selectedColours.includes('Blue') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedColours.includes('Blue') ? "#3388FF" : "#C1C0C9"}]}>Blue</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Silver')}
                style={[globalStyles.category, {borderColor : selectedColours.includes('Silver') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedColours.includes('Silver') ? "#3388FF" : "#C1C0C9"}]}>Silver</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Red')}
                style={[globalStyles.category, {borderColor : selectedColours.includes('Red') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedColours.includes('Red') ? "#3388FF" : "#C1C0C9"}]}>Red</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Yellow')}
                style={[globalStyles.category, {borderColor : selectedColours.includes('Yellow') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedColours.includes('Yellow') ? "#3388FF" : "#C1C0C9"}]}>Yellow</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Grey')}
                style={[globalStyles.category, {borderColor : selectedColours.includes('Grey') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedColours.includes('Grey') ? "#3388FF" : "#C1C0C9"}]}>Grey</Text>
            </TouchableOpacity>
        </View>
        <View style={globalStyles.boxContainer}>
            <TouchableOpacity onPress={applyColoursFilter}>
                <Text style={globalStyles.applyText}>Apply</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}