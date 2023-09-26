import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useWishlist } from "../frontend/WishlistContext";

const WishlistPage = () => {

    // Dummy data for testing
    const dummyWishlistItems = [
        {
            id: '1',
            itemName: 'Item 1',
            itemPrice: '$10',
            itemCondition: 'New',
            itemPicture: require('../assets/car.png'),
        },
        {
            id: '2',
            itemName: 'Item 2',
            itemPrice: '$15',
            itemCondition: 'Used',
            itemPicture: require('../assets/car.png'),
        },
        {
            id: '3',
            itemName: 'Item 3',
            itemPrice: '$25',
            itemCondition: 'Like New',
            itemPicture: require('../assets/car.png'),
        },
        // Add more dummy items as needed
    ];

    const { wishlistItems } = useWishlist();
    console.log('wishlistItems', wishlistItems);
    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Your wishlist is empty.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={wishlistItems}
                keyExtractor={(item, index) => `${item.itemName}-${index}`}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.itemContent}>
                            <Image source={item.itemPicture} style={styles.itemImage} />
                            <View style={styles.itemTextContainer}>
                                <Text style={styles.itemText}>Name: {item.itemName}</Text>
                                <Text style={styles.itemText}>Price: {item.itemPrice}</Text>
                                <Text style={styles.itemText}>Condition: {item.itemCondition}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        borderRadius: 8,
        shadowRadius: 4,
        elevation: 5,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: 'black',
    },
});


export default WishlistPage;