import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundImage = require('../assets/background2.png');

function ReviewListingScreen({ route, navigation }) {
  const { title, brand, condition, price, description, images } = route.params;

  const [IsModalVisible, SetIsModalVisible] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const handleImageExpand = (image) => {
    setExpandedImage(image);
    setIsImageExpanded(true);
  };

  const handleCloseExpandedImage = () => {
    setIsImageExpanded(false);
  };

  const ExpandedImageModal = () => {
    return (
      <Modal isVisible={isImageExpanded} onBackdropPress={handleCloseExpandedImage}>
        <View style={styles.modalContainer}>
          {expandedImage && (
            <Image
              source={{ uri: expandedImage }}
              style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
          )}
        </View>
      </Modal>
    );
  };

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
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom:15 }}>New Listing</Text>
                    </View>
                    <View style={{ flex: 1, padding: 20, backgroundColor: 'white'}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Review Your Listing</Text>

        <View style={{ marginBottom: 20}}>
            <Text style={{ fontsize: 40, marginBottom: 10, fontWeight: 'bold'}}>Title: {title}</Text>
            {brand && brand.label && <Text>Brand: {brand.label}</Text>}
            <Text style={{ fontsize: 40, marginBottom: 10, fontWeight: 'bold'}}>Condition: {condition}</Text>
            <Text style={{ fontsize: 40, marginBottom: 10, fontWeight: 'bold'}}>Price: ${price}</Text>
            <Text style={{ fontsize: 40, marginBottom: 10, fontWeight: 'bold'}}>Description: {description}</Text>
        </View>

        <View>
            <Text>Images:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {images &&
              Array.isArray(images) &&
              images.map((img, index) => (
                <TouchableOpacity key={index} onPress={() => handleImageExpand(img)}>
                  <Image source={{ uri: img }} style={{ width: 100, height: 100, margin: 5 }} />
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <TouchableOpacity
            style={{ backgroundColor: 'blue', padding: 15, borderRadius: 8, marginTop: 20 }}
            onPress={() => {
            navigation.goBack(); // Navigating back to the CreateListingScreen
            }}
        >
            <Text style={{ color: 'white', textAlign: 'center' }}>Submit Listing</Text>
        </TouchableOpacity>
        </View>
        <ExpandedImageModal />
        </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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

export default ReviewListingScreen;