import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, FlatList, Text, View, ImageBackground, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AppLoading from 'expo-app-loading';
import { useNavigation, useRoute} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';

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
    roboto: require('./assets/Roboto-Regular.ttf'),
  });

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [condition, setCondition] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [icons, setIcons] = useState([
    { name: 'plus', color: 'grey', id: '1' },
  ]);
  
  const [newImages, setNewImages] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const conditions = ['Used', 'New'];

  useEffect(() => {
    // Load fonts asynchronously
    const loadFonts = async () => {
      await getFonts();
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const openGallery = async () => {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status === 'granted') {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          const newIcon = result.uri; // Access the URI from the assets array
          const updatedIcons = [{ name: newIcon, color: 'grey', id: newIcon }, ...icons]; // Update the icons array
          setIcons(updatedIcons);
        }
      } catch (error) {
        console.error('Error picking an image:', error);
      }
    } else {
      console.warn('Permission denied for accessing the gallery.');
    }
  };

  const renderItem = ({ item }) => {
    if (item.name !== 'plus') {
      // If it's a photo, create a touchable image element to open the modal
      return (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => handleImagePress(item.name)}>
            <Image source={{ uri: item.name }} style={{ width: 60, height: 60, borderRadius: 8, marginTop: 20, marginRight: 10}} />
          </TouchableOpacity>
          {/* Add a delete button */}  
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(item.id)}>
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // If it's the plus sign, create a touchable plus sign element to add more photos
      return (
        <TouchableOpacity onPress={openGallery}>
          <View style={styles.iconContainer}>
            <Icon name={item.name} size={20} color={item.color} />
          </View>
        </TouchableOpacity>
      );
    }
  };  
  
  const handleDeleteImage = (id) => {
    // Filter out the image with the specified id
    const updatedIcons = icons.filter((item) => item.id !== id);
    setIcons(updatedIcons);
  };
  
  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };  
   
  if (fontsLoaded) {
    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding" // or "height" depending on your preference
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust this if needed
    >
      <ScrollView
  contentContainerStyle={styles.scrollViewContent}
  keyboardShouldPersistTaps="handled"
>
      <View style={styles.container}>
        <View
          style={{
            borderRadius: 8,
            borderColor: 'black',
            borderWidth: 0.5,
            padding: 16,
            paddingHorizontal: 8,
          }}>
          <TextInput
            placeholder="Listing Title"
            placeholderTextColor="#000"
            style={{ fontFamily: 'roboto', fontSize: 16, color: 'black' }}
            keyboardType="default"
          />
        </View>
        <View>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }, { borderColor: 'black', borderWidth: 0.5,}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select brand'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <FlatList
          data={icons}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true} // Set horizontal scroll
          contentContainerStyle={styles.iconList}
        />
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: selectedImage }} style={{ width: '90%', height: '90%', resizeMode: 'contain' }} />
            </View>
          </Modal>

        </TouchableWithoutFeedback>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Text style={{ fontSize: 16, marginBottom: 10, alignItems: 'center'}}>Condition:      </Text>
          {conditions.map((state) => (
            <View key={state} style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginBottom: 10 }}>
              <RadioButton.Android
                value={state}
                status={condition === state ? 'checked' : 'unchecked'}
                onPress={() => setCondition(state)}
              />
              <Text style={{marginLeft: 8}}>{state}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            borderRadius: 8,
            borderColor: 'black',
            borderWidth: 0.5,
            padding: 16,
            paddingHorizontal: 8,
            marginTop: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
            <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Price"
              placeholderTextColor="#000"
              style={{ flex: 1, fontFamily: 'roboto', fontSize: 16, color: 'black' }}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>
        </View>
        <View
          style={{
            borderRadius: 8,
            borderColor: 'black',
            borderWidth: 0.5,
            padding: 16,
            paddingHorizontal: 8,
            marginTop: 20,
          }}>
          <TextInput
            placeholder="Product Description"
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
        <TouchableOpacity
          onPress={() => navigation.navigate('ListingScreen')}
          style={{ backgroundColor: '#BFDEE9', padding: 13, borderRadius: 8, marginTop: 20 }}>
          <Text
            style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#000' }}>
            List it!
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    borderStyle: 'dotted',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 10,
  },
  iconList: {
    paddingHorizontal: 10,
  },
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
  conditionWrapper: {
    flexDirection: 'row',
  },
  labelText: {
    fontSize: 16,
    marginLeft: 5,
  },
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  selectedOuter: {
    borderColor: 'blue',
  },
  deleteButton: {
    position: 'absolute',
    top: 14, // Position at the top of the container
    right: 4, // Position at the right of the container
    backgroundColor: 'grey', // Customize the button's background color
    width: 18, // Adjust the button's width as needed
    height: 18, // Adjust the button's height as needed
    borderRadius: 10, // Make it round (half of width and height)
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white', // Customize the text color
    fontSize: 12, // Customize the font size
  },
  placeholderStyle: {
    color: 'black',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
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