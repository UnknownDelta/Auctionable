import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useRoute from react-navigation/native
import { Asset } from 'expo-asset'; // Import Asset from Expo


const ChatScreen = () => {

    const route = useRoute(); // Get the route object
    const navigation = useNavigation(); // Get the navigation object
    const [messages, setMessages] = useState([]);

    // Load the default avatar image using the Asset module
    useEffect(() => {
        Asset.fromModule(require('../assets/default_pfp.png')).downloadAsync();
    }, []);

    const senderName = route.params?.senderName || 'Default Title'; // Use sender's name as title
    const lastMsg = route.params?.lastMessage || '';
    const senderAvatar = route.params?.profilePic || null;

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "I will think about it",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Seller",
                    avatar: senderAvatar,
                },
            },
            {
                _id: 2,
                text: lastMsg,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: "Buyer",
                    avatar: require('../assets/default_pfp.png'),
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#00A859"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#00A859', // Sent messages (green)
                    },
                    left: {
                        backgroundColor: '#ccc', // Received messages (grey)
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff', // Sent messages text color (white)
                    },
                    left: {
                        color: '#000', // Received messages text color (black)
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }

    const CustomHeader = () => {
        const senderName = route.params?.senderName || 'Default Title';
        const senderAvatar = route.params?.profilePic || null;

        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={senderAvatar} style={{ width: 30, height: 30, borderRadius: 20 }} />
                </View>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>{senderName}</Text>
            </View>
        );
    };

    // Create a new component for the product information
    const ProductInfo = () => {
        const productName = route.params?.productName || '';
        const productPic = route.params?.productImage || null;
        const price = route.params?.price || '';
        const condition = route.params?.condition || '';

        return (
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={productPic} // Replace with the actual URL of the product picture
                            style={{ width: 80, height: 80, marginRight: 10 }}
                        />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{productName}</Text>
                            <Text style={{ fontSize: 14 }}>{price}</Text>
                            <Text style={{ fontSize: 14 }}>{condition}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

    // Use the custom header and product information components in navigation options
    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerTitle: () => (
                <View>
                    <CustomHeader />
                </View>
            ),
        });
    }, [navigation, route.params]);

    return (
        <View style={{ flex: 1 }}>
            <ProductInfo />
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                scrollToBottomComponent={scrollToBottomComponent}
                renderSend={renderSend}
            />
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});