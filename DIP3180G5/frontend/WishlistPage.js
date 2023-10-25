import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useWishlist } from "../frontend/WishlistContext";
import Counter from "react-native-counters";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import TransactionSuccessScreen from '../frontend/TransactionScreen'; // Import the new component




const WishlistPage = () => {

    const [quantities, setQuantities] = useState({}); // Store quantities for each item
    const [selectedItems, setSelectedItems] = useState([]); // Track selected items
    const [showTransactionSuccess, setShowTransactionSuccess] = useState(false); // State for showing transaction success screen

    // Dummy data for testing
    const [dummyWishlistItems, setDummyWishlistItems] = useState([
        {
            id: '1',
            itemName: 'Helmet Lightweight',
            itemPrice: '$10',
            itemCondition: 'New',
            itemPicture: require('../assets/carmod.jpeg'),
            checked: false, // Track the checked state
        },
        {
            id: '2',
            itemName: 'Helmet Lightweight 2',
            itemPrice: '$15',
            itemCondition: 'Used',
            itemPicture: require('../assets/carmod2.jpeg'),
            checked: false, // Track the checked state
        },
        {
            id: '3',
            itemName: 'Helmet Lightweight 3',
            itemPrice: '$25',
            itemCondition: 'Like New',
            itemPicture: require('../assets/mercedes.jpg'),
            checked: false, // Track the checked state
        },
        {
            id: '4',
            itemName: 'Helmet Lightweight 4',
            itemPrice: '$50',
            itemCondition: 'Like New',
            itemPicture: require('../assets/mercedes.jpg'),
            checked: false, // Track the checked state
        },
        // Add more dummy items as needed
    ]);

    const { wishlistItems } = useWishlist();
    const navigation = useNavigation();
    console.log('wishlistItems', wishlistItems);

    const handleCheckout = (showSuccessScreen) => {
        // Perform any necessary actions (e.g., payment processing)

        // Show the transaction success screen
        setShowTransactionSuccess(true);

        // Pass the value of showSuccessScreen to the TransactionScreen
        navigation.navigate('TransactionScreen', { showSuccessScreen });
    };

    const EmptyWishlistMessage = () => (
        <View style={styles.container}>
            <Text>Your wishlist is empty.</Text>
        </View>
    );


    if (!wishlistItems || wishlistItems.length === 0) {
        return <EmptyWishlistMessage />;
    }

    const handleDeleteItem = (itemId) => {
        console.log("Deleting", itemId);
        // Remove the item with the specified itemId from the wishlist
        const updatedWishlistItems = dummyWishlistItems.filter((item) => item.id !== itemId);
        setDummyWishlistItems(updatedWishlistItems);

        if (!dummyWishlistItems || dummyWishlistItems.length === 0) {
            return <EmptyWishlistMessage />;
        }

    };

    const toggleCheckbox = (itemId) => {
        const updatedItems = dummyWishlistItems.map((item) => {
            if (item.id === itemId) {
                // Toggle the checked state for the item
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        // Update the state with the modified items
        setDummyWishlistItems(updatedItems);

        // Add or remove the itemId from selectedItems based on its current state
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter((id) => id !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };

    // Function to calculate the total price based on selected items
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const itemId of selectedItems) {
            const item = dummyWishlistItems.find((item) => item.id === itemId);
            if (item) {
                const itemPrice = parseFloat(item.itemPrice.replace('$', ''));
                const itemQuantity = quantities[itemId] || 1;
                totalPrice += itemPrice * itemQuantity;
            }
        }
        return totalPrice.toFixed(2); // Format total price to 2 decimal places
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyWishlistItems}
                keyExtractor={(item, index) => `${item.itemName}-${index}`}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.itemContent}>
                            <CheckBox
                                size={15}
                                checked={item.checked}
                                onPress={() => toggleCheckbox(item.id)}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="#0077B5"
                                label=""
                                containerStyle={styles.checkboxContainer} // Add this line to apply custom styles
                            />
                            <Image source={item.itemPicture} style={styles.itemImage} />
                            <View style={styles.itemTextContainer}>
                                <ScrollView horizontal>
                                    <Text style={styles.itemText}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.itemName}</Text>
                                    </Text>
                                </ScrollView>
                                <Text style={styles.itemText}>{item.itemCondition}</Text>
                                <Text style={styles.itemText}><Text style={{ color: '#0077B5', fontWeight: 'bold', fontSize: 16 }}>{item.itemPrice}</Text> each</Text>

                                <View style={styles.counterContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const updatedQuantity = (quantities[item.id] || 1) - 1;
                                            if (updatedQuantity >= 1) {
                                                setQuantities({ ...quantities, [item.id]: updatedQuantity });
                                            }
                                        }} style={styles.counterButton}
                                    >
                                        <MaterialIcons name="remove" size={16} color="black" />
                                    </TouchableOpacity>
                                    <Text style={styles.counterText}>{quantities[item.id] || 1}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            const updatedQuantity = (quantities[item.id] || 1) + 1;
                                            setQuantities({ ...quantities, [item.id]: updatedQuantity });
                                        }} style={styles.counterButton}
                                    >
                                        <MaterialIcons name="add" size={16} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                                    <MaterialIcons name="delete-outline" size={30} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={styles.checkoutContainer}>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => handleCheckout(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            ${calculateTotalPrice()}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        marginBottom: 10,
        backgroundColor: 'white',
        //paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 10,
        borderRadius: 10,
        ...Platform.select({
            android: {
                elevation: 5, // Add elevation for Android shadow
            },
            ios: {
                shadowColor: 'black', // Set shadow color for iOS
                shadowOffset: { width: 0, height: 10 }, // Set shadow offset
                shadowOpacity: 0.5, // Set shadow opacity
                shadowRadius: 2, // Set shadow radius
            },
        }),
    },

    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginLeft: 0,
    },
    itemTextContainer: {
        flex: 1,
        width: 150,
    },
    itemText: {
        fontSize: 16,
        color: 'black',
    },

    checkboxContainer: {
        width: 10, // Set the width of the checkbox container
        padding: 0,
        justifyContent: 'flex-start'
    },

    counterContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: 90, // Customize the width here
        height: 30,
        borderWidth: 1,
        borderColor: '#0077B5',
        justifyContent: 'space-between', // Center content horizontally
    },
    counterText: {
        fontSize: 16,
        width: 30,
        height: 30,
        color: '#0077B5',
        textAlign: 'center', // Center text horizontally
        lineHeight: 30, // Ensure the line height is equal to the container height
    },

    counterButton: {
        width: 30,
        height: 30,
        //borderWidth: 1,
        //borderColor: '#0077B5',
        justifyContent: 'center', // Optional: Center the icon vertically
        alignItems: 'center', // Optional: Center the icon horizontally
    },

    checkoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00A859',
        borderRadius: 10,
        //marginLeft: 15,
        //marginRight: 15,
    },
    totalContainer: {
        flex: 1,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 10,
    },
    checkoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00A859',
        padding: 10,
        borderRadius: 10,
    },
    checkoutButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    checkoutButtonContainer: {
        flex: 1, // Take up the remaining space
        paddingLeft: 20, // Add left padding
        paddingRight: 10, //Add right padding
    },

    gradientLine: {
        height: 5, // Adjust the height as needed
    },
});


export default WishlistPage;