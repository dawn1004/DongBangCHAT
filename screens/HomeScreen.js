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
            imgURI: authUser.imgURI,
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





    const tvxq = [
      {
        title: "Hug (Japanese version)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F06%20Hug%20(Japanese%20version).mp3?alt=media&token=bba039e7-c77b-476f-be01-41aeee103433",
        album: "HM&S"
      },
      {
        title: "Break Up The Shell.",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F07%20Break%20Up%20The%20Shell.mp3?alt=media&token=96d7db48-491f-43dd-9ad3-7a21c45ade81"
        ,album: "HM&S"
      },
      {
        title: "愛せない愛したい (Aisenai Aishitai)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F09%20%E6%84%9B%E3%81%9B%E3%81%AA%E3%81%84%E6%84%9B%E3%81%97%E3%81%9F%E3%81%84%20(Aisenai%20Aishitai).mp3?alt=media&token=b15f175f-4534-4463-b1b3-192323933846"
        ,album: "HM&S"
      },
      {
        title: "One (Japanese Version)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F10%20One%20(Japanese%20Version).mp3?alt=media&token=725bc0fa-7f44-41f7-98af-e82bcd3b4d16"
        ,album: "HM&S"
      },
      {
        title: "Eternal",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F12%20Eternal.mp3?alt=media&token=e3609156-f905-4d9e-b963-6b48eb526b95"
        ,album: "HM&S"
      },
      {
        title: "Stay With Me Tonight (Acapella)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F14%20Stay%20With%20Me%20Tonight%20(Acapella).mp3?alt=media&token=1ee5f8bb-daa2-4111-88d6-b422fb0a7278"
        ,album: "HM&S"
      },
      {
        title: "Somebody To Love (Acapella)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F15%20Somebody%20To%20Love%20(Acapella).mp3?alt=media&token=50dd58b5-0d8f-4317-8175-1723b5cfb38a"
        ,album: "HM&S"
      },
      {
        title: "My Destiny (Acapella)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F16%20My%20Destiny%20(Acapella).mp3?alt=media&token=838c6951-e4e5-4c4f-bf37-e702a8f55edf"
        ,album: "HM&S"
      },
      {
        title: "Ashita wa Kuru Kara (Acapella)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FHEART%20MIND%20AND%20SOUL%2F17%20Ashita%20wa%20Kuru%20Kara%20(Acapella).mp3?alt=media&token=0a055306-afc6-496a-9c27-d80edadc1837"
        ,album: "HM&S"
      },
      {
        title: "Wrong Number",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F01.%20Wrong%20Number%20%5Bkpopdownloadd%5D.mp3?alt=media&token=b9f5d110-c8ac-4e56-ad34-a7331a38cc8b"
        ,album: "MIROTIC"
      },
      {
        title: "Don_t Cry My Lover ",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F02.%20Don_t%20Cry%20My%20Lover%20(%EC%82%AC%EB%9E%91%EC%95%84%20%EC%9A%B8%EC%A7%80%EB%A7%88)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=5e3a71fd-8545-49a1-af9b-5680aa66745e"
        ,album: "MIROTIC"
      },
      {
        title: "MIROTIC (주문)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F03.%20MIROTIC%20(%EC%A3%BC%EB%AC%B8)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=e8ccac79-29a0-49c4-8b84-3e721f5df0c9"
        ,album: "MIROTIC"
      },
      {
        title: "Crazy Love",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F04.%20Crazy%20Love%20%5Bkpopdownloadd%5D.mp3?alt=media&token=39f6349a-8698-49bd-b0f7-a46007b9f9b2"
        ,album: "MIROTIC"
      },
      {
        title: "Hey! (Don_t Bring Me Down)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F05.%20Hey!%20(Don_t%20Bring%20Me%20Down)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=804467c4-0894-4ea0-9e03-51210d5261dd"
        ,album: "MIROTIC"
      },
      {
        title: "Wish (소원)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F06.%20Wish%20(%EC%86%8C%EC%9B%90)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=e868c715-56b5-4191-950d-c939f9ae5870"
        ,album: "MIROTIC"
      },
      {
        title: "You_re My Melody",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F07.%20You_re%20My%20Melody%20(%EB%84%8C%20%EB%82%98%EC%9D%98%20%EB%85%B8%EB%9E%98)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=6947c61a-167b-4238-9904-0d2fc36a5dff"
        ,album: "MIROTIC"
      },
      {
        title: "Picture Of You (노을.바라보다)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F08.%20Picture%20Of%20You%20(%EB%85%B8%EC%9D%84.%EB%B0%94%EB%9D%BC%EB%B3%B4%EB%8B%A4)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=58505d53-ba01-455b-a150-91ee64c67128"
        ,album: "MIROTIC"
      },
      {
        title: "Rainbow (무지개)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F09.%20Rainbow%20(%EB%AC%B4%EC%A7%80%EA%B0%9C)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=bc79350d-c1b2-46c4-9ba3-de12283fba7a"
        ,album: "MIROTIC"
      },
      {
        title: "Love Bye Love (사랑 안녕 사랑)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F10.%20Love%20Bye%20Love%20(%EC%82%AC%EB%9E%91%20%EC%95%88%EB%85%95%20%EC%82%AC%EB%9E%91)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=4bb16fed-c84d-4fa3-a9ad-daa5a543a7df"
        ,album: "MIROTIC"
      },
      {
        title: "Paradise (낙원)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F11.%20Paradise%20(%EB%82%99%EC%9B%90)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=4f0fd0e6-9922-4013-bcf5-2d435b12e77a"
        ,album: "MIROTIC"
      },
      {
        title: "Are You A Good Girl (악녀)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F12.%20Are%20You%20A%20Good%20Girl%20(%EC%95%85%EB%85%80)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=7c80ec73-7a57-4632-9560-c0d178aa2e87"
        ,album: "MIROTIC"
      },
      {
        title: "Flower Lady",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F13.%20Flower%20Lady%20%5Bkpopdownloadd%5D.mp3?alt=media&token=f32c24c6-d73d-4dc2-bece-a7b91d41c520"
        ,album: "MIROTIC"
      },
      {
        title: "Don_t Say Goodbye",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F14.%20Don_t%20Say%20Goodbye%20%5Bkpopdownloadd%5D.mp3?alt=media&token=2ae36089-8313-4818-95b1-cecabad79046"
        ,album: "MIROTIC"
      },
      {
        title: "Forgotten Season (잊혀진 계절)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F15.%20Forgotten%20Season%20(%EC%9E%8A%ED%98%80%EC%A7%84%20%EA%B3%84%EC%A0%88)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=f21b0a9e-da85-4d80-a497-9b2de7ad9810"
        ,album: "MIROTIC"
      },
      {
        title: "Love In The Ice",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F16.%20Love%20In%20The%20Ice%20%5Bkpopdownloadd%5D.mp3?alt=media&token=e30b74a8-6bad-4dc8-b6c5-b64243ebb6b0"
        ,album: "MIROTIC"
      },
      {
        title: "MIROTIC (주문) (Acoustic Ver.)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FMIROTIC%2F17.%20MIROTIC%20(%EC%A3%BC%EB%AC%B8)%20(Acoustic%20Ver.)%20%5Bkpopdownloadd%5D.mp3?alt=media&token=6d512214-b5f7-40c3-bfa8-dde39598d639"
        ,album: "MIROTIC"
      },
      {
        title: "Beautiful Life",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2FBeautiful%20Life.mp3?alt=media&token=b04b3e99-264f-4aed-a945-3753d51ec117"
        ,album: "RISSING SUN"
      },
      {
        title: "Dangerous Mind",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2FDangerous%20Mind.mp3?alt=media&token=7e85fa47-9ac5-476c-929e-e8bd76f7f3fe"
        ,album: "RISSING SUN"
      },
      {
        title: "Free Your Mind (Feat. The Trax)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2FFree%20Your%20Mind%20(Feat.%20The%20Trax).mp3?alt=media&token=4b2e83af-cc83-4f42-92ba-c248e3ae4f5f"
        ,album: "RISSING SUN"
      },
      {
        title: "Love After Love",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2FLove%20After%20Love.mp3?alt=media&token=3a874e0d-3048-494f-ad0b-82b21a2c08dd"
        ,album: "RISSING SUN"
      },
      {
        title: "Love Is",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2FLove%20Is.mp3?alt=media&token=f48a27a9-dd8f-4368-ae5c-aca8c7c0d3a6"
        ,album: "RISSING SUN"
      },
      {
        title: "One",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2FOne.mp3?alt=media&token=0cf10034-a580-4ac2-9efc-a3fb8a70ed47"
        ,album: "RISSING SUN"
      },
      {
        title: "Rising Sun (순수)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2FRising%20Sun%20(%EC%88%9C%EC%88%98).mp3?alt=media&token=5110f8a8-cc1d-4c8c-965e-5be5019a5991"
        ,album: "RISSING SUN"
      },
      {
        title: "내가 허락할 테니 (Love Is Never Gone)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2F%EB%82%B4%EA%B0%80%20%ED%97%88%EB%9D%BD%ED%95%A0%20%ED%85%8C%EB%8B%88%20(Love%20Is%20Never%20Gone).mp3?alt=media&token=e5268c37-6310-41c5-a0a1-c1aca9b81498"
        ,album: "RISSING SUN"
      },
      {
        title: "믹키유천 Tonight",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2F%EB%AF%B9%ED%82%A4%EC%9C%A0%EC%B2%9C%20Tonight.mp3?alt=media&token=00bd6f36-60f1-4957-b739-92ce18d46323"
        ,album: "RISSING SUN"
      },
      {
        title: "바보 (Unforgettable)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2F%EB%B0%94%EB%B3%B4%20(Unforgettable).mp3?alt=media&token=777c9379-3bc8-4fe8-bf1b-0bc7802f793b"
        ,album: "RISSING SUN"
      },
      {
        title: "약속했던 그 때에 (Always There...)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2F%EC%95%BD%EC%86%8D%ED%96%88%EB%8D%98%20%EA%B7%B8%20%EB%95%8C%EC%97%90%20(Always%20There...).mp3?alt=media&token=c749c334-8ebf-4546-bca8-9927b3b1b863"
        ,album: "RISSING SUN"
      },
      {
        title: "작은 고백 (Your Love Is All I Need)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FRISSING%20SUN%2F%EC%9E%91%EC%9D%80%20%EA%B3%A0%EB%B0%B1%20(Your%20Love%20Is%20All%20I%20Need).mp3?alt=media&token=101d78fa-281a-476a-a777-81bc9717e6bc"
        ,album: "RISSING SUN"
      },
      {
        title: "Beautiful You",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F01.%20Beautiful%20You.mp3?alt=media&token=c51a45f3-2a83-4a3b-8f53-09a78a7b0252"
        ,album: "SIDE-A"
      },
      {
        title: "HUG (International Ver.)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F01.%20HUG%20(International%20Ver.).mp3?alt=media&token=35343814-cba3-4902-966d-cc59b0aa310b"
        ,album: "SIDE-A"
      },
      {
        title: "SHINE",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F01.%20SHINE.mp3?alt=media&token=895d94fe-1aae-497f-afaf-13c7472a8922"
        ,album: "SIDE-A"
      },
      {
        title: "Ride On",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F02.%20Ride%20On.mp3?alt=media&token=efb200a9-4099-44fd-9e0b-21891a934737"
        ,album: "SIDE-A"
      },
      {
        title: "Stay With Me Tonight",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F02.%20Stay%20With%20Me%20Tonight.mp3?alt=media&token=8e6ee005-84c4-4ffe-be2c-905627dee442"
        ,album: "SIDE-A"
      },
      {
        title: "千年恋歌 ／ Sennen Koi Uta",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F02.%20%E5%8D%83%E5%B9%B4%E6%81%8B%E6%AD%8C%20%EF%BC%8F%20Sennen%20Koi%20Uta.mp3?alt=media&token=b1a16610-9f50-4a86-a766-a0ebe142c203"
        ,album: "SIDE-A"
      },
      {
        title: "Forever Love",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F03.%20Forever%20Love.mp3?alt=media&token=9a702b72-155d-4eb9-9c39-7c96af59bb4f"
        ,album: "SIDE-A"
      },
      {
        title: "Somebody To Love",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F03.%20Somebody%20To%20Love.mp3?alt=media&token=dba6d4c5-3c0d-4941-8b6e-2b08053db7d9"
        ,album: "SIDE-A"
      },
      {
        title: "どうして君を好きになってしまったんだろう",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F03.%20%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6%E5%90%9B%E3%82%92%E5%A5%BD%E3%81%8D%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%A6%E3%81%97%E3%81%BE%E3%81%A3%E3%81%9F%E3%82%93%E3%81%A0%E3%82%8D%E3%81%86.mp3?alt=media&token=299480a8-f424-45ac-8140-e56ffc9e8dea"
        ,album: "SIDE-A"
      },
      {
        title: "My Destiny",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F04.%20My%20Destiny.mp3?alt=media&token=2befd7f5-b6a5-4ad2-8209-9f3167bc7f29"
        ,album: "SIDE-A"
      },
      {
        title: "Together",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F04.%20Together.mp3?alt=media&token=7fd05a84-8d98-4ca8-b3c1-35dd2f699f4f"
        ,album: "SIDE-A"
      },
      {
        title: "呪文 -MIROTIC",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F04.%20%E5%91%AA%E6%96%87%20-MIROTIC-.mp3?alt=media&token=092c55b9-94e9-4cd3-ab72-7868f1997ac6"
        ,album: "SIDE-A"
      },
      {
        title: "Bolero",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F05.%20Bolero.mp3?alt=media&token=f26058c0-6b14-4817-a287-82544495ee11"
        ,album: "SIDE-A"
      },
      {
        title: "Purple Line",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F05.%20Purple%20Line.mp3?alt=media&token=d46b4eae-7109-45f5-8563-78e0767ad957"
        ,album: "SIDE-A"
      },
      {
        title: "Asu wa Kuru Kara",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F05.%20%E6%98%8E%E6%97%A5%E3%81%AF%E6%9D%A5%E3%82%8B%E3%81%8B%E3%82%89%20%EF%BC%8F%20Asu%20wa%20Kuru%20Kara.mp3?alt=media&token=ca20d050-c91c-44be-b2f0-5322e595a63b"
        ,album: "SIDE-A"
      },
      {
        title: "Kiss The Baby Sky",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F06.%20Kiss%20The%20Baby%20Sky.mp3?alt=media&token=e1f6187d-7aff-4565-92a8-3bed73a2c662"
        ,album: "SIDE-A"
      },
      {
        title: "Rising Sun (JP)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F06.%20Rising%20Sun.mp3?alt=media&token=dad6efc6-cf4d-49cc-9a54-fb2f3f5e8dc2"
        ,album: "SIDE-A"
      },
      {
        title: "Two Hearts",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F06.%20Two%20Hearts.mp3?alt=media&token=3a98a5d9-bbcb-4751-8eca-0df9fcfe5190"
        ,album: "SIDE-A"
      },
      {
        title: "Heart, Mind and Soul",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F07.%20Heart%2C%20Mind%20and%20Soul.mp3?alt=media&token=e567a9c6-bb00-4cc7-8729-dfc5b2b17b22"
        ,album: "SIDE-A"
      },
      {
        title: "WILD SOUL (CHANGMIN)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F07.%20WILD%20SOUL%20(CHANGMIN%20from%20THSK).mp3?alt=media&token=eb9c617e-4ed9-450d-a414-fa12599fd359"
        ,album: "SIDE-A"
      },
      {
        title: "Wasurenaide(忘れないで)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F07.%20%E5%BF%98%E3%82%8C%E3%81%AA%E3%81%84%E3%81%A7%20%EF%BC%8F%20Wasurenaide.mp3?alt=media&token=c6170ebe-8327-4af4-967c-0cf59c4f8a29"
        ,album: "SIDE-A"
      },
      {
        title: "Begin",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F08.%20Begin.mp3?alt=media&token=088329b8-1d12-4706-9ab1-48bf8b104f95"
        ,album: "SIDE-A"
      },
      {
        title: "Runaway",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F08.%20Runaway.mp3?alt=media&token=9f381c39-fc9a-45c8-a6b1-e8a0fc4ffb37"
        ,album: "SIDE-A"
      },
      {
        title: "Survivor",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F08.%20Survivor.mp3?alt=media&token=3625f06b-2a52-46d5-8fdf-9ea65417c803"
        ,album: "SIDE-A"
      },
      {
        title: "My Girlfriend (YUCHUN)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F09.%20My%20Girlfriend%20(YUCHUN%20from%20THSK).mp3?alt=media&token=523a858b-5196-45c7-b7dc-b2e5aae64ad5"
        ,album: "SIDE-A"
      },
      {
        title: "Share The World",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F09.%20Share%20The%20World.mp3?alt=media&token=0e325f08-5cc3-49c0-8960-c51ede255557"
        ,album: "SIDE-A"
      },
      {
        title: "Sky",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F09.%20Sky.mp3?alt=media&token=3291f36c-fb69-4a1d-b275-a914bd57e080"
        ,album: "SIDE-A"
      },
      {
        title: "If...!",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F10.%20If...!.mp3?alt=media&token=67b79a53-b11a-4173-aba7-d72ef0b07f83"
        ,album: "SIDE-A"
      },
      {
        title: "Miss You",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F10.%20Miss%20You.mp3?alt=media&token=796b646d-9acd-41af-9660-5d2196664beb"
        ,album: "SIDE-A"
      },
      {
        title: "We Are!(ウィーアー!)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F10.%20%E3%82%A6%E3%82%A3%E3%83%BC%E3%82%A2%E3%83%BC!%20%EF%BC%8F%20We%20Are!.mp3?alt=media&token=bc6077d7-5443-4044-a0cc-61406135b75d"
        ,album: "SIDE-A"
      },
      {
        title: "'O'‐正・反・合",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F11.%20'O'%E2%80%90%E6%AD%A3%E3%83%BB%E5%8F%8D%E3%83%BB%E5%90%88.mp3?alt=media&token=1f67f9d3-c699-407d-8cd4-8b8bd4e505ac"
        ,album: "SIDE-A"
      },
      {
        title: "Rainy Night (JUNSU)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F11.%20Rainy%20Night%20(JUNSU%20from%20THSK).mp3?alt=media&token=0342c74a-83bf-4973-b281-aee95fd4b26c"
        ,album: "SIDE-A"
      },
      {
        title: "Stand by U",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F11.%20Stand%20by%20U.mp3?alt=media&token=209110b3-0353-40c1-bc73-00252493b2a1"
        ,album: "SIDE-A"
      },
      {
        title: "BREAK OUT!.",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F12.%20BREAK%20OUT!.mp3?alt=media&token=589eba02-2f11-41fc-867d-38b1689a295a"
        ,album: "SIDE-A"
      },
      {
        title: "Close To You",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F12.%20Close%20To%20You.mp3?alt=media&token=f6f2d548-bf09-4f39-b9f3-308f3c2b68d8"
        ,album: "SIDE-A"
      },
      {
        title: "Step by Step",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F12.%20Step%20by%20Step.mp3?alt=media&token=7e2f4f33-e711-4112-b4a8-c3a976be4791"
        ,album: "SIDE-A"
      },
      {
        title: "Choosey Lover",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F13.%20Choosey%20Lover.mp3?alt=media&token=7c925c6c-0a48-479b-925f-c955c2be5547"
        ,album: "SIDE-A"
      },
      {
        title: "Crazy Life (YUNHO)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F13.%20Crazy%20Life%20(YUNHO%20from%20THSK).mp3?alt=media&token=ac00657d-2f81-4ae9-866f-7703a954e4cf"
        ,album: "SIDE-A"
      },
      {
        title: "Toki wo Tomete (時ヲ止メテ)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F13.%20%E6%99%82%E3%83%B2%E6%AD%A2%E3%83%A1%E3%83%86%20%EF%BC%8F%20Toki%20wo%20Tomete.mp3?alt=media&token=08819e84-6b01-40b8-969b-8c8f1f3518bc"
        ,album: "SIDE-A"
      },
      {
        title: "Keyword",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F14.%20Keyword.mp3?alt=media&token=b428f013-ff10-4744-af02-14e1d0d7cd09"
        ,album: "SIDE-A"
      },
      {
        title: "Lovin' You",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F14.%20Lovin'%20You.mp3?alt=media&token=d75a5ba0-4b32-4ebe-beb1-20c838c540fa"
        ,album: "SIDE-A"
      },
      {
        title: "Maze (JEJUNG).",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F15.%20Maze%20(JEJUNG%20from%20THSK).mp3?alt=media&token=b548d1b4-ed37-46df-969e-75393a491ad2"
        ,album: "SIDE-A"
      },
      {
        title: "Song For You",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F16.%20Song%20For%20You.mp3?alt=media&token=7f43a12a-1eb3-4891-9825-6a5cf7473754"
        ,album: "SIDE-A"
      },
      {
        title: "Love in the Ice",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FSIDE-A%2F17.%20Love%20in%20the%20Ice.mp3?alt=media&token=2d310fea-68cc-4f46-bf3c-8637b031e9f1"
        ,album: "SIDE-A"
      },
      {
        title: "BoA-The Trax-東方神起 Tri-Angle",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2FBoA-The%20Trax-%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20Tri-Angle%20(Extended%20Version%2C%20Performed%20By%20%EB%8F%99%EB%B0%A9%EC%8B%A0%EA%B8%B0%2C%20BoA%20%26%20The%20Trax).mp3?alt=media&token=3f2d9a79-10ff-4c9b-9e8a-13ca42a2baf1"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "Hug",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2FHug.mp3?alt=media&token=351dd5d8-d4ce-4a77-adfc-ce661f5512b5"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "I Never Let Go",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20I%20Never%20Let%20Go.mp3?alt=media&token=56bb2913-3971-41c7-b0d8-6699030e3a38"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "Million Men",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20Million%20Men.mp3?alt=media&token=f89b5619-6aa3-48b7-88bf-4f47e12c8b03"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "My Little Princess ",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20My%20Little%20Princess%20(%EC%9E%88%EC%9E%96%EC%95%84%EC%9A%94...).mp3?alt=media&token=86eab289-d557-428d-93dc-75e5d87c267f"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "Thanks To",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20Thanks%20To.mp3?alt=media&token=231c3348-4529-4e7d-8a48-9162205fc961"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "The Way U Are",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20The%20Way%20U%20Are.mp3?alt=media&token=72543a96-54cb-423c-8c81-4e47a2b57926"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "Tri-angle (동방신기 Version)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20Tri-angle%20(%EB%8F%99%EB%B0%A9%EC%8B%A0%EA%B8%B0%20Version).mp3?alt=media&token=91546bad-d078-4c0a-9cab-2e5c91615cd4"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "Whatever They Say(Accapella)",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20Whatever%20They%20Say%20(Accapella%20Version).mp3?alt=media&token=2e033ae6-df41-4153-b82f-807957ddd763"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "꼬마야",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20%EA%BC%AC%EB%A7%88%EC%95%BC.mp3?alt=media&token=99574b01-c398-4232-afc1-01e5e167c9be"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "내 여자친구가 되어줄래",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20%EB%82%B4%20%EC%97%AC%EC%9E%90%EC%B9%9C%EA%B5%AC%EA%B0%80%20%EB%90%98%EC%96%B4%EC%A4%84%EB%9E%98-.mp3?alt=media&token=ded883ac-c143-460b-9975-f7ba408fda5a"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "넌 언제나",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20%EB%84%8C%20%EC%96%B8%EC%A0%9C%EB%82%98.mp3?alt=media&token=4eabe5fe-330f-413f-8ff9-b1b7d7a347ab"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "믿어요",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20%EB%AF%BF%EC%96%B4%EC%9A%94.mp3?alt=media&token=23af6234-070c-419c-8ab7-aa8758bd0dde"
        ,album: "TRI_-ANGLE"
      },
      {
        title: "지금처럼",
        uri: "https://firebasestorage.googleapis.com/v0/b/dongbang-64d4d.appspot.com/o/songs%2FTriangle%2F%E6%9D%B1%E6%96%B9%E7%A5%9E%E8%B5%B7%20%EC%A7%80%EA%B8%88%EC%B2%98%EB%9F%BC.mp3?alt=media&token=6ab8f48c-0617-4dd4-b30f-0d33a82fae2b"
        ,album: "TRI_-ANGLE"
      }
      
    ]



    // useEffect(() => {
    //   //songs
    //   const SongRefs = firebase.database().ref("/songs");

    //   // tvxq.forEach((thsk)=>{
    //   //   SongRefs.push(thsk)
    //   // })
    // }, [])


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