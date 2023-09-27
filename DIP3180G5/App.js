import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from './frontend/LoadingPage';
import LoginPage from './frontend/login-screen';
import ChatPage from './frontend/ChatPage';
import ChatConversation from './frontend/ChatConversation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatPage">
        <Stack.Screen name="ChatPage" component={ChatPage} options={{ headerShown: false }} />
        <Stack.Screen name="ChatConversation" component={ChatConversation} />
      </Stack.Navigator>
    </NavigationContainer>
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

//for old app.js for loadingpage and login page will integrate tgt soon
/*<NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingPage">
        <Stack.Screen name="LoadingPage" component={LoadingPage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>*/