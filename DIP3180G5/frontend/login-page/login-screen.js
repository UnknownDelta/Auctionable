import React from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
const backgroundImage = require("./assets/background.jpg");
const LoginScreen = () => {
    return (
        <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 50, fontWeight: '500', color: '#fff', marginBottom: 10 }}>Login</Text>

                    <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, margin: 15 }}>
                        <TextInput placeholder='Email ID' placeholderTextColor="#FFF" style={{ fontSize: 16, color: 'white' }} keyboardType="email-address" />
                    </View>

                    <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, margin: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput placeholder='Password' placeholderTextColor="#FFF" style={{ fontSize: 16, color: 'white' }} secureTextEntry={true} />
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={{ color: '#fff', fontWeight: '500' }}>Forgot?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => { }} style={{ backgroundColor: '#00A859', padding: 20, borderRadius: 10, marginBottom: 30 }}>
                        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Login</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center', color: 'white' }}>OR</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => { }} style={{ borderColor: '#ffffff', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#ffffff', justifyContent: 'center' }}>
                            <Image source={require('./assets/Google.png')} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }} />
                            <Text style={{ color: '#000000', fontWeight: '500', alignSelf: 'center' }}>Continue with Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => { }} style={{ borderColor: '#3a589b', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#3a589b', justifyContent: 'center' }}>
                            <Image source={require('./assets/Facebook.png')} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }} />
                            <Text style={{ color: '#ffffff', fontWeight: '500', alignSelf: 'center' }}>Continue with Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                        <TouchableOpacity onPress={() => { }} style={{ borderColor: '#000000', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#000000', justifyContent: 'center' }}>
                            <Image source={require('./assets/Apple.png')} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }} />
                            <Text style={{ color: '#ffffff', fontWeight: '500', alignSelf: 'center' }}>Continue with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                        <Text style={{ color: '#fff', fontWeight: '500' }}>New to the app?</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={{ color: '#fff', fontWeight: '500' }}>  Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default LoginScreen