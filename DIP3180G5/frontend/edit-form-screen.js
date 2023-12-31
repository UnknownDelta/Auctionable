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


const backgroundImage = require('./assets/background2.png');

const data = [
  { label: 'Toyota', value: 'Toyota' },         // Use the same string for both label and value
  { label: 'BMW', value: 'BMW' },
  { label: 'Ford', value: 'Ford' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Volkswagen', value: 'Volkswagen' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
  { label: 'Audi', value: 'Audi' },
  { label: 'Chevrolet', value: 'Chevrolet' },
];

const getFonts = () =>
  Font.loadAsync({
    roboto: require('./assets/Roboto-Regular.ttf'),
  });

  const DropdownComponent = ({
    initialValues, // Pass the initial values as a prop
    onSave, // A function to save the form data
  }) => {
  const [value, setValue] = useState(initialValues.value || null);
  const [isFocus, setIsFocus] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [condition, setCondition] = useState(initialValues.condition || 'Used');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [brand, setBrand] = useState(initialValues.brand || null); // Set the brand value from initialValues

  const [icons, setIcons] = useState([
    { name: 'plus', color: 'grey', id: '1' },
  ]);

  const navigation = useNavigation();

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
  style={{ backgroundColor: '#f7f7f7' }}
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
            value={initialValues.title} // Set the value from props
            onChangeText={(text) => handleInputChange('title', text)} // Handle input change
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
            value={brand}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => setValue(item.value) // Set the value to match the selected item's value
  }
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
              value={initialValues.price} // Set the value from props
      onChangeText={(text) => handleInputChange('price', text)} // Handle input change
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
            value={initialValues.description} // Set the value from props
    onChangeText={(text) => handleInputChange('description', text)} // Handle input change
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ListingScreen')}
          style={{ backgroundColor: '#0077b3', padding: 13, borderRadius: 8, marginTop: 20 }}>
          <Text
            style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>
            Update Listing!
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

const handleSave = (formData) => {
    // Save the form data to your state or perform any necessary actions.
    // For example, you can store it in the component state.
    const updatedFormData = {
      ...formData,
      // other form fields...
    };
  
    // Update the component state with the saved data
    setFormData(updatedFormData);
  };
  
  // Use the saved form data in your component or send it to an API, as needed.
  
const updateFormValues = (updatedValue) => {
  const updatedValues = initialFormValues.map((value) =>
    value.id === updatedValue.id ? updatedValue : value
  );
  setInitialFormValues(updatedValues);
};


function CreateListingScreen() {

    const navigation = useNavigation();
    const [IsModalVisible, SetIsModalVisible] = useState(false);

    const initialFormValues = [{
        id: 1,
        title: 'Mercedes-Benz S-Class',
        brand: 'Mercedes-Benz',
        imageSource: require("./assets/mercedes.jpg"),
        condition: 'Used',
        price: '10000',
        description: 'This is a used car.',
      }]
      

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
          routes: [{ name: 'ListingScreen' }],
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
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom:15 }}>My Listings</Text>
                  </View>
                  <DropdownComponent
  initialValues={initialFormValues[0]} // Pass the initial values from the array
  onSave={handleSave}/>
                </SafeAreaView>
            </ImageBackground>
        );
    }
    
export default CreateListingScreen;