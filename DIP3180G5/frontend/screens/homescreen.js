import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { globalStyles } from '../styles/global';
import Card from '../src/components/card';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation, route }) {
  const nav = useNavigation();
  const [cars, setCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]); // Store the original unsorted data
  const [searchQuery, setSearchQuery] = useState(''); // State variable for the search query
  const [filteredCars, setFilteredCars] = useState([]); // State variable for filtered car data

  const [sortOption, setSortOption] = useState('createdAt'); // Default sorting option is 'createdAt'

  // const { selectedBrands } = route.params;
  // if undefined just comment out first, then uncomment back after the screen loads
  const { selectedBrands } = route.params || { selectedBrands: [] };
  const { selectedColours } = route.params || { selectedColours: [] };
  // const { selectedBrands = [] } = route.params;
  // const { selectedColours = [] } = route.params;
  useEffect(() => {
    // Define the URL of your backend API that retrieves car data
    // const apiUrl = 'http://192.168.68.118:4000/api/cars'; // use ipv4 address // change to your ipv4 address accordingly
    const apiUrl = 'http://10.91.234.87:4000/api/cars'; 
    // Send a GET request to the backend API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCars(data); // Update the state with the fetched car data
        setOriginalCars(data); // Store the original data when it's fetched
        // console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
      
  }, []); // The empty dependency array ensures this effect runs once on component mount

  // Function to filter cars based on the search query
  const filterCars = () => {
    const filteredData = cars.filter((car) =>
    // changed the names of variables to matched the backend
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.colour.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.fuel_type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCars(filteredData);
  };
  
  // Function to sort cars based on price or mileage or years of COE left
  const applySortingLogic = (option) => {
    let sortedCars = [...originalCars]; // Use the original unsorted data;
  
    switch (option) {
      case 'createdAt':
        sortedCars.sort((a, b) => b.createdAt - a.createdAt); // Sort by created time in descending order
        break;
      case 'priceLowToHigh':
        sortedCars.sort((a, b) => a.price - b.price); // Sort by price from low to high
        break;
      case 'priceHighToLow':
        sortedCars.sort((a, b) => b.price - a.price); // Sort by price from high to low
        break;
      case 'mileageLowToHigh':
        sortedCars.sort((a, b) => a.mileage - b.mileage); // Sort by mileage from low to high
        break;
      case 'mileageHighToLow':
        sortedCars.sort((a, b) => b.mileage - a.mileage); // Sort by mileage from high to low
        break;
      case 'yearsOfCOELeftLowToHigh':
        sortedCars.sort((a, b) => b.years_used - a.years_used); // Sort by years_used from high to low (aka COE left from low to high)
        break;
      case 'yearsOfCOELeftHighToLow':
        sortedCars.sort((a, b) => a.years_used - b.years_used); // Sort by years_used from low to high (aka COE left from high to low)
        break;
  
      default:
        break;
    }
  
    setCars(sortedCars);
  };

  // Function to open the filter drawer
  const openFilterDrawer = () => {
    nav.navigate('Root', { screen: 'Filter'});
  };
  // if they say undefined during npm start a, just comment out the filter by brands and colours part then save then uncomment it out
  // Function to filter cars based on selected brands
  const filterCarsByBrands = (selectedBrands) => {
    const filteredData = originalCars.filter((car) =>
      selectedBrands.length === 0 || selectedBrands.includes(car.brand)
    );
    setFilteredCars(filteredData.length > 0 ? filteredData : cars);
  };
  // Function to filter cars based on selected colours
  const filterCarsByColours = (selectedColours) => {
    const filteredData = originalCars.filter((car) =>
      selectedColours.length === 0 || selectedColours.includes(car.colour)
    );
    setFilteredCars(filteredData.length > 0 ? filteredData : cars);
  };
  // the useeffect might have max depth error cause of calling the functions like every rerender
  // temporary soln is comment out the filterCarByBrands and filterCarByColours functions and this useEffect, then npm start, then uncomment the lines
  useEffect(() => {
    const delay = 0; // Set the delay time in milliseconds (adjust as needed)
    const timer = setTimeout(() => {
      if (selectedBrands && selectedBrands.length > 0) {
        filterCarsByBrands(selectedBrands);
      }
      if (selectedColours && selectedColours.length > 0) {
        filterCarsByColours(selectedColours);
      } else if (filteredCars.length <= 0) {
        filterCars();
      }
      // console.log(sortOption);
      applySortingLogic(sortOption);
      // console.log('sortOption data type:', typeof sortOption);
    }, delay);
  
    return () => {
      // Clear the timeout if the component unmounts or selectedBrands changes before the delay is over
      clearTimeout(timer);
    };
  }, [selectedBrands, selectedColours]);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.searchContainer}>
        <Ionicons name='search' size={30} color="#3388FF"/>
        <TextInput
          style={globalStyles.searchText}
          placeholder="Find your dream car"
          placeholderTextColor={'#6A7784'}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            filterCars(); // Call the filter function when the search query changes
          }}
        />
      </View>
      <View><Ionicons name='options' size={30} color="#3388FF" onPress={openFilterDrawer}/></View>
      <View>
        <Text style={globalStyles.sortText}>Sort by: </Text>
        <RNPickerSelect
          onValueChange={(itemValue) => {
            setSortOption(itemValue);
            // Call a function to apply the sorting logic based on the selected option
            applySortingLogic(itemValue);
          }}
          items={[
            { label: "Latest (Default)", value: "createdAt" },
            { label: "Price (Low to High)", value: "priceLowToHigh" },
            { label: "Price (High to Low)", value: "priceHighToLow" },
            { label: "Mileage (Low to High)", value: "mileageLowToHigh" },
            { label: "Mileage (High to Low)", value: "mileageHighToLow" },
            { label: "Years of COE Left (Low to High)", value: "yearsOfCOELeftLowToHigh" },
            { label: "Years of COE Left (High to Low)", value: "yearsOfCOELeftHighToLow" },
          ]}
          value={sortOption} // Set the selected value
          placeholder={{ label: "Select an option"}} // Optional placeholder text
        />
      </View>
      <FlatList
        // data={cars}
        data={filteredCars.length > 0 ? filteredCars : cars} // Use filtered data if available, else use all cars
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Buy', item)}>
            <Card>
            <Image
              source={{ uri: item.images[0] }} // Set the source prop to the image URL
              style={{
                width: (Dimensions.get('window').width * 0.8), // xx% of the screen width
                height: (Dimensions.get('window').width * 0.4), //xx% of the screen height
              }}
            />
            <Text style={globalStyles.priceText}>${ item.price }</Text>
            <Text style={globalStyles.titleText}>{ item.brand } { item.model }</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
    
  );
}