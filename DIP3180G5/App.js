import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './frontend/LoadingPage';
import LoginPage from './frontend/login-screen';
import ChatPage from './frontend/ChatPage';
import ChatConversation from './frontend/ChatConversation';
import ListingPage from './frontend/listing-screen';
import HomePage from './frontend/HomeScreen';
import RegisterPage from './frontend/registration-screen';
import DetailsPage from './frontend/DetailsScreen';
import SettingsPage from './frontend/SettingsScreen';
import ProfilePage from './frontend/ProfileScreen';
import WishlistPage from './frontend/WishlistPage';
import { WishlistProvider } from './frontend/WishlistContext';

const Stack = createStackNavigator();

export default function App() {
  return (

    <WishlistProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoadingPage">
          <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }} />
          <Stack.Screen name="ChatConversation" component={ChatConversation} />
          <Stack.Screen name="ListingPage" component={ListingPage} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsPage" component={DetailsPage} options={{ headerShown: false }} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
          <Stack.Screen name="WishlistPage" component={WishlistPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
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