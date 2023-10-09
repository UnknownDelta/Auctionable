import { StyleSheet, Dimensions } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 24
        },
        titleText: {
          fontFamily: 'nunito-bold',
          fontSize: 18,
        },
        item: {
            borderWidth: 1,
            borderColor: '#777',
            padding: 8,
            marginHorizontal: 100,
            marginTop: 300,
            width: 200,
            flexDirection:'row',
          },
        itemText: {
          fontFamily: 'nunito-bold',
          marginTop: 8,
        },
        priceText: {
          fontFamily: 'nunito-bold',
          fontSize: 22,
          marginTop: 8,
          fontWeight: 'bold',
          color: '#00c04b',
        },
        searchContainer: {
            borderWidth: 1,
            borderColor: '#777',
            borderRadius: 20,
            padding: 8,
            marginLeft: 6,
            marginTop: 5,
            marginBottom: 20,
            width: 350,
            flexDirection:'row',
          },
        searchText: {
          fontFamily: 'nunito-extra-bold',
          color: '#232b2b',
          flex: 1, // To make the text input expand within its container
          paddingLeft: 10,
        },
        sortText: {
          fontFamily: 'nunito-extra-bold',
          fontSize: 15,
          color: '#232b2b',
          marginRight: 10, // Adjust the margin as needed
        },
        category: {
          margin: 3,
          borderRadius: 15,
          borderWidth: 2,
          padding: 5,
          paddingHorizontal: 10,
          borderColor: '#3388FF',
      },
      subtitle: {
        color: '#6A7784',
        fontWeight: '700',
        fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    brandContainer: {
      padding: 20,
    },
    brandText: {
      padding: 8,
      fontFamily: 'nunito-bold',
      fontSize: 18,
    },
    applyText: {
      fontFamily: 'nunito-bold',
      fontSize: 18,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    boxContainer: {
      borderWidth: 1,
      borderRadius: 15,
      marginTop: 20,
      padding: 6,
      width: 75,
      backgroundColor: '#3388FF',
      borderColor: '#3388FF',
    }
})