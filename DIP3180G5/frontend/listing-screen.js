import React , {useState, useEffect} from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, ImageBackground } from 'react-native'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from 'react-native-vector-icons'; // or any other icon library
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const backgroundImage = require('../assets/background3.png');

const TopTab = createMaterialTopTabNavigator();
const myListings = [
  {
    "_id": "6557b8e553639d4c7d494f83",
    "brand": "Toyota",
    "model": "Corolla",
    "price": 10000,
    "description": "Cool",
    "registration_date": "01-03-2022",
    "images": [
    "file:///Users/macintosh/Library/Developer/CoreSimulator/Devices/621DAD1F-CCB7-4C98-B0DF-CC2E5CE99A65/data/Containers/Data/Application/FB630D03-1EF2-4F2C-B69C-ED5875711B11/Library/Caches/ExponentExperienceData/%2540anonymous%252FDIP3180G5-0d08495d-86bd-457f-84e8-9dc03cefa668/ImagePicker/C629E2BB-4106-42EA-9E79-1D5AB350D668.jpg",
    "plus"
    ],
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_name": "Bryan",
    "seller_image": "https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg",
    "sold": false,
    "createdAt": "2023-11-17T19:03:01.161Z",
    "updatedAt": "2023-11-17T19:03:01.161Z",
    "__v": 0
    },
    {
    "_id": "654b35ff5043e64ab92e859f",
    "brand": "Jeep",
    "model": "Wrangler",
    "colour": "Green",
    "fuel_type": "Hybrid",
    "mileage": 100,
    "price": 350000,
    "description": "Experience the thrill of the open road with our used Jeep Wrangler! This iconic off-road marvel, with its rugged design and four-wheel-drive capability, is ready for your next adventure. Immerse yourself in the freedom of removable doors and roof, embracing the outdoors like never before. This well-maintained Wrangler boasts a powerful engine, ensuring a reliable and exhilarating ride. With a durable yet comfortable interior, it seamlessly combines style and functionality. Priced to sell, this Jeep Wrangler is your ticket to unparalleled exploration. Don't miss out on the chance to own a piece of off-road history – contact us today!",
    "years_used": 1,
    "registration_date": "12-10-2022",
    "category": "car",
    "new_used": false,
    "images": [
    "https://medias.fcacanada.ca/jellies/renditions/2023/800x510/CC23_JLJL72_2TB_PGG_APA_XXX_XXX_XXX.1aaa5d21f651dcfd23d94bcacebe5ded.png",
    "https://medias.fcacanada.ca/jellies/renditions/2023/800x510/CC23_JLJL72_2TB_PGG_APA_XXX_XXX_XXX.1aaa5d21f651dcfd23d94bcacebe5ded.png"
    ],
    "sold": false,
    "createdAt": "2023-11-08T07:17:19.397Z",
    "updatedAt": "2023-11-08T07:17:19.397Z",
    "__v": 0,
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_image": "NA",
    "seller_name": "Samantha"
    },
    {
    "_id": "654b35bb5043e64ab92e859d",
    "brand": "Tesla",
    "model": "Model 3",
    "colour": "Blue",
    "fuel_type": "Electric",
    "mileage": 3300,
    "price": 100000,
    "description": "Mostly Good",
    "years_used": 2,
    "registration_date": "12-10-2021",
    "category": "car",
    "new_used": false,
    "images": [
    "https://cdn.mos.cms.futurecdn.net/VXc2ZjzWGGKGSLAymgeHZ.jpg",
    "https://cdn.mos.cms.futurecdn.net/VXc2ZjzWGGKGSLAymgeHZ.jpg"
    ],
    "sold": true,
    "createdAt": "2023-11-08T07:16:11.764Z",
    "updatedAt": "2023-11-08T07:16:11.764Z",
    "__v": 0,
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_image": "NA",
    "seller_name": "Joanne"
    },
    {
    "_id": "654b35785043e64ab92e859b",
    "brand": "Ford",
    "model": "Mustang",
    "colour": "Red",
    "fuel_type": "Gasoline",
    "mileage": 52000,
    "price": 140000,
    "description": "Looking to sell this retro car",
    "years_used": 15,
    "registration_date": "12-10-2008",
    "category": "car",
    "new_used": false,
    "images": [
    "https://di-uploads-pod41.dealerinspire.com/andersonfordofclinton/uploads/2019/09/2020-Ford-Mustang-MLP-Hero.png",
    "https://di-uploads-pod41.dealerinspire.com/andersonfordofclinton/uploads/2019/09/2020-Ford-Mustang-MLP-Hero.png"
    ],
    "sold": false,
    "createdAt": "2023-11-08T07:15:04.235Z",
    "updatedAt": "2023-11-08T07:15:04.235Z",
    "__v": 0,
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_image": "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    "seller_name": "AJ"
    },
    {
    "_id": "654b351f5043e64ab92e8599",
    "brand": "Honda",
    "model": "Civic",
    "colour": "Black",
    "fuel_type": "Electric",
    "mileage": 8000,
    "price": 165000,
    "description": "In Pristine Condition",
    "years_used": 4,
    "registration_date": "25-11-2019",
    "category": "car",
    "new_used": false,
    "images": [
    "https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-Honda-Civic-CRYSTAL_BLACK_PEARL.png",
    "https://65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com/ldm-images/2019-Honda-Civic-CRYSTAL_BLACK_PEARL.png"
    ],
    "sold": true,
    "createdAt": "2023-11-08T07:13:35.791Z",
    "updatedAt": "2023-11-08T07:13:35.791Z",
    "__v": 0,
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_image": "NA",
    "seller_name": "Max"
    },
    {
    "_id": "654b34d65043e64ab92e8597",
    "brand": "Toyota",
    "model": "Camry",
    "colour": "White",
    "fuel_type": "Gasoline",
    "mileage": 50,
    "price": 150000,
    "description": "Unleash the driving pleasure in our used Toyota Camry! This sedan exemplifies a perfect fusion of elegance and performance. Enjoy a smooth and responsive ride, complemented by the Camry's refined exterior and spacious, comfortable interior. With advanced safety features and cutting-edge technology, this Camry ensures both peace of mind and an enjoyable driving experience. Its fuel efficiency makes it ideal for both city cruising and long journeys. Meticulously inspected and competitively priced, our used Toyota Camry is your ticket to a sophisticated yet practical driving experience. Elevate your daily commute – inquire now and make this stylish sedan yours!",
    "years_used": 1,
    "registration_date": "25-11-2022",
    "category": "car",
    "new_used": false,
    "images": [
    "https://www.toyota.com.sg/showroom/new-models/-/media/5149a2d0b2474799b3ce2477b5dcac66.png",
    "https://www.toyota.com.sg/showroom/new-models/-/media/5149a2d0b2474799b3ce2477b5dcac66.png"
    ],
    "sold": true,
    "createdAt": "2023-11-08T07:12:22.153Z",
    "updatedAt": "2023-11-08T07:12:22.153Z",
    "__v": 0,
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_image": "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
    "seller_name": "Edmerson"
    },
    {
    "_id": "652f8b52567e4097cdafec57",
    "brand": "Toyota",
    "model": "Corolla",
    "colour": "Silver",
    "fuel_type": "Petrol",
    "price": 105000,
    "description": "Are you looking for a reliable and stylish car that will turn heads on the road? Look no further! Our Toyota Corolla is the perfect choice for you. With its sleek design and powerful engine, this car is built to impress. It offers a smooth and comfortable ride, making every journey a pleasure. Whether you’re driving in the city or on the highway, this car will deliver an exceptional experience. Safety is our top priority. Equipped with advanced safety features such as airbag and seatbelt, you can have peace of mind knowing that you and your loved ones are protected. Not only is this car reliable and safe, but it also offers great fuel efficiency. Say goodbye to frequent trips to the gas station and hello to more savings in your pocket. But don’t just take our word for it. Come down to our showroom and take this beauty for a test drive. Experience the thrill of driving this exceptional car and see for yourself why it’s the perfect fit for you. Don’t miss out on this amazing opportunity. Contact us today to schedule a test drive and make this car yours!",
    "years_used": 2,
    "registration_date": "12-12-2019",
    "category": "car",
    "new_used": true,
    "images": [
    "https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1600.jpg",
    "https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1600.jpg"
    ],
    "sold": false,
    "createdAt": "2023-10-18T07:37:54.975Z",
    "updatedAt": "2023-10-18T07:37:54.975Z",
    "__v": 0,
    "mileage": 1000,
    "seller_id": "65389826e5bccac6ac77cac7",
    "seller_image": "https://t3.ftcdn.net/jpg/05/71/08/24/360_F_571082432_Qq45LQGlZsuby0ZGbrd79aUTSQikgcgc.jpg",
    "seller_name": "Bryan"
    }
];

