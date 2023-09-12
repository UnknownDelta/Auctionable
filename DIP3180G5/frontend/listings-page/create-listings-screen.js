import React , {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {Picker} from '@react-native-picker/picker'

const backgroundImage = require("./assets/background.jpg");  

const getFonts = () =>
    Font.loadAsync({
        roboto: require("./assets/Roboto-Regular.ttf"),
        robotobold: require("./assets/Roboto-Bold.ttf"),
    });

const CreateListingScreen= ({}) => {
    const [fontsloaded, setFontsLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    if (fontsloaded) {
        return (
            <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ paddingHorizontal: 25 }}>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a category" value="" />
                            <Picker.Item label="BMW" value="1" />
                            <Picker.Item label="Mercedes" value="2" />
                            <Picker.Item label="Toyota" value="3" />
                        </Picker>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, marginBottom:15 }}>
                            <TextInput placeholder='Category' placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} keyboardType="default" />
                        </View>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom:15}}>
                            <TextInput placeholder='Condition' placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} secureTextEntry={true} />
                        </View>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, marginBottom:15 }}>
                            <TextInput placeholder='Details' placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} keyboardType="email-address" />
                        </View>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom:15}}>
                            <TextInput placeholder='Price' placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} keyboardType="default" />
                        </View>

                        <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#00A859', padding: 13, borderRadius: 10, marginBottom: 30 }}>
                            <Text style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>List It!</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    picker: {
        borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, marginBottom:15 
    },
});

export default CreateListingScreen;