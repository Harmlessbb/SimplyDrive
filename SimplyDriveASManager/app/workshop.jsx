import { StyleSheet, Text, View, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, } from 'react';


const Workshop = () => {

    const [bays, setBays] = useState([]);

  async function getData() {
    const url = "https://api.simplydrive.app/Api/Dealership/RetrieveBays?dealerID=1";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        console.log("Is the VPN on? - Fix to loopback error")
        throw new Error(`Error ${response.status} - ${response.statusText}\nResponse: ${text}`);
      }

      const result = await response.json();
      setBays(result);
    } catch (error) {
      console.error(error.message);
    } finally {
      //setLoading(false);
    }
  }

  const Bay = () => (
    <View style={styles.bayContainer}>
      <View style={styles.upperBayContainer}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 10,
          marginRight: 50,
          flexShrink: 0,
          width: '110%',
         }}>
          <Text style={[styles.componentText, {}]}>BAY TITLE</Text>


          <View style={styles.statusInfoBlock}>
            <Text style={styles.componentText}>PROGRESS</Text>
          </View>
        </View>
      </View>
       <View style={{
              //backgroundColor:'yellow',
         flex:0.15,
         flexDirection:'row',
         marginTop:10,
        marginBottom:10
        }}>
          <View style={{width: 100, alignItems: 'center', justifyContent:'center' }}> 
            <Image
             source={require('../assets/placeholderPFP.png')}
            style={{width: 60, height: 60}}
            resizeMode="contain"
             ></Image>
          </View>

          <View style={{ padding: 10, justifyContent: 'center' }}>
            <Text style={[styles.componentText, { textAlign: 'left' }]}>TECHNICIAN NAME</Text>
            <Text style={[styles.componentText, { fontSize: 10, textAlign: 'left' }]}>TECHNICIAN NAME</Text>
          </View>

       </View>
       <View style={[styles.middleBayContainer, {flexDirection:'row'}, {padding:10}, {justifyContent:'space-evenly'}]}>
         <View style={{
           backgroundColor:'#272b2c', 
           flex:0.475, 
           borderRadius:15, 
           borderColor:'#b5abab',  
           borderWidth:1,}}>

          <View style={{
           flex:0.55, 
           justifyContent: 'space-evenly',
           alignContent: 'center',
           flexDirection:'row'
          }}>
              <View style={{flex:0.45}}>
                <Image
                source={require('../assets/daciaLogo.png')}
                style={{width: 60, height: 60}}
                resizeMode="contain"
                ></Image>
              </View>
              <View style={{flex:0.45, justifyContent:'center', alignContent:'center', borderRadius:15}}>
                <Image
                source={require('../assets/daciaSandero.png')}
                style={{width:'100%', height: '90%', borderRadius:15, borderColor:'#b5abab', borderWidth:2, marginTop:'5'}}
                resizeMode="contain"
                ></Image>              
              </View>
            </View>
            
          <View style={{
            flex:0.4,
          justifyContent: 'center',
           alignContent: 'center'
          }}>
              <Text style={styles.componentText}>Sandero</Text>
            </View>  

           <View style={{
          justifyContent: 'center',
          alignItems: 'center'
          }}> 
            <View style={styles.registrationInfoBlock}>
               <Text style={styles.componentText}>REG HERE</Text>      
             </View>
          </View>
        </View>
        <View style={{backgroundColor:'#272b2c', flex:0.475, borderRadius:15, borderColor:'#b5abab', borderWidth:1}}></View>
      </View>
      <View style={styles.lowerBayContainer}>
         <View style={{flex:0.34, flexDirection:'row', justifyContent:'space-evenly', alignContent:'center'}}>
           <TouchableOpacity style={[styles.menuButtons, {marginTop:5}]}>
            <Text style={[styles.componentText, {fontSize: 16}]}>Start Authorisation</Text>
          </TouchableOpacity>
           <TouchableOpacity style={[styles.menuButtons, {marginTop:5}]}>
             <Text style={[styles.componentText, {fontSize: 16}]}>Open Chat</Text>
           </TouchableOpacity>
        </View>

        <View style={{flex:0.34}}>
          <TouchableOpacity style={[styles.menuButtons, {marginTop:5}, {flex:1}, {backgroundColor:'#fd6834'}]}>
             <Text style={[styles.componentText, {fontSize: 16}]}>Reassign Bay</Text>
          </TouchableOpacity>    
         </View>

        <View style={{flex:0.34}}>
          <View style={{flex:0.34, flexDirection:'row', justifyContent:'space-evenly', alignContent:'center'}}>
          <TouchableOpacity style={[styles.menuButtons, {marginTop:5}]}>
            <Text style={[styles.componentText, {fontSize: 16}]}>Update Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuButtons, {marginTop:5}, {backgroundColor:'#30b337'}]}>
            <Text style={[styles.componentText, {fontSize: 16}]}>Mark As Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
 </View>
 );

 useEffect(() => {
    getData();
  }, []);  

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'center' }}>

          <Bay></Bay>
          <Bay></Bay>
          <Bay></Bay>
          <Bay></Bay>
          <Bay></Bay>

        </ScrollView>
      </View>

    <View style={styles.lowerContainer}>

        <View style={styles.lowerLeftContainer}>
            <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'flex-end' }}>

                <View style={styles.onsiteBookingContainer}>

                  
                  
                </View>
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
    flex: 0.7,
    padding:5,
    margin:5,
    //backgroundColor: 'red',
    width: '100%',

  },
  lowerContainer: {
    flex: 0.35,
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
  bayContainer: {
    //backgroundColor: 'blue',
    backgroundColor: '#18181b',
    width: 350, 
    height: 500,
    marginHorizontal: 10,
    borderRadius:15,
    borderColor: '#b5abab',
    borderWidth:1,
  },
  upperBayContainer:
  {
    flex:0.125,
    //backgroundColor:'yellow',
    width:'100%',
  }, 
  middleBayContainer:
  {
    flex:0.33,
    //backgroundColor:'red',
    width:'100%',
  }, 
  lowerBayContainer:
  {
    flex:0.40,
    //backgroundColor:'yellow',
    width:'100%',
  },          
  onsiteBookingContainer: {
    //backgroundColor: 'yellow',
    backgroundColor:'#0e1013',
    width: 250, 
    height: 210,
    marginHorizontal: 10,
    borderRadius:15,
    borderColor: '#b5abab',
    borderWidth:1,
    marginBottom:15,
  },  
    componentText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusInfoBlock:
  {

    flex: 0.45,
    backgroundColor: '#2b7fff',
    width: 200,
    height: 35,
    margin: 2,
    borderRadius: 15,
    alignContent:'center',
    justifyContent:'center'
  },  
  menuButtons:
  {
    flex:0.6,
    backgroundColor:'#e23d2c',
    height: 50,
    borderRadius: 15,
    alignContent:'center',
    justifyContent:'center',
    margin:5
  },  
  registrationInfoBlock:
  {

    //flex: 0.6,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#eabe13',
    width: 140,
    height: 40,
    margin: 0,
    borderRadius: 7.5,
    marginTop: 5,
  },
});
