// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  ImageBackground,
  Pressable
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { LinearGradient } from 'expo-linear-gradient';
import
 MaterialCommunityIcons
from 'react-native-vector-icons/AntDesign';

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
  })

  
const HomeScreen = ({ navigation }) => {
  const [fontsloaded, setFontsLoaded] = useState(false);
  if (fontsloaded) {
    
  return (

    <SafeAreaView style={{ flex: 1,}}>
    <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
      <TouchableOpacity>
    <MaterialCommunityIcons
                name={'hearto'}
                size={30}
                color={'#0077B5'}
                style={{ paddingRight: 40}}
              />
              </TouchableOpacity>
</View>
<View style={{ marginBottom:10, backgroundColor: 'white', marginTop:10,}}>
<LinearGradient style={[{shadowOffset: {width: 20,height: -20,},},]} colors={['#f00', '#0f0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}/>
      
        
      <Text style={{
            paddingLeft: 40,
            fontWeight: 'bold',
            fontFamily: 'roboto',
            fontSize: 20,
            color: '#0077B5',
          }}>Categories</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight:40}}>
  <View style={{flex: 1, height: 5, backgroundColor: '#0077B5'}} />

  
</View>
      <ScrollView  horizontal contentContainerStyle={styles.contentContainer} style={{flexgrow:0, paddingVertical:0, paddingLeft: 20}}>  
          
          <TouchableOpacity>
      <Image
      style={styles.thumb}
      source= {require('./kia.png')} />
      <View style={styles.infoContainer}>
      <Text style={styles.name}>Kia</Text>
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.individ}>
      <Image
      style={styles.thumb}
      source= {require('./mitsubishi.png')} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Mitsubishi</Text>
        
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.individ}>
      <Image
      style={styles.thumb}
      source= {require('./Tesla.png')} />
      <View style={styles.infoContainer}>
      <Text style={styles.name}>Tesla</Text>
        
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.individ}>
      <Image
      style={styles.thumb}
      source= {require('./bentley.png')} />
      <View style={styles.infoContainer}>
      <Text style={styles.name}>Bently</Text>
        
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.individ}>
      <Image
      style={styles.thumb}
      source= {require('./hyundai.png')} />
      <View style={styles.infoContainer}>
      <Text style={styles.name}>Hyudai</Text>
        
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.individ}>
      <Image
      style={styles.thumb}
      source= {require('./bmw.png')} />
      <View style={styles.infoContainer}>
      <Text style={styles.name}>BMW</Text>
        
      </View>
    </TouchableOpacity>
      </ScrollView>
      <LinearGradient style={styles.shadowProp} colors={['#f00', '#0f0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}/>
      
    

      
      <Text style={{
        
            paddingLeft: 40,
            fontWeight: 'bold',
            fontFamily: 'roboto',
            fontSize: 20,
            color: '#0077B5',
            
          }}>Ending Dash Deals</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight:40, marginTop:-50, paddingTop:37,}}>
            <View style={{flex: 1, height: 5, backgroundColor: '#0077B5'}} />
            <Pressable title="See More"  color="#0077B5" style={styles.button}        onPress={
              () => navigation.navigate(
                'SettingsStack', { screen: 'Settings' }
              )
            }><Text style={styles.text}>See More</Text>
            </Pressable>
            </View>


      <View style={{ flex: 1, padding: 16}}>
        <View>
        <TouchableOpacity style={styles.productList}             onPress={
              () => navigation.navigate('Details')
            }>
              
      <Image
      style={styles.image}
      source= {require('./teslacar.jpeg')} /><View style={{position:'absolute'}}>
      
      <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:120, paddingLeft:10, fontSize:20, fontWeight:'bold', color: 'white',}}>Tesla Model X</Text>
      <View style={{marginTop:100, paddingLeft:180, fontSize:20, color:'white', justifyContent:'flex-end'}}>
      <Text style={{color:'white',}}>23 Bids</Text>
      <Text style={{color:'white'}}>$5000</Text>
      </View>
      </View>
      </View>
      </TouchableOpacity>

      </View>
      <View style={{paddingTop:10,}}>
      <Text style={{
        
        paddingLeft: 40,
        fontWeight: 'bold',
        fontFamily: 'roboto',
        fontSize: 20,
        color: '#0077B5',
        
      }}>Popular</Text>

      <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight:40, marginTop:-50, paddingTop:37,}}>
        <View style={{flex: 1, height: 5, backgroundColor: '#0077B5'}} />
        <Pressable title="See More"  color="#0077B5" style={styles.button}        onPress={
          () => navigation.navigate(
            'SettingsStack', { screen: 'Settings' }
          )
        }><Text style={styles.text}>See More</Text>
        </Pressable>
        </View>
        
        <TouchableOpacity style={styles.productList}             onPress={
              () => navigation.navigate('Details')
            }>
              
      <Image
      style={styles.image}
      source= {require('./bentleycar.jpg')} /><View style={{position:'absolute'}}>
      
      <View style={{flexDirection:'row'}}>
      <Text style={{marginTop:120, paddingLeft:10, fontSize:20, fontWeight:'bold', color: 'white',}}>Bently</Text>
      <View style={{marginTop:100, paddingLeft:180, fontSize:20, color:'white', justifyContent:'flex-end'}}>
      <Text style={{color:'white',}}>23 Bids</Text>
      <Text style={{color:'white'}}>$5000</Text>
      </View>
      </View>
      </View>
      </TouchableOpacity>
      </View>
      </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
            You are on Home Screen
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate(
                'SettingsStack', { screen: 'Settings' }
              )}>
            <Text>Go to settng Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate('Details')
            }>
            <Text>Open Details Screen</Text>
          </TouchableOpacity>
        </View>
        
      </View>
     
      
    </SafeAreaView>
   
  );} else {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,

   
  },
  individ:{
    paddingLeft:5,
    paddingRight:5,
    
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    
    width: 70,
    height: 70,
    borderRadius: 70/2,
    margin:10,
    alignSelf: "center",
    backgroundColor: "#eeeeee",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 11,
    fontWeight: 'bold',
    color: "#0077B5",
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  productList:{
    height:150,
    
    
    margin: 10,
    borderRadius: 20,
  },
    contentContainer: {
      paddingVertical: 20
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0, 0.60)',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      width: '100%',
      
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#0077B5',
    },
    shadowProp: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      height:10,
      elevation: 7,
      backgroundColor:'white',
    },
});
export default HomeScreen;