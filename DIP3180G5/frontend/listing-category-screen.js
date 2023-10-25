import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const backgroundImage = require('../assets/background3.png');

function MyListingsHeader() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListingPage')} style={{ marginLeft: 16, marginRight: 10 }}>
                      <Icon name="arrow-left" size={25} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10, marginBottom: 10}}>My Listings</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
                  <View style={styles.buttonContainer}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10, marginTop:10, color: '#0077B5'}}>I would like to...</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('createListPage')} style={styles.button}>
                        <Image source={require('../assets/sell.png')} style={styles.buttonImage} resizeMode="contain"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image source={require('../assets/auction.png')} style={styles.buttonImage} resizeMode="contain"/>
                    </TouchableOpacity>
                  </View>
            </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    button: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '90%', // Make the button take up the entire width
        alignItems: 'center',
        justifyContent: 'center', 
    },
    buttonImage: {
        width: '100%',
        height: '100%',
    },
});

export default MyListingsHeader;

