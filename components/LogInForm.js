import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon, Button, Input, } from 'react-native-elements';
import { useFonts, } from '@expo-google-fonts/inter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
const {useState, useEffect, useContext} = React
import { UserContext } from "../store/UserContext"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LogInForm({toggleFormView}) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorUsername, setErrorUsername] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [showEye, setShowEye] = useState(false)
    const [attempt, setAttempt] = useState(0)
    const [count, setCount] =useState(10)

    const [users, setUsers] = useState([])
    const [authUser, setAuthUser] = useContext(UserContext)

    const [buttonDisable, setButtonDisabled] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const check = async()=>{
        try {
          const value = await AsyncStorage.getItem('@auth_user')
          setShowLogin(true)
          if(value !== null) {
            setAuthUser(JSON.parse(value))
          }
        } catch(e) {
        }
    
      }



    useEffect(() => {
        check()

        const UsersRef = firebase.database().ref("/users");

        UsersRef.once('value', function(snapshot) {
            
            let Users = snapshot.val()
            var userList = [];
            
            for(let id in Users){
                userList.push({id, ...Users[id]})
            }
            setUsers(userList)

        });
    }, [])

    const logIn = ()=>{
        setErrorPassword("")
        setErrorUsername("")

        const UsersRef = firebase.database().ref("/users");
        let letContinue = true;

        users.forEach(user=>{
            if(user.userName == userName){
                if(user.password == password){
                    AsyncStorage.setItem('@auth_user', JSON.stringify(user))
                    setAuthUser(user)
                }else{
                    setErrorPassword("Inccorect password")
                }
                letContinue = false
                return
            }
        })

        setAttempt(old=>{return(old+1)})

            let myInterval;
            setCount(10)
        if(attempt >= 2){
            setButtonDisabled(true)
            setTimeout(() => {
                setButtonDisabled(false)
                clearInterval(myInterval)
            }, 9000);
            setAttempt(0)

            myInterval = setInterval(timer, 1000);
        }
        if(letContinue){setErrorUsername("user not found")}


    }


    const timer= ()=>{
        setCount(old=>{return(old-1)})
    }

    const eyeHandler = ()=>{
        setShowEye((old)=>{return(!old)})
    }

    if(showLogin == false){
        return null
    }

    return (
    <View style={{alignItems: "center", marginTop: -100}}>
        <Text style={styles.title}>DongBangCHAT</Text>
        <Input
        placeholder='Enter your email'
        inputContainerStyle={styles.inputStyle}
        style={{color: "white"}}
        leftIcon={{ type: 'font-awesome', name: 'user', color: "grey", style: {marginLeft: 10, marginRight: 10} }}
        errorMessage={errorUsername}
        defaultValue={userName}
        onChangeText={(text)=>{setUserName(text)}}
        />
        <Input
        placeholder='Enter your password'
        secureTextEntry={!showEye}
        inputContainerStyle={styles.inputStyle}
        inputStyle={{color: "white"}}
        leftIcon={{ type: 'font-awesome', name: 'key', color: "grey", style: {marginLeft: 10, marginRight: 10} }}
        rightIcon={{ 
            type: 'font-awesome', name: showEye?'eye':'eye-slash', color: "grey", style: { marginRight: 10}, 
            onPress: eyeHandler
        }}
        errorMessage={errorPassword}
        defaultValue={password}
        onChangeText={(text)=>{setPassword(text)}}
        />

        <Button
        disabled={buttonDisable}
        title={buttonDisable? count: "Log-in"}
        containerStyle={{
            width: 280,
        }}
        buttonStyle={{
            backgroundColor: '#f82538',
            borderRadius: 10,
            height: 47,
        }}
        onPress={logIn}
        />
        <TouchableOpacity onPress={()=>{toggleFormView(true)}}>
            <Text style={styles.dontHave}>Don't have an account? 
                <Text style={{color:"#f82538"}}>Sign-up now</Text>
            </Text>                        
        </TouchableOpacity>

    </View>
    )
}


const styles = StyleSheet.create({

    inputStyle: {
        width: 280,
        backgroundColor: "#352E3D",
        borderColor: '#352E3D',
        borderRadius: 10
    },
    title: {
        color: "white",
        fontSize: 28,
        fontFamily: "Pacifico-ocen",
        marginBottom: 20
    },
    dontHave: {
        color: "white",
        marginTop: 5,
    }

})