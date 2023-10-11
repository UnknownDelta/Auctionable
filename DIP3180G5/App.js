import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './frontend/login-reg-page/registration-screen';
import LoginScreen from './frontend/login-reg-page/login-screen';
import ListingScreen from './frontend/listing-page/listing-screen';
import CreateListingScreen from './frontend/listing-page/create-listing-screen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './frontend/LoadingPage';
import LoginPage from './frontend/login-screen';
import ChatPage from './frontend/ChatPage';
import ChatConversation from './frontend/ChatConversation';
import HomePage from './frontend/HomeScreen';
import RegisterPage from './frontend/registration-screen';
import DetailsPage from './frontend/DetailsScreen';
import SettingsPage from './frontend/SettingsScreen';
import ProfilePage from './frontend/ProfileScreen';
import WishlistPage from './frontend/WishlistPage';
import { WishlistProvider } from './frontend/WishlistContext';
import {Amplify} from 'aws-amplify';
import {Auth,Hub} from 'aws-amplify'
import config from './src/aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(config)

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue', // Change primary color to blue
  },
};


const App = () => {
  const [user, setUser] = useState(undefined)
  const checkUser = async () => {
    try{
    const authUser = await Auth.currentAuthenticatedUser({bypassCache:true})
    setUser(authUser)
    }
    catch(error){
      setUser(null)
    }
  }

  useEffect(()=>{
    const listener = (data) =>{
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut'){
        checkUser();
      }
    }
    Hub.listen('auth',listener)
    return () => Hub.remove('auth',listener)
  })
  useEffect(()=>{
    checkUser();
  },[])


  return (
    <PaperProvider theme={theme}>
    <WishlistProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="LoadingPage">
          {!user? (
            <>   
               <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
               <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
               <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }}/>
            </>
          ) :
          (
            <>
            <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }} />
            <Stack.Screen name="ChatConversation" component={ChatConversation} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsPage" component={DetailsPage} options={{ headerShown: false }} />
             <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
            <Stack.Screen name="WishlistPage" component={WishlistPage} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="CreateListingScreen" component={CreateListingScreen} options={{ headerShown: false}}/>
            </>
          )}
      
          </Stack.Navigator>
        </NavigationContainer>
    </WishlistProvider>
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



//for old app.js for loadingpage and login page will integrate tgt soon
/*<NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingPage">
        <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>*/