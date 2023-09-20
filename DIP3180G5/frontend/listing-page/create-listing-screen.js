import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AppLoading from 'expo-app-loading';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const backgroundImage = require('./assets/background2.png');

const data = [
  { label: 'Toyota', value: '1' },
  { label: 'BMW', value: '2' },
  { label: 'Ford', value: '3' },
  { label: 'Honda', value: '4' },
  { label: 'Volkswagen', value: '5' },
  { label: 'Mercedes-Benz', value: '6' },
  { label: 'Audi', value: '7' },
  { label: 'Chevrolet', value: '8' },
];

const getFonts = () =>
  Font.loadAsync({
    roboto: require("./assets/Roboto-Regular.ttf"),
  });

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [condition, setCondition] = useState("")

  const navigation = useNavigation();

  const icons = [
    { name: 'camera', color: 'black', id: '1' },
    { name: 'camera', color: 'black', id: '2' },
    { name: 'camera', color: 'black', id: '3' },
    { name: 'camera', color: 'black', id: '4' },
    { name: 'camera', color: 'black', id: '5' },
    { name: 'camera', color: 'black', id: '6' },
    { name: 'camera', color: 'black', id: '7' },
    { name: 'camera', color: 'black', id: '8' },
  ];

  const conditions = ['Used', 'New']

    if (fontsloaded) {

        const renderLabel = () => {
            if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                Brand
                </Text>
            );
            }
            return null;
        };

        const renderItem = ({ item }) => (
            <TouchableOpacity onPress = {() => {}}>
                <View style={styles.iconContainer}>
                    <Icon name={item.name} size={30} color={item.color} />
                </View>
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
            {renderLabel()}
                <View style={{ borderRadius: 8, borderColor: 'black', borderWidth: 0.5, padding: 16 ,paddingHorizontal:8  }}>
                    <TextInput placeholder='Listing Title' placeholderTextColor="#000" style={{ fontFamily: 'roboto', fontSize: 16, color: 'black' }} keyboardType="default" />
                </View>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select brand' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    }}
                />
                <FlatList
                    data={icons}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    horizontal={true} // Set horizontal scroll
                    contentContainerStyle={styles.iconList}
                />
                <View style={styles.cont}>
                    <Text style={styles.label}>Condition:</Text>
                    <View style={styles.conditionWrapper}>
                        {conditions.map((state) => (
                            <TouchableOpacity
                                key={state}
                                style={[
                                    styles.outer,
                                    condition === state && styles.selectedOuter,
                                ]}
                                onPress={() => setCondition(state)}
                            >
                                {condition === state && <View style={styles.inner} />}
                                <Text style={styles.labelText}>{state}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={{ borderRadius: 8, borderColor: 'black', borderWidth: 0.5, padding: 16 ,paddingHorizontal:8,marginTop: 20,flexDirection:'row'  }}>
                <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 8 }} />
                    <TextInput placeholder='Price' placeholderTextColor="#000" style={{ fontFamily: 'roboto', fontSize: 16, color: 'black' }} keyboardType="numeric" returnKeyType="done"/>
                </View>
                <View style={{ borderRadius: 8, borderColor: 'black', borderWidth: 0.5, padding: 16, paddingHorizontal: 8, marginTop: 20 }}>
                    <TextInput
                        placeholder='Product Description'
                        placeholderTextColor="#000"
                        style={{
                        fontFamily: 'roboto',
                        fontSize: 16,
                        color: 'black',
                        height: 120, // Adjust the height to make it larger
                        textAlignVertical: 'top', // Align text to the top
                        }}
                        keyboardType="default"
                        multiline={true} // Enable multiline input
                        numberOfLines={4} // Set the number of lines (adjust as needed)
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("ListingScreen")} style={{ backgroundColor: '#BFDEE9', padding: 13, borderRadius: 10, marginTop: 20 }}>
                    <Text style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#000' }}>List it!</Text>
                </TouchableOpacity>
            </View>


        );
    } else {
        return (
            <AppLoading startAsync={getFonts}
            onFinish={() => {
                setFontsLoaded(true);
            }}
            onError={console.warn}
        />
        );
    }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop:20,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconContainer: {
    width: 60, // Adjust the width and height as needed
    height: 60,
    borderWidth: 1, // Set the width of the border
    borderColor: 'black', // Set the border color
    borderRadius: 8, // Adjust the border radius for rounded corners
    borderStyle: 'dotted', // Set the border style to 'dotted'
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight:10,
  },
  iconList: {
    paddingHorizontal: 10, // Add some padding to the list if needed
  },
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    marginLeft:10,
  },
  conditionWrapper: {
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
    marginLeft: 5,
  },
  state: {
    marginHorizontal: 10,
    alignItems: 'center',
    textTransform: 'capitalize',
  },
  inner: {
    width: 15,
    height: 15,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  outer: {
    flexDirection: 'row', // Make the outer container a row to align label and radio button horizontally
    alignItems: 'center',
    marginRight: 20, // Add margin to separate radio buttons
    borderColor: 'black', // Set border color
    borderWidth: 1, // Add border width
    borderRadius: 8, // Adjust border radius
    padding: 16, // Add padding for spacing
  },
  selectedOuter: {
    borderColor: 'blue', // Customize the selected outline color
  },
});

function CreateListingScreen() {

    const navigation = useNavigation();
    
        return (
            <ImageBackground source={backgroundImage} style={{ flex: 1}}>
                <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom:10 }}>My Listings</Text>
                    <DropdownComponent />
                </SafeAreaView>
            </ImageBackground>
        );
    }
    
export default CreateListingScreen;