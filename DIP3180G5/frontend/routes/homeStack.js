import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/homescreen'; 
import BuyScreen from '../screens/buyscreen';
import BrandScreen from '../screens/brandscreen';
import ColoursScreen from '../screens/colourscreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
    return (
        <Drawer.Navigator >
        <Drawer.Screen name="Brands" component={BrandScreen} />
        <Drawer.Screen name="Colours" component={ColoursScreen} />
        </Drawer.Navigator>
    );
}

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#FFFFFF',
                headerStyle: {
                backgroundColor: '#3388FF',
                },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{title: 'CLUTCH',}}/>
            <Stack.Screen name="Buy" component={BuyScreen} options={{title: 'Buy car',}}/>
            <Stack.Screen name="Root" component={Root} options={{ title: 'Filter' }}/>
            
        </Stack.Navigator>
    );
}

export default HomeStack;
