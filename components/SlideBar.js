import React, {useContext} from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Image, Icon, Button } from 'react-native-elements';
import {  BackHandler, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {Container, Header, Footer, Content, Right, Center, Left, Thumbnail, ListItem} from 'native-base'
import {UserContext} from '../store/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sidebar({...props}){
    const [authUser, setAuthUser] = useContext(UserContext)

    const logoutHandler = async()=>{
        await AsyncStorage.removeItem('@auth_user')
        setAuthUser(null)
    }

    return (
    <Container>
        <Header
        style={{
            backgroundColor: "#e13f3c", 
            borderBottomWidth: 0,
            height: 130,
        }}
        >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>

            {authUser.imgURI?
                (
                    <Avatar 
                    rounded
                    title="MD"
                    size="large"
                    containerStyle={{backgroundColor: "grey"}}
                    source={{
                        uri: authUser.imgURI
                    }}
                    />
                ):
                (
                    <Avatar 
                    rounded
                    title={(authUser.userName.split("")[0] +authUser.userName.split("")[1]).toUpperCase()}
                    size="large"
                    containerStyle={{backgroundColor: "white"}}
                    titleStyle={{color:"red"}}
                    />
                )
            }


            <Text
            style={{marginLeft: 10, maxWidth: 120, fontSize: 20, color:"white"}}
            >{authUser.userName}</Text>
            </View>
            
            <Right>
                <Button
                  onPress={() => {props.navigation.closeDrawer()}}
                  color="#fff"
                  buttonStyle={{backgroundColor: "transparent"}}
                  icon={{
                    name: "close",
                    size: 30,
                    color: "white"
                  }}
                />
            </Right>

        </Header>
        <Content>
            {/* <ListItem thumbnail style=>
                  <View>

                  </View>
            </ListItem> */}
            <DrawerContentScrollView {...props}>
                <DrawerItem label="">
                </DrawerItem>

                <DrawerItemList {...props} />

                <DrawerItem label="Logout" 
                onPress={logoutHandler}
                icon={(color, size)=>(
                    <Icon 
                    type='font-awesome'
                    name="sign-out" style={{fontSize: size, color: color}}/>
                )}>
                </DrawerItem>

                <DrawerItem label="Exit" 
                onPress={()=>{BackHandler.exitApp()}}
                icon={(color, size)=>(
                    <Icon 
                    type='font-awesome'
                    name="window-close" style={{fontSize: size, color: color}}/>
                )}>
                </DrawerItem>
            </DrawerContentScrollView>  
        </Content>
    </Container>

    )
}