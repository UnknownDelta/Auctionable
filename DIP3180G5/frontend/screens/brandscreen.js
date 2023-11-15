import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BrandScreen({ route, navigation }) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const saveSelectedBrandsToStorage = async (brands) => {
    try {
      await AsyncStorage.setItem('selectedBrands', JSON.stringify(brands));
    } catch (error) {
      console.error('Error saving selected brands:', error);
    }
  };
  const loadSelectedBrandsFromStorage = async () => {
    try {
      const savedBrands = await AsyncStorage.getItem('selectedBrands');
      if (savedBrands !== null) {
        setSelectedBrands(JSON.parse(savedBrands));
      }
    } catch (error) {
      console.error('Error loading selected brands:', error);
    }
  };
  useEffect(() => {
    loadSelectedBrandsFromStorage();
  }, []);

  const toggleBrand = (brand) => {
    let updatedBrands;
    if (selectedBrands.includes(brand)) {
      updatedBrands = selectedBrands.filter((b) => b !== brand);
    } else {
      updatedBrands = [...selectedBrands, brand];
    }
      setSelectedBrands(updatedBrands);
      saveSelectedBrandsToStorage(updatedBrands);
  };
  const applyFilter = () => {
    // Navigate back to HomeScreen with the selected brands
    navigation.navigate('Home', { selectedBrands });
    // console.log("in brandscreen.js", selectedBrands);
  };
  return (
    <ScrollView style ={globalStyles.brandContainer}>
        <View>
            <Text style={globalStyles.brandText}>Brands</Text>
        </View>
        <View style={globalStyles.row}>
            <TouchableOpacity
                onPress={() => toggleBrand('Audi')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Audi') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Audi') ? "#3388FF" : "#C1C0C9"}]}>Audi</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('BMW')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('BMW') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('BMW') ? "#3388FF" : "#C1C0C9"}]}>BMW</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Citroen')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Citroen') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Citroen') ? "#3388FF" : "#C1C0C9"}]}>Citroen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Honda')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Honda') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Honda') ? "#3388FF" : "#C1C0C9"}]}>Honda</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Kia')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Kia') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Kia') ? "#3388FF" : "#C1C0C9"}]}>Kia</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Mercedes-Benz')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Mercedes-Benz') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Mercedes-Benz') ? "#3388FF" : "#C1C0C9"}]}>Mercedes-Benz</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Nissan')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Nissan') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Nissan') ? "#3388FF" : "#C1C0C9"}]}>Nissan</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Subaru')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Subaru') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Subaru') ? "#3388FF" : "#C1C0C9"}]}>Subaru</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Toyota')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Toyota') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color :selectedBrands.includes('Toyota') ? "#3388FF" : "#C1C0C9"}]}>Toyota</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleBrand('Volkswagen')}
                style={[globalStyles.category, {borderColor : selectedBrands.includes('Volkswagen') ? "#3388FF" : "#C1C0C9"}]}>
                <Text style={[globalStyles.subtitle, {color : selectedBrands.includes('Volkswagen') ? "#3388FF" : "#C1C0C9"}]}>Volkswagen</Text>
            </TouchableOpacity>
        </View>
        <View style={globalStyles.boxContainer}>
            <TouchableOpacity onPress={applyFilter}>
                <Text style={globalStyles.applyText}>Apply</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}