import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const TransactionScreen = ({ route, navigation }) => {
    const showSuccessScreen = route.params?.showSuccessScreen || false;

    return (
        <ImageBackground
            source={require('../assets/background4.png')} // Replace with the path to your background image
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                {showSuccessScreen ? (
                    <TransactionSuccessScreen navigation={navigation} />
                ) : (
                    <TransactionFailedScreen navigation={navigation} />
                )}
            </View>
        </ImageBackground>
    );
};

const TransactionSuccessScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Thank you for your order!</Text>
            <View style={styles.appIconContainer}>
                <Image source={require('../assets/transactionIcon.png')} style={styles.appIcon} />
            </View>
            <View style={styles.successContainer}>
                <Text style={styles.successText}>Payment Successful </Text>
                <Image source={require('../assets/green_tick.png')} style={styles.successIcon} />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // Navigate back to the home screen or any other desired screen
                    navigation.navigate('HomePage'); // Replace 'Home' with the desired screen name
                }}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const TransactionFailedScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Order not Confirmed!</Text>
            <View style={styles.appIconContainer}>
                <Image source={require('../assets/transactionIcon.png')} style={styles.appIcon} />
            </View>
            <View style={styles.successContainer}>
                <Text style={styles.successText}>Payment Unsuccessful </Text>
                <Image source={require('../assets/red_cross.png')} style={styles.unsuccessfulIcon} />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // Navigate back to the home screen or any other desired screen
                    navigation.navigate('BottomTabScreens', { screen: 'Cart' }); // Replace 'Home' with the desired screen name
                }}
            >
                <Text style={styles.buttonText}>Back to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appIconContainer: {
        width: 250,
        height: 250,
        borderRadius: 125, // Half of 250 to create a circle
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    appIcon: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: 'white',
    },
    successContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    successIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    unsuccessfulIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 2,
    },
    successText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        width: 120,
    },
    buttonText: {
        fontSize: 15,
        color: '#0077B5',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default TransactionScreen;
