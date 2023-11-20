import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, FlatList, Text, View, ImageBackground, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AppLoading from 'expo-app-loading';
import { useNavigation, useRoute, CommonActions} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import { useSelector } from 'react-redux';
const backgroundImage = require('../assets/background3.png');

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
    roboto: require('../assets/fonts/Roboto-Regular.ttf'),
  });

const DropdownComponent = () => {
  const user = useSelector((state) => state.user);
  const [isFocus, setIsFocus] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState(new Date())


  const [brandLabel, setBrandLabel] = useState(null);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [registration_date, setRegistration_date] = useState(new Date());
  const seller_id = user._id;
  const seller_name = user.name;
  const seller_image = user.profile_picture;
  const sold = false;
  const cart = [];

  const [isBrandValid, setIsBrandValid] = useState(true);
  const [isModelValid, setIsModelValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const handleModelChange = (text) => {
    setModel(text); // Update the 'title' state with the input text
  };

  const [icons, setIcons] = useState([
    { name: 'plus', color: 'grey', id: '1' },
  ]);

  const navigation = useNavigation();


  useEffect(() => {
    // Load fonts asynchronously
    const loadFonts = async () => {
      await getFonts();
      setFontsLoaded(true);
    };
    loadFonts();
    console.log(registration_date);
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
    setImage(imageUri);
    setIsModalVisible(true);
  };  

  const handleSubmission = async () => {
    // Validate the fields before submission
    if (!brand) {
      console.log(brand);
      setIsBrandValid(false);
      return;
    }

    if (!model) {
      setIsModelValid(false);
      return;
    }

    if (!price) {
      setIsPriceValid(false);
      return;
    }

    if (!description) {
      setIsDescriptionValid(false);
      return;
    }

    // Clear validation messages
    setIsBrandValid(true);
    setIsModelValid(true);
    setIsPriceValid(true);
    setIsDescriptionValid(true);

    // Proceed with submission logic
    const dataToSubmit = {
      brand,
      model,
      price,
      description,
      registration_date,
      images: icons.map((icon) => icon.name),
      sold,
      seller_id,
      seller_name,
      seller_image,
      cart,
    };

    try {
      console.log(dataToSubmit);
      const response = await fetch('http://localhost:4000/api/cars/createlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        console.log('Form data submitted successfully:', dataToSubmit);
        navigation.navigate('ListingPage', dataToSubmit);
      } else {
        console.error('Failed to submit form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
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
  style={{ backgroundColor: '#f7f7f7' }}
>
      <View style={styles.container}>
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
            brand={brandLabel}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setBrandLabel(item);
              setBrand(item.label);
              setIsFocus(false);
            }}
          />
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
            placeholder="Car Model"
            placeholderTextColor="#000"
            style={{ fontFamily: 'roboto', fontSize: 16, color: 'black' }}
            keyboardType="default"
            value={model} // Bind 'title' state to the value of the input
            onChangeText={handleModelChange} // Call 'handleTitleChange' function on text change
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
              <Image source={{ uri: image }} style={{ width: '90%', height: '90%', resizeMode: 'contain' }} />
            </View>
          </Modal>
        </TouchableWithoutFeedback>
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
            marginTop: 20,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
            <FontAwesome name="dollar" size={16} color="black" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Price"
              placeholderTextColor="#000"
              style={{ flex: 1, fontFamily: 'roboto', fontSize: 16, color: 'black' }}
              keyboardType="numeric"
              returnKeyType="done"
              value={price}
              onChangeText={(text) => setPrice(text)} // Update the 'price' state with the input text
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
            marginTop: 4,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
            <TextInput
              placeholder="Registration Data (DD-MM-YYYY)"
              placeholderTextColor="#000"
              style={{ flex: 1, fontFamily: 'roboto', fontSize: 16, color: 'black' }}
              keyboardType="numeric"
              returnKeyType="done"
              value={registration_date}
              onChangeText={(text) => setRegistration_date(text)} // Update the 'price' state with the input text
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
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleSubmission({
            brand,
            model,
            price,
            description,
            registration_date,
            images: icons.map((icon) => icon.name),
            sold,
            seller_id,
            seller_name,
            seller_image,
          })}
          style={{ backgroundColor: '#0077b3', padding: 13, borderRadius: 8, marginTop: 20 }}
        >
          <Text
            style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}
          >
            Review It!
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
    backgroundColor: '#f7f7f7',
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
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

function CreateListingScreen() {

    const navigation = useNavigation();
    const [IsModalVisible, SetIsModalVisible] = useState(false);

    const openModal = () => {
      SetIsModalVisible(true);
    };
  
    const closeModal = () => {
      SetIsModalVisible(false);
    };

    const handleContinueEditing = () => {
      // Handle the first button press here
      closeModal(); // Close the modal
    };

    const handleLeaveAnyway = () => {
      // Handle the second button press here
      closeModal(); // Close the modal
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'ListingPage' }],
        })
      );
    };

    const CustomModal = ({ isVisible, closeModal, description, onButton1Press, button1Text, onButton2Press, button2Text }) => {
      return (
        <Modal isVisible={isVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
            <TouchableOpacity style={styles.button} onPress={onButton1Press}>
              <Text style={styles.buttonText}>{button1Text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onButton2Press}>
              <Text style={styles.closeButtonText}>{button2Text}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    };
    
        return (
            <ImageBackground source={backgroundImage} style={{ flex: 1}}>
                <SafeAreaView style={{ flex: 1 }}>
                  <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={openModal} style={{ marginLeft: 16, marginRight: 10 }}>
                    <Icon name="arrow-left" size={25} />
                  </TouchableOpacity>
                  <CustomModal
                    isVisible={IsModalVisible}
                    closeModal={closeModal}
                    description={
                      <>
                        <Text style={{color: '#0077B5', fontSize:25}}>Leave Without Saving</Text>
                        <Text>
                          {"\n"}The details you added in this section will not be saved.
                        </Text>
                      </>
  }
                    onButton1Press={handleContinueEditing}
                    button1Text="Continue Editing"
                    onButton2Press={handleLeaveAnyway}
                    button2Text="Leave Anyway"
                  />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom:15 }}>New Listing</Text>
                  </View>
                    <DropdownComponent />
                </SafeAreaView>
            </ImageBackground>
        );
    }
    
export default CreateListingScreen;