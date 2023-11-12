import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCaptured(false);
  };

  const handleUsePhoto = () => {
    // Handle the action to be taken when using the captured photo
    // For example, you can navigate to a certain page or perform other actions
    if (capturedImage) {
      // Do something with the captured image here
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      setIsCaptured(true);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ratio={'3:4'} ref={cameraRef}>
        {isCaptured ? (
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (isCaptured) {
                handleRetake(); // If captured, retake
              } else {
                setCameraType(
                  cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }
            }}
          >
            <Text style={styles.text}>
              {isCaptured ? "Retake" : "Flip"}
            </Text>
          </TouchableOpacity>
          {!isCaptured ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleCapture}
            >
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleUsePhoto}
            >
              <Text style={styles.text}>Use Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'black',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    aspectRatio: 3/4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 25,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  capturedImage: {
    ...StyleSheet.absoluteFillObject, // Cover the entire camera view
    resizeMode: 'contain',
  },
});

export default CameraScreen;
