// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 2 }}>
      <Text style={{
            padding:20,
            fontWeight: 'bold'
          }}>Categories</Text>
      <ScrollView  horizontal={true} contentContainerStyle={styles.contentContainer} style={{flexgrow:0, paddingVertical:0}}>  
          
          <TouchableOpacity>
      <Image
      style={styles.thumb}
      source= {require('./car2.jpeg')} />
      <View style={styles.infoContainer}>
      <Text style={styles.name}>Kia Soul</Text>
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity>
      <Image
      style={styles.thumb}
      source= {require('./car.png')} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Mitsubishi</Text>
        
      </View>
    </TouchableOpacity>
          <TouchableOpacity>
      <Image
      style={styles.thumb}
      source= {require('./car3.png')} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Tesla</Text>
        
      </View>
    </TouchableOpacity>
     
          <Text style={{fontSize:22, padding: 10}}>React Native ScrollView Example</Text>  
          <View style={[{ width: 220,height: 70,padding: 10 }]}>  
              <Button  
                  onPress={this.onPressButton}  
                  title="Button 3"  
                  color="#FFFF3D"  
              />  
          </View>  
          <Text style={{fontSize:22, padding: 10}}>If you like</Text>  
          <View style={[{ width: 220,height: 70,padding: 10 }]}>  
              <Button  
                  onPress={this.onPressButton}  
                  title="Button 4"  
                  color="#FF3DFF"  
              />  
          </View>  
          <Text style={{fontSize:22, padding: 10}}>Scrolling horizontal</Text>  
          <View style={[{ width: 220,height: 70,padding: 10 }]}>  
              <Button  
                  onPress={this.onPressButton}  
                  title="Button 5"  
                  color="#3DFF00"  
              />  
          </View>  
      </ScrollView>
      <View style={{ flex: 1, padding: 16 }}>
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
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
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
    height: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: 50,
    alignSelf: "center",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  
    contentContainer: {
      paddingVertical: 20
    },
});
export default HomeScreen;