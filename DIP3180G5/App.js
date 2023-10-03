import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './frontend/login-reg-page/registration-screen';
import LoginScreen from './frontend/login-reg-page/login-screen';
import ListingScreen from './frontend/listing-page/listing-screen';
import CreateListingScreen from './frontend/listing-page/create-listing-screen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue', // Change primary color to blue
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
  
    <WishlistProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="LoadingPage">
          <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }} />
          <Stack.Screen name="ChatConversation" component={ChatConversation} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsPage" component={DetailsPage} options={{ headerShown: false }} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
          <Stack.Screen name="WishlistPage" component={WishlistPage} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="CreateListingScreen" component={CreateListingScreen} options={{ headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
    </WishlistProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
