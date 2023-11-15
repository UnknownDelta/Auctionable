import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

const ChatScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const route = useRoute();
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        Asset.fromModule(require('../assets/default_pfp.png')).downloadAsync();
    }, []);

    const senderName = route.params?.senderName || 'Default Title';
    const senderName = route.params?.senderName || 'Default Title';
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
                        color="#0077B5"
                        color="#0077B5"
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
                        backgroundColor: '#0077B5',
                        backgroundColor: '#0077B5',
                    },
                    left: {
                        backgroundColor: '#ccc',
                        backgroundColor: '#ccc',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                        color: '#fff',
                    },
                    left: {
                        color: '#000',
                        color: '#000',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <CustomHeader senderName={senderName} profilePic={senderAvatar} />
                <ProductInfo
                    productName={route.params?.productName}
                    productImage={route.params?.productImage}
                    price={route.params?.price}
                    condition={route.params?.condition}
                />
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
        </SafeAreaView>
    );
};
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <CustomHeader senderName={senderName} profilePic={senderAvatar} />
                <ProductInfo
                    productName={route.params?.productName}
                    productImage={route.params?.productImage}
                    price={route.params?.price}
                    condition={route.params?.condition}
                />
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
        </SafeAreaView>
    );
};

const CustomHeader = ({ senderName, profilePic }) => {
    console.log('Sender Name:', senderName);
    console.log('Sender Avatar:', profilePic);

    return (
        <View style={{ alignItems: 'center' }}>
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Image source={profilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
            </View>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>{senderName}</Text>
        </View>
    );
};
                <Image source={profilePic} style={{ width: 30, height: 30, borderRadius: 20 }} />
            </View>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>{senderName}</Text>
        </View>
    );
};

const ProductInfo = ({ productName, productImage, price, condition }) => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={productImage} // Replace with the actual URL of the product picture
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
const ProductInfo = ({ productName, productImage, price, condition }) => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={productImage} // Replace with the actual URL of the product picture
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

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

