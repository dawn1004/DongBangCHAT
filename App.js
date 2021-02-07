import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Icon} from 'react-native-elements'
import * as firebase from 'firebase'
import ApiKeys from './firebaseConfig'
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SettingScreen from "./screens/Settings"
import AboutScreen from "./screens/AboutScreen"
import HomeScreen from "./screens/HomeScreen"
import Sidebar from "./components/SlideBar"
import LogInScreen from './screens/LogInScreen'
import { UserProvider, UserContext } from "./store/UserContext"
import AboutTvxq from "./screens/AboutTvxq"
import RendererItem from "./components/RendererItem"
import {slides} from "./slides.js"

const Drawer = createDrawerNavigator();

  //reffering
//  var tutorialsRef = firebase.database().ref("/firstAid");
  //read
// tutorialsRef.once('value', function(snapshot) {
//   var tutorials = [];
//   console.log(snapshot)
// });
//create
// tutorialsRef.push()
//update
// tutorialsRef.child('-MQWOHh87JlKa_mUujXG').update({tae:"ss"}) 
//delete
// tutorialsRef.child('-MQWOHh87JlKa_mUujXG').remove() 


export default function App() {
   
   useEffect(() => {

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig)
    }else { firebase.app() }
      
   }, [])

  return(
    <UserProvider>
        <NavContainer />
    </UserProvider>
  )

  
}


function NavContainer(){

  const [authUser, setAuthUser] = useContext(UserContext)
  const [intro, setIntro] = useState(null)

  useEffect(()=>{
    check()
  },[])

  const check = async()=>{
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        setIntro(false)
      }else{
        setIntro(true)
        await AsyncStorage.setItem('@storage_Key', "true")
      }
    } catch(e) {
    }

  }

  if(intro == null){
    return null
  }
  if(intro){
    return(
      <AppIntroSlider renderItem={RendererItem} data={slides} onDone={()=>{setIntro(false)}} />
    )
  }

   
  return authUser?(
  <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="HomeScreen"
      drawerContent={ props=> <Sidebar {...props} />}
      drawerContentOptions={{activeTintColor: "#ba000d"}}
      >
        <Drawer.Screen
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({focused, color, size})=>(
            <Icon name="home" style={{fontSize: size, color: color}}/>
          )
        }}
        />
        <Drawer.Screen 
        name="Account Settings" 
        component={SettingScreen} 
        options={{
          drawerIcon: ({focused, color, size})=>(
            <Icon type='font-awesome' name="wrench" style={{fontSize: size, color: color}}/>
          )
        }}
        />
        <Drawer.Screen 
        name="About App" 
        component={AboutScreen} 
        options={{
          drawerIcon: ({focused, color, size})=>(
            <Icon name="info" style={{fontSize: size, color: color}}/>
          )
        }}
        />
        <Drawer.Screen 
        name="About TVXQ" 
        component={AboutTvxq} 
        options={{
          drawerIcon: ({focused, color, size})=>(
            <Icon name="info" style={{fontSize: size, color: color}}/>
          )
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  ):
  <LogInScreen />
}











const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
