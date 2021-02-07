import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon, Button, Input, } from 'react-native-elements';
import { useFonts, } from '@expo-google-fonts/inter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase'

const {useState, useEffect} = React

export default function SignUpForm({toggleFormView}) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [usernameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmError, setConfirmError] = useState("");


    const [users, setUsers] = useState([]);
   
    useEffect(() => {
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


    const creatAccount = ()=>{
        const UsersRef = firebase.database().ref("/users");
        let errorFound = false;
        setUserNameError("")
        setPasswordError("")
        setConfirmError("")


        users.forEach(user=>{
            if(user.userName == userName){
                setUserNameError("Username is already taken")
                errorFound = true
            }
        })
        if(userName==""){
            setUserNameError("Required")
            errorFound = true
        }
        
        if(password.length <=5){
            console.log(password.length)
            setPasswordError("Minimum 6 characters")
            errorFound = true
        }
        if(password==""){
            setPasswordError("Required")
            errorFound = true
        }
        if(confirmPass!=password){
            setConfirmError("Not matched")
            errorFound = true
        }

        if(errorFound) return

        UsersRef.push({userName, password}, ()=>{
            alert("Successfully Created")
            toggleFormView(false)
        })
    }



    return (
    <View style={{alignItems: "center", marginTop: -100}}>
        <Text style={styles.title}>Create Account</Text>
        <Input
        placeholder='Create Username'
        inputContainerStyle={styles.inputStyle}
        style={{color: "white"}}
        leftIcon={{ type: 'font-awesome', name: 'user-secret', color: "grey", style: {marginLeft: 10, marginRight: 10} }}
        defaultValue={userName}
        onChangeText={(text)=>{setUserName(text)}}
        errorMessage={usernameError}
        />
        <Input
        placeholder='Create password'
        inputContainerStyle={styles.inputStyle}
        style={{color: "white"}}
        leftIcon={{ type: 'font-awesome', name: 'key', color: "grey", style: {marginLeft: 10, marginRight: 10} }}
        defaultValue={password}
        onChangeText={(text)=>{setPassword(text)}}
        errorMessage={passwordError}
        />
        <Input
        placeholder='Confirm password'
        inputContainerStyle={styles.inputStyle}
        style={{color: "white"}}
        leftIcon={{ type: 'font-awesome', name: 'key', color: "grey", style: {marginLeft: 10, marginRight: 10} }}
        defaultValue={confirmPass}
        onChangeText={(text)=>{setConfirmPass(text)}}
        errorMessage={confirmError}
        />

        <Button
        title="Sign-up"
        containerStyle={{
            width: 280,
        }}
        buttonStyle={{
            backgroundColor: '#f82538',
            borderRadius: 10,
            height: 47,
        }}
        onPress={creatAccount}
        />
        <TouchableOpacity onPress={()=>{toggleFormView(false)}}>
            <Text style={styles.dontHave}> Go back
                <Text style={{color:"#f82538"}}> log in</Text>
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