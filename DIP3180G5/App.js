import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './frontend/login-reg-page/registration-screen';
import LoginScreen from './frontend/login-reg-page/login-screen';
import ListingScreen from './frontend/listing-page/listing-screen';
import CreateListingScreen from './frontend/listing-page/create-listing-screen';
import CameraScreen from './frontend/listing-page/camera-screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="CreateListingScreen" component={CreateListingScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}