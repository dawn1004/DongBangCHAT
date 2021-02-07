import React from 'react'
import { Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button, Image, Input, withTheme } from 'react-native-elements';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SignUpForm from '../components/SignUpForm'
import LogInForm from '../components/LogInForm';

const {useState, useEffect} = React;
const Stack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LogInScreen({ navigation, setAuthUser }) {

    let [fontsLoaded] = useFonts({
        'Pacifico-ocen': require('../assets/Pacifico-Regular.ttf'),
    });
    
    const [onLogIn, setOnLogIn] = useState(true);
    

    const toggleFormView = (loginView)=>{
        if(loginView){
            setOnLogIn(false)
        }else{
            setOnLogIn(true)
        }
    }




    if(!fontsLoaded){
        return null;
    }
    return(
        <View>
            <ImageBackground
            style={styles.imageBG}
            source={require("../assets/loginBG.png")}
            >
                {
                    onLogIn?
                    (
                        <LogInForm toggleFormView={toggleFormView}  />
                    ):
                    (
                        <SignUpForm toggleFormView={toggleFormView} />
                    )
                }

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    imageBG: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: "cover",
        height: windowHeight,
        width: windowWidth
    },
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




