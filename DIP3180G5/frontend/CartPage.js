import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text,StyleSheet } from 'react-native';

export default function CartPage() {
    return (
        <View style={styles.container}>
            <Text>Cart Page</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});