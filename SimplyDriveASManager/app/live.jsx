import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getBookings } from "../services/bookingService";

const Live = () => {
  const router = useRouter();
  const goToCheckInPage = () => router.push('/noborder/checkin');

  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

const JobBlock = ({ item }) => (
  <View style={styles.jobItemContainer}>
    <View style={styles.jobItemContainerLeft}>
      <View style={styles.jobItemBlockLeft}>
        <View style={styles.jobItemBlockLeftContainer}>
          <View style={styles.customerInfoBlock}>
            <Text style={styles.componentText}>{item.userid}</Text>
          </View>
        </View>

        <View style={styles.jobItemBlockLeftContainer}>
          <View style={styles.registrationInfoBlock}>
            <Text style={styles.componentText}>{item.registration}</Text>
          </View>
          <View style={styles.statusInfoBlock}>
            <Text style={styles.componentText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.jobItemContainerLeftLower}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => console.log(item)}
        >
          <Text> Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push('/noborder/checkin')}
        >
          <Text> Open Chat</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.jobItemContainerRight}></View>
  </View>
);


  return (
    <View style={styles.container}>
      <View style={styles.livepanel}>
        <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.livepanelscrollview}>
          <View style={styles.livepanelheader}>
            <View style={styles.livepanelheaderleftcontainer}></View>
          </View>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          bookings.map((item, i) => <JobBlock key={i} item={item} />)
        )}

        </ScrollView>
      </View>

      <View style={styles.checkinbuttonpanel}>
        <TouchableOpacity style={styles.button} onPress={goToCheckInPage}>
          <Text style={styles.buttonText}> Check-In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Live;


const styles = StyleSheet.create({

    container:
    {
        flex: 1,
        //padding: 10
    },

    livepanelscrollview:
    {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
    },


    livepanel: 
    {
      flex: 1,
      borderRadius: 20,
      backgroundColor: '#18181b', 
      justifyContent: 'center',
      alignItems: 'center',
      width: '110%',
      borderColor: '#b5abab',
      borderWidth: 1,
      overflow: 'hidden',
      margin: 10,
    },

    livepanelheader:
    {
      flex: 1,
      borderRadius: 15,
      backgroundColor: 'blue', 
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: 1000,
      height: 120
    },

    livepanelheaderleftcontainer:
    {
      flex: 1,
      borderRadius: 20,
      backgroundColor: 'orange', 
      justifyContent: 'center',
      alignItems: 'center',
      width: 290,
      height: 500,
      margin: 5
    },

    jobItemContainer:
    {
      flex:1,
      flexDirection: 'row',
      backgroundColor: 'red',
      width:'99%',
      height: 125,
      margin: 5,
    },
    
    jobItemBlockLeft:
    {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'flex-start',
      alignContent: 'center',
      backgroundColor: 'yellow',
      width: 292.5,
      height: 70,
      margin: 1,
      borderRadius: 15,
    },
    jobItemBlockLeftContainer:
    {
      alignItems:'center',
      flex: 0.5,
      backgroundColor: 'red',
      width: 65,
      height: 80,
      margin: 2,
      borderRadius: 15,
    },

    customerInfoBlock:
    {

      flex: 0.5,
      backgroundColor: 'green',
      width: 140,
      height: 80,
      margin: 2,
      borderRadius: 15,
    },

    statusInfoBlock:
    {

      flex: 0.45,
      backgroundColor: 'green',
      width: 140,
      height: 80,
      margin: 2,
      borderRadius: 15,
    },

    registrationInfoBlock:
    {

      flex: 0.6,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'green',
      width: 140,
      height: 80,
      margin: 2,
      borderRadius: 10,
    },

    jobItemContainerLeftLower:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-start',
        //backgroundColor: 'black',
        width:'99%',
        height: 35,
    },

    jobItemContainerLeft:
    {
      flex:1,
      margin: 0,
      padding:0,
      flex: 0.3,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'green',
      //width: 300,
      height: '100%',
    },
    jobItemContainerRight:
    {
      margin: 1,
      flex: 0.7,
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'orange',
      //width: 300,
      height: '97.5%',
    },

    detailsButton:
    {
        width: '55%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'yellow',
        height: 35,
        margin: 5,
        borderRadius: 15,
    },

    chatButton:
    {
        width: '40%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        height: 35,
        margin: 5,
        borderRadius: 5,
    },

    checkinbuttonpanel: 
    {
        flex: 0.35,
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: 1000,
        height: 200
    }, 

    button:
    {
        margin: 5,
        height: 60,
        width: 300,
        backgroundColor: '#fd6834',
        justifyContent: 'center',   
        alignItems: 'center',
        borderRadius: 20,
    },

    buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
    componentText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})