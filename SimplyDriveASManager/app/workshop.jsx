import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

const Workshop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.bayContainer}></View>
          <View style={styles.bayContainer}></View>
          <View style={styles.bayContainer}></View>
          <View style={styles.bayContainer}></View>

        </ScrollView>
      </View>

    <View style={styles.lowerContainer}>

        <View style={styles.lowerLeftContainer}>
            <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'flex-end' }}>

                <View style={styles.onsiteBookingContainer}></View>
                <View style={styles.onsiteBookingContainer}></View>
                <View style={styles.onsiteBookingContainer}></View>
                <View style={styles.onsiteBookingContainer}></View>

            </ScrollView>


    </View>



        <View style={styles.lowerRightContainer}></View>
      </View>

    </View>
  );
};

export default Workshop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding:5
  },
  upperContainer: {
    flex: 0.60,
    padding:5,
    margin:5,
    backgroundColor: 'red',
    width: '100%',

  },
  bayContainer: {
    backgroundColor: 'blue',
    width: 350, 
    height: 450,
    marginHorizontal: 5,
  },
  lowerContainer: {
    flex: 0.40,
    flexDirection: "row",
    marginHorizontal:2.5 ,
    marginVertical:5,
    //backgroundColor: 'red',
    width: 991.75,

  },  
  lowerLeftContainer: {
    //backgroundColor: 'blue',
    backgroundColor: '#18181b',
    flex:0.65,
    margin:5,
    borderRadius:15,
    borderColor: '#b5abab',
    borderWidth:1,
  },    
  lowerRightContainer: {
    //backgroundColor:'blue',
    backgroundColor: '#18181b',
    flex:0.35,
    margin:5,
    borderRadius:15,
    borderColor: '#b5abab',
    borderWidth:1,
  },      
  onsiteBookingContainer: {
    //backgroundColor: 'yellow',
    backgroundColor:'#0e1013',
    width: 250, 
    height: 250,
    marginHorizontal: 10,
    borderRadius:15,
    borderColor: '#b5abab',
    borderWidth:1,
    marginBottom:10,
  },  

  

});
