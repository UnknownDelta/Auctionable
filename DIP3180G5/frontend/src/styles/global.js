import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
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
          marginLeft: 10,
        },
})