import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import {Alert} from 'react-native'
import HomeScreen from './HomeScreen';
// import { HARD_CODED_USERNAME, HARD_CODED_PASSWORD } from '@env';
const backgroundImage = require("../assets/background.png");


const getFonts = () =>
    Font.loadAsync({
        roboto: require("../assets/fonts/Roboto-Regular.ttf"),
        robotobold: require("../assets/fonts/Roboto-Bold.ttf"),
    });


const LoginScreen = ({ navigation }) => {
    
    const [fontsloaded, setFontsLoaded] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const backdoorLogin = async () => {
        const newUser = "Edmerson";
        const newPass = "Edmerson";
        setUsername(newUser);
        setPassword(newPass);
        console.log("backdoorLogin called with", newUser, newPass);
        await new Promise(resolve => setTimeout(resolve,2000));
        console.log("backdoorLogin called with", newUser, newPass);
        if (newUser === "Edmerson" && newPass === "Edmerson") {
            // Bypass authentication and navigate to the home screen
            const response = await Auth.signIn(newUser, newPass);
        } else {
            Alert.alert('Oooops', 'Invalid backdoor credentials');
        }
}
    const onSignInPressed = async () => {
        if (loading){
            return; 
               }
        setLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve)); 
            const response = await Auth.signIn(username, password);
            console.log(response);
        } catch (error) {
            console.error("Error during sign in:", error);
            Alert.alert('Oooops', error.message)
        }
        setLoading(false)
}
    if (fontsloaded) {
        return (
            <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ paddingHorizontal: 25 }}>
                        <Text style={{ fontFamily: 'roboto', fontSize: 50, fontWeight: '500', color: '#fff', marginBottom: 20 }}>Login</Text>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, marginBottom: 15 }}>
                            <TextInput placeholder='Email ID' onChangeText={setUsername}  name='username' value={username} placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} keyboardType="email-address" />
                        </View>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                            <TextInput placeholder='Password' onChangeText={setPassword} value ={password} name='password' placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} secureTextEntry={true} />
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={{ fontFamily: 'robotobold', color: '#fff', fontWeight: '500' }}>Forgot?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={
                            () =>{
                                onSignInPressed();
                            }
                             } style={{ backgroundColor: '#00A859', padding: 13, borderRadius: 10, marginBottom: 30 }}>
                            <Text style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>{loading? 'Login you in...' : 'Login'}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                            <View>
                                <Text style={{ fontFamily: 'roboto', width: 50, textAlign: 'center', color: 'white' }}>OR</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('BottomTabScreens', { screen: 'Home' })} style={{ borderColor: '#ffffff', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#ffffff', justifyContent: 'center' }}>
                                <Image source={require('../assets/Google.png')} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'roboto', color: '#000000', fontWeight: '500', alignSelf: 'center' }}>Continue with Google</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => { }} style={{ borderColor: '#3a589b', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#3a589b', justifyContent: 'center' }}>
                                <Image source={require('../assets/Facebook.png')} style={{ width: 20, height: 20, marginRight: 5, marginBottom: 2 }} />
                                <Text style={{ fontFamily: 'roboto', color: '#ffffff', fontWeight: '500', alignSelf: 'center' }}>Continue with Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                            <TouchableOpacity 
                            onPress={() =>{
                                backdoorLogin();
                            }} style={{ borderColor: '#000000', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#000000', justifyContent: 'center' }}>
                                <Image source={require('../assets/Apple.png')} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'roboto', color: '#ffffff', fontWeight: '500', alignSelf: 'center' }}>Continue with Apple</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                            <Text style={{ color: '#fff', fontWeight: '500' }}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
                                <Text style={{ fontFamily: 'robotobold', color: '#fff', fontWeight: '500' }}>      Register</Text>
                            </TouchableOpacity>
                        </View>
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

//Change line 72 to Registration
export default LoginScreen