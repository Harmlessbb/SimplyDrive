import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'


const Home = () => {

  const router = useRouter();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
    <ImageBackground source={require('../assets/lightmodebg.jpg')} style={{height:'100%', width:'100%', opacity:1}}>
      <View style={styles.bgOverlay} />

      <Image
        source={require('../assets/Logo-dark-H-noBG.png')}
        style={{ width: 800, height: 225, alignSelf: 'center', marginTop: '125' }}>
        
      </Image>

      

        <View style={{height:'30%', width:'100%', flexDirection:'row', alignContent:'center', justifyContent:'center', padding: 15}}>
          
          <TouchableOpacity
          onPress={() => router.push('/calendar')}
          style={{height: 175, width: 175, borderRadius: 25, elevation: 15, backgroundColor:'#ffffff', marginHorizontal: 30, borderColor:'#BBBCC3', borderWidth:0.1, alignContent:'center', justifyContent:'center'}}>

              <Image
                source={require('../assets/Calender-Icon-Coloured.png')}
                style={{ width: '25%', height: '25%', alignSelf: 'center', marginBottom: 0, resizeMode:'contain' }}>
                
              </Image>

              <Text style={{textAlign: 'center', fontSize:20, marginTop:20}}> View Calendar </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/noborder/checkin')}
            style={{height: 175, width: 175, borderRadius: 25, elevation: 15, backgroundColor:'#ffffff', marginHorizontal: 30, borderColor:'#BBBCC3', borderWidth:0.1, alignContent:'center', justifyContent:'center'}}>

                <Image
                  source={require('../assets/Car-Icon-Coloured.png')}
                  style={{ width: '25%', height: '25%', alignSelf: 'center', marginBottom: 0, resizeMode:'contain' }}>
                  
                </Image>

                <Text style={{textAlign: 'center', fontSize:20, marginTop:20}}> Check-In Vehicle </Text>

            </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/jobsOngoing')}
            style={{height: 175, width: 175, borderRadius: 25, elevation: 15, backgroundColor:'#ffffff', marginHorizontal: 30, borderColor:'#BBBCC3', borderWidth:0.1, alignContent:'center', justifyContent:'center'}}>

                <Image
                  source={require('../assets/Clock-Icon-Coloured.png')}
                  style={{ width: '25%', height: '25%', alignSelf: 'center', marginBottom: 0, resizeMode:'contain' }}>
                  
                </Image>

                <Text style={{textAlign: 'center', fontSize:20, marginTop:20}}>Ongoing Jobs</Text>

            </TouchableOpacity>

          <TouchableOpacity
            style={{height: 175, width: 175, borderRadius: 25, elevation: 15, backgroundColor:'#ffffff', marginHorizontal: 30, borderColor:'#BBBCC3', borderWidth:0.1, alignContent:'center', justifyContent:'center'}}>

                <Image
                  source={require('../assets/Tools-Icon-Coloured.png')}
                  style={{ width: '25%', height: '25%', alignSelf: 'center', marginBottom: 0, resizeMode:'contain' }}>
                  
                </Image>

                <Text style={{textAlign: 'center', fontSize:20, marginTop:20}}>Garage Settings</Text>

            </TouchableOpacity>

        </View>


        <Text style={{marginBottom: 10, position: 'absolute', top:750, left:300}}> Please note this application is for demo purposes only, and is missing features that will be present in the final product. </Text>
        </ImageBackground>
    </View>

  )
}

export default Home

const styles = StyleSheet.create({

      bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)', // tweak this
  },

})