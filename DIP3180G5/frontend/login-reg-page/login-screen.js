import React , {useState} from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from "@react-navigation/native";

const backgroundImage = require("./assets/background.jpg");  


const getFonts = () =>
    Font.loadAsync({
        roboto: require("./assets/Roboto-Regular.ttf"),
        robotobold: require("./assets/Roboto-Bold.ttf"),
    });

const LoginScreen = () => {
    const [fontsloaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    if (fontsloaded) {
        return (
            <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ paddingHorizontal: 25 }}>
                        <Text style={{ fontFamily: 'roboto', fontSize: 50, fontWeight: '500', color: '#fff', marginBottom: 20 }}>Login</Text>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, marginBottom:15 }}>
                            <TextInput placeholder='Email ID' placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} keyboardType="email-address" />
                        </View>

                        <View style={{ borderRadius: 10, borderColor: 'white', borderWidth: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom:15}}>
                            <TextInput placeholder='Password' placeholderTextColor="#FFF" style={{ fontFamily: 'roboto', fontSize: 16, color: 'white' }} secureTextEntry={true} />
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={{ fontFamily: 'robotobold', color: '#fff', fontWeight: '500' }}>Forgot?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('ListingScreen')} style={{ backgroundColor: '#00A859', padding: 13, borderRadius: 10, marginBottom: 30 }}>
                            <Text style={{ fontFamily: 'roboto', textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Login</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                            <View>
                                <Text style={{ fontFamily: 'roboto', width: 50, textAlign: 'center', color: 'white' }}>OR</Text>
                            </View>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => { }} style={{ borderColor: '#ffffff', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#ffffff', justifyContent: 'center' }}>
                                <Image source={require('./assets/Google.png')} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'roboto', color: '#000000', fontWeight: '500', alignSelf: 'center' }}>Continue with Google</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => { }} style={{ borderColor: '#3a589b', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#3a589b', justifyContent: 'center' }}>
                                <Image source={require('./assets/Facebook.png')} style={{ width: 20, height: 20, marginRight: 5, marginBottom: 2 }} />
                                <Text style={{ fontFamily: 'roboto', color: '#ffffff', fontWeight: '500', alignSelf: 'center' }}>Continue with Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                            <TouchableOpacity onPress={() => { }} style={{ borderColor: '#000000', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10, width: 340, flexDirection: 'row', backgroundColor: '#000000', justifyContent: 'center' }}>
                                <Image source={require('./assets/Apple.png')} style={{ width: 20, height: 20, marginRight: 10, alignSelf: 'center' }} />
                                <Text style={{ fontFamily: 'roboto', color: '#ffffff', fontWeight: '500', alignSelf: 'center' }}>Continue with Apple</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                            <Text style={{ color: '#fff', fontWeight: '500' }}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("RegistrationScreen")}>
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

export default LoginScreen