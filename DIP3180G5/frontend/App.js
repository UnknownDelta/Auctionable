import React, { useState } from 'react';
import HomeScreen from './screens/homescreen';
import BuyScreen from './screens/buyscreen';
import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import AppLoading from 'expo-app-loading';
import HomeStack from './routes/homeStack';
import { NavigationContainer } from '@react-navigation/native';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  'nunito-extra-bold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <HomeStack  />
      </NavigationContainer>
      
      // <HomeScreen />
      // <BuyScreen />
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)} 
        onError={console.warn} // Handle errors by logging them
      />
    )
  }
}