const getFonts = () =>
  Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });

const CurrentTabContent = (mode) => {
  const user = useSelector((state) => state.user);
  const [myListingsData, setMyListingsData] = useState(myListings);
  const [fontsloaded, setFontsLoaded] = useState(false);

  const fetchListingsData = async () => {
    let response, data;
    console.log(mode);
    try {
      if (mode.mode === "current"){
        response = await fetch("http://localhost:4000/api/cars/"+user._id+"/list");
      }
      else
      {
        response = await fetch("http://localhost:4000/api/cars/"+user._id+"/pastlist");
      }
      data = await response.json();
      console.log("api: "+JSON.stringify(data));
      if (data === undefined){
        setMyListingsData(myListings);
      }
      setMyListingsData(data); // Update the state with fetched data
    } catch (error) {
      console.log("response: "+JSON.stringify(data));
      setMyListingsData(myListings);
    }
  };
  const getYear = (date) => {
    if (!date) return date;
    return date.split("-")[2];
  };

  useEffect(() => {
    fetchListingsData();
  }, [mode]);
   
  if (fontsloaded) {
    return (
      <View style={{ backgroundColor: '#f7f7f7', flex: 1 }}>
        <FlatList 
          data={myListingsData}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.pinkBox}>
              <Image source={item.images} style={[styles.personImage, { alignSelf: 'center', objectFit: 'contain' }]} />
              <Text style={styles.listingText}>{item.model}</Text>
              <Text style={styles.listingText}>registered in {getYear(item.registration_date)}</Text>
              <Text style={styles.listingText}>{item.price}</Text>
              <View style={styles.editButtonContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.key)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          numColumns={2}
        />
      </View>
    );
  } else {
        return (
            <AppLoading startAsync={getFonts}
            onFinish={() => {
                setFontsLoaded(true);
            }}
            onError={console.warn}
        />
        );
    }
};

