import React, {useState, useEffect, useContext} from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Icon, Button, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from "../store/UserContext"
import * as firebase from 'firebase'


import ChatBox from "./ChatBox"
import PlayButton from "../components/playButton"

const Stack = createStackNavigator();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
    
    return (
        <Stack.Navigator>
          <Stack.Screen 
          name="DongBangChat" 
          component={HomeStack} 
          options={{ 
              title: 'DongBangChat',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Button
                onPress={() => {navigation.openDrawer()}}
                color="#fff"
                buttonStyle={{backgroundColor: "transparent"}}
                icon={{
                  name: "menu",
                  size: 30,
                  color: "white"
                }}
              />
              ),
              headerStyle: {
                backgroundColor: '#e13f3c',
                elevation: 0,
                height: 100
            },
            headerTintColor: '#fff'
          }}
          />
          <Stack.Screen name="Chatbox" component={ChatBox} 
          options={{
          title: "",
          cardStyle:{backgroundColor: "white"},
          headerStyle:{elevation: 0, backgroundColor: '#e13f3c', height: 100},
          headerTintColor: '#fff',
          headerRight: () => (
            <PlayButton />
          ),
          }}
          />
          
        </Stack.Navigator>
      );
}

function HomeStack({navigation}){
    const [authUser, setAuthUser] = useContext(UserContext)
    const [servers, setServers] = useState([
      {
        severName: "Cassiopeia",
        country: "Korea",
        users: 200
      },
      {
        severName: "BigEast",
        country: "Japan",
        users: 3000
      },
      {
        severName: "CassPH",
        country: "PH",
        users: 310
      }
    ])


    useEffect(() => {

      const unsubscribe = navigation.addListener('focus', () => {
          var usersRefs = firebase.database().ref("/users");

          usersRefs.child(authUser.id)
          .update({
            imgURI: authUser.imgURI? authUser.imgURI: "",
            password: authUser.password,
            userName: authUser.userName,
            onServer: null
          }, ()=>{
              console.log("updated the onServer")
          }) 
      });

      return unsubscribe
    }, [navigation])
    


    useEffect(() => {
      const UsersRef = firebase.database().ref("/users");

      UsersRef.on('value', function(snapshot) {
          let Cassiopeia = 0
          let BigEast = 0
          let CassPH = 0 

          let Users = snapshot.val()
          
          for(let id in Users){
              if(Users[id].onServer == "Cassiopeia"){
                Cassiopeia = Cassiopeia+1;
              }else if(Users[id].onServer == "BigEast"){
                BigEast = BigEast+1;
              }else if(Users[id].onServer == "CassPH"){
                CassPH = CassPH+1;
              }
          }

          const serverList = [Cassiopeia, BigEast, CassPH]
          setServers(oldVal=>{
            return oldVal.map((serv, i)=>{
              serv.users = serverList[i]
              return serv
            })
          })

      });

    }, [])




    return(
        <View style={styles.parent}>
            <View style={styles.child}>

            {
              servers.map((server, i)=>{
                return(
                <Card containerStyle={{borderRadius: 20}} key={i}>
                  <Card.Title>
                    <Text h4 style={{color:"#4d4d4d"}}>
                      {server.severName}
                    </Text>
                  </Card.Title>
    
                  <Card.Divider/>
    
                  <View style={styles.boxesContainer}>
                    <View style={{...styles.boxes, ...styles.loc}}>
                      <Text style={{fontSize: 22, color: "#e03e3b"}}>{server.country}</Text>
                      <Text style={{fontSize: 12, marginTop: 4, color: "#e03e3b"}}>Server Loc </Text>
                    </View>
                    <View style={{...styles.boxes, ...styles.users}}>
                      <Text style={{fontSize: 22, color: "#e13f3c"}} >{server.users}</Text>
                      <Text style={{fontSize: 12, marginTop: 4, color: "#e13f3c"}}>In room </Text>
                    </View>   
                        
                    <TouchableOpacity onPress={()=>{navigation.navigate('Chatbox', {server:server.severName})}}>
                      <LinearGradient
                      colors={['#e13f3c', '#ea8756']}
                      style={{...styles.boxes, ...styles.join}}
                      start={{x: 0, y:0}}
                      end={{x: 0.9, y: 0.9}}
                      >  
                      <Text style={{fontSize: 22, color: 'white'}}>Join</Text>
                      </LinearGradient>         
                    </TouchableOpacity>
                  
                  </View>
                </Card>
                )
              })
            }

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
  parent: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#e13f3c"
  },
  child:{
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  boxes: {
    width: 90,
    alignItems: 'center',
    borderRadius: 10,
    padding: 4,
  },
  loc:{
    borderColor:'#e03e3b',
    borderWidth: 1
  },
  users:{
    borderColor:'#e13f3c',
    borderWidth: 1
  },
  join:{
    backgroundColor: "#e13f3c",
    height: 60,
    justifyContent: "center"
  }


})