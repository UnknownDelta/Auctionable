// react native
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global'; // Import your global styles
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

// Assuming you have your globalStyles defined in '../styles/global.js'

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
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

function HomeScreen() {
  const navigation = useNavigation();

  const goToSearch = () => {
    navigation.navigate('Search');
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Home Screen</Text>
      <Button title="Go to Search" onPress={goToSearch} />
    </View>
  );
}

function SearchScreen() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Search Screen</Text>
      <Button title="Go to Home" onPress={goToHome} />
    </View>
  );
}
// not react native, but webapp
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// // pages & components
// import Home from './pages/Home'
// import Navbar from './components/Navbar'
// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <div className="pages">
//           <Routes>
//             <Route 
//               path="/" 
//               element={<Home />} 
//             />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;