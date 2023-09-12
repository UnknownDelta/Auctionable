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
  ImageBackground
} from 'react-native';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { LinearGradient } from 'expo-linear-gradient';

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    comic: require("../assets/fonts/Dudu_Calligraphy.ttf"),
  })

  
const HomeScreen = ({ navigation }) => {
  const [fontsloaded, setFontsLoaded] = useState(false);
  if (fontsloaded) {
  return (
    <SafeAreaView style={{ flex: 1 }}><LinearGradient
    // Background Linear Gradient
    colors={["#00A859","#0077B5"]}
    style={{flex:1, backgroundColor:"#0077B5"}}>
            <ScrollView style={styles.scrollView}>
            <TouchableOpacity style={styles.productpage}>
            <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={require('./car.png')} style={styles.avatar}/>
        </View>
        
        <View style={styles.sidecontentcontainer}>
          <View>
            <Text>Joe</Text>
            <Text style={{paddingTop:5, color: 'grey'}}>ssdsd</Text>
          </View>
        </View>
        <TouchableOpacity       style={{
        flexDirection: "row",
        justifyContent: "flex-end"
      }}>
      
     
     
    </TouchableOpacity>
    
      </View>
      <View style={{paddingTop: 10,}}>
        <Image source={require('./Kia.jpeg')} style={{height: 180,}}></Image>
      </View>
      <View style={styles.productList}>
            <Text style={styles.name}>Tesla</Text>
            <Text style={{paddingTop:5, color: 'grey'}}>$20</Text>
          </View>
          <TouchableOpacity       style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        
      }}>
      
      <Text style={{color: 'grey', flexDirection: 'row',alignItems: 'flex-end', marginTop: -20, paddingRight: 20,}}>used/9 months</Text>
     
    </TouchableOpacity>  
    </TouchableOpacity>
      </ScrollView>
      </LinearGradient>
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
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  side:{
    alignContent:"flex-start",
    height:50,
  } ,
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
    height: 40,
    paddingLeft:20,
    alignContent: 'center',
    resizeMode: 'contain',
  
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  productpage: {
    paddingTop:20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white',
    height: 350,
  },
  producttext: {
    padding:20,
  },
  scrollView: {
    
    marginHorizontal: 20,
  },
    contentContainer: {
      paddingVertical: 20
    },
    image: {
      flex: 1,
      alignContent: 'center',
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    sidecontentcontainer:{
      paddingLeft:100,
      marginTop: -43,
    },
    overlapContainer: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      marginTop: 50,
      marginRight: 50
    },
    productList: {
      paddingLeft: 30,
      paddingTop: 20,
    },
    avatarContainer: {
      borderRadius: 33,
      height: 66,
      width: 66,
      marginLeft: 15,
      borderStyle: 'solid',
      borderWidth: 3,
      borderColor: 'white'
    },
    avatar: {
      borderRadius: 30,
      height: 60,
      width: 60
    }
});
export default HomeScreen;