const styles = StyleSheet.create({
  pinkBox: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 15, 
    flexDirection:'column',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: (Dimensions.get('window').width - 32) / 2
  },
  listingText: {
    fontFamily:'roboto',
    color:'black',
    marginTop:10,
    textAlign: "left",
  },
  personImage: {
    width:160,
    height:160,
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 5, // Adjust this value to position the button as desired
    right: 5, // Adjust this value to position the button as desired
    backgroundColor: 'transparent',
  },
  editButtonText: {
    color: 'blue',
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50, // Increase the border radius to make it larger
    width: 55, // Adjust the width and height as needed
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
   
});

function ListingScreen() {

  const navigation = useNavigation();

    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1}}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10}}>My Listings</Text>
          </View>
          <TopTab.Navigator tabBarOptions={{ style: { backgroundColor: '#bfdee9' }}}>
            <TopTab.Screen name="Current" component={() => <CurrentTabContent mode="current" />} options={{ tabBarIndicatorStyle: { backgroundColor: '#0077B5'} }} />
            <TopTab.Screen name="Past" component={() => <CurrentTabContent mode="past" />} options={{tabBarIndicatorStyle: {backgroundColor: '#0077B5'}}} />
          </TopTab.Navigator>
          <View style={styles.plusButtonContainer}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => navigation.navigate('ListingCategoryScreen')}
            >
              <FontAwesome name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          </SafeAreaView>
      </ImageBackground>
    );
}

export default ListingScreen;