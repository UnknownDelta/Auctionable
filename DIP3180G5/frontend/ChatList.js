import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width } = Dimensions.get('window'); // Get the screen width

// Dummy values for messages
const messages = [
    {
        id: '1',
        text: 'Hi I would like to make an offer for this car?',
        sender: 'Aquasama',
        productName: 'Ferrari 458 GT3',
        lastMessage: 'I am good. How about you?',
        profilePic: require('../assets/Aquasama.png'), // Import or provide the image source
        price: '$53K',
        condition: 'used/9mths',
        productImage: require('../assets/product.png'), // Import or provide the product image source
        date: '2 hrs ago',
    },
    {
        id: '2',
        text: 'Hi I would like to make an offer for this car?',
        sender: 'eLoin',
        productName: 'Telsa Model S',
        lastMessage: 'Are u able to give me a discount?',
        price: '$50K',
        condition: 'new/1mth',
        profilePic: require('../assets/eLoin.png'), // Import or provide the image source
        productImage: require('../assets/product2.png'), // Import or provide the product image source
        date: '4 hrs ago',
    },
    // Add more message objects as needed
];

const MessageList = () => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <View style={styles.messageContainer}>
                <View style={styles.column}>
                    <Image source={item.profilePic} style={styles.profilePic} />
                </View>
                <View style={styles.middleColumn}>
                    <Text style={styles.sender}>{item.sender}</Text>
                    <Text style={styles.productName}>{item.productName}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.lastMessage}>{item.lastMessage}</Text>
                </View>
                <View style={styles.productColumn}>
                    <Text style={styles.date}>{item.date}</Text>
                    <Image source={item.productImage} style={styles.productImage} />
                </View>
            </View>
        </TouchableOpacity>
    );

    const navigation = useNavigation(); //Get the navigation object
    const handleItemClick = (item) => {
        navigation.navigate('ChatConversation', {
            senderName: item.sender, productName: item.productName, profilePic: item.profilePic, productImage: item.productImage,
            date: item.date, lastMessage: item.lastMessage, price: item.price, condition: item.condition
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: width,
        paddingHorizontal: 5,
        marginTop: 5,
        marginBottom: 5, // Increased spacing between messages
        backgroundColor: 'white', // Set the background color to white
        ...Platform.select({
            android: {
                elevation: 5, // Add elevation for Android shadow
            },
            ios: {
                shadowColor: 'black', // Set shadow color for iOS
                shadowOffset: { width: 0, height: 10 }, // Set shadow offset
                shadowOpacity: 0.2, // Set shadow opacity
                shadowRadius: 2, // Set shadow radius
            },
        }),
    },
    column: {
        width: 50,
    },
    middleColumn: {
        flex: 1, // Adjust the flex value to make the middle column longer
        marginLeft: 10,
    },

    productColumn: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop: 2,
        marginRight: 16,
    },
    sender: {
        fontSize: 18,
        color: 'gray',
        fontWeight: 'bold',
        marginBottom: 8, // Add margin to create spacing
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Adjust text color for product name
        marginBottom: 8, // Add margin to create spacing
    },
    lastMessage: {
        fontSize: 16,
        color: 'gray', // Adjust text color for last message
    },
    date: {
        fontSize: 14,
        textAlign: 'right', // Align the date text to the right
        color: 'gray',
    },
    productImage: {
        width: 65, // Adjust the width of the product image
        height: 65, // Adjust the height of the product image
        marginTop: 8, // Add spacing between date and product image
        alignSelf: 'flex-end', // Align the product image to the right
    },
});

export default MessageList;