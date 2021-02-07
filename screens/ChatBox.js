import React, { useEffect, useState, useContext, useRef} from 'react'
import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, Keyboard, } from 'react-native';
import { Input, Icon, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from "../store/UserContext"
import * as firebase from 'firebase'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ChatBox({route, navigation}) {
    const {server} = route.params;
    const [authUser, setAuthUser] = useContext(UserContext)
    
    const [_scrollToBottomY, set_scrollToBottomY] = useState(null)
    const scrollViewRef = useRef();
    const [userInput, setUserInput] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        navigation.setOptions({ title: server })

        let messagesRef = firebase.database().ref("/messages/"+server);

        messagesRef.on('value', function(snapshot) {
            let Messages = snapshot.val()
            var msgList = [];
            
            for(let id in Messages){
                msgList.push({id, ...Messages[id]})
            }
            setMessages(msgList)
        });
          

        var usersRefs = firebase.database().ref("/users");


        usersRefs.child(authUser.id)
        .update({
          imgURI: authUser.imgURI,
          password: authUser.password,
          userName: authUser.userName,
          onServer: server
        }, ()=>{
            console.log("updated the onServer")
        }) 


    }, [])


    const sendMessage = ()=>{
        if(userInput == ""){
            return
        }

        let messagesRef = firebase.database().ref("/messages/"+server);
        messagesRef.push({
            msg: userInput,
            from: authUser.userName,
            imgURI: authUser.imgURI? authUser.imgURI: ""
        }, )
        Keyboard.dismiss()
        setUserInput("")
    }



    return (
        <KeyboardAvoidingView behavior="position"
        keyboardVerticalOffset={30}
        >
        <SafeAreaView>
            
                <View style={styles.chatbox}>
                <ScrollView 
                ref={scrollViewRef}
                onContentSizeChange={(contentWidth, contentHeight)=>{
                    set_scrollToBottomY(contentHeight);
                    scrollViewRef.current.scrollToEnd({ animated: true })
                }}>
                    {               
                        messages.map((message,i)=>{
                            return authUser.userName==message.from ?
                                (<View key={i} style={{...styles.parentMessageContainer, ...styles.MeParentMessageContainer}}>
                                    <View
                                    style={{...styles.messageContainer,...styles.MeContainer}}
                                    > 
                                        <Text style={{...styles.messageText, color:"black"}}>{message.msg}</Text>                                
                                    </View>

                                </View>)
                                :
                                (<View key={i} style={styles.parentMessageContainer}>
                                    <Avatar
                                    rounded
                                    source={{uri: message.imgURI}}
                                    size={38}
                                    />
                                    <View style={styles.msgContainer}>
                                        <Text style={{fontSize: 12, color: 'grey'}}>
                                            {message.from}
                                        </Text>
                                        <LinearGradient
                                        colors={['#e13f3c', '#ea8756']}
                                        style={styles.messageContainer}
                                        start={{x: 0, y:0}}
                                        end={{x: 0.5, y: 0.9}}
                                        > 
                                            <Text style={styles.messageText}>{message.msg}</Text>                                
                                        </LinearGradient>
                                    </View>


                                </View>)
                        })
                    }
                </ScrollView>


                <View
                style={styles.textArea}
                >
                    <Input
                    containerStyle={styles.input}
                    inputContainerStyle={{borderBottomColor: "white", }}
                    inputStyle={{fontSize: 16,}}
                    placeholder='Write message here'
                    rightIcon={{ type: 'font-awesome', name: 'paper-plane', onPress: sendMessage, color: "grey", size: 36  }}
                    defaultValue={userInput}
                    onChangeText={(text)=>{
                        setUserInput(text)
                    }}
                    />
                </View>

                </View>
            
        </SafeAreaView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    chatbox:{
        width: windowWidth,
        height: windowHeight-100,
        // backgroundColor: "red",
        position: "relative",
        paddingTop: 10,
    },
    textArea:{
        width: windowWidth,
        height: 130,
        // backgroundColor: "white",
        // bottom: 0,
        // position: "absolute"
    },
    input:{
        // backgroundColor: "#352E3D",
        borderColor: '#c9c9c9',
        borderTopWidth: 1,
        paddingTop: 5,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    parentMessageContainer:{
        marginBottom: 10,
        flexDirection: "row",
        marginLeft: 10
    },
    messageContainer:{
        minWidth: 50,
        maxWidth: windowWidth-80,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "red",
        borderRadius: 10
    },
    messageText:{
        color: "white",
        fontSize: 16
    },
    msgContainer:{
        marginLeft: 5
    },
    MeContainer:{
        backgroundColor: "#e8e8e8",
        marginRight: 5
    },
    MeParentMessageContainer:{
        alignSelf: "flex-end",
        flexDirection: "row-reverse"
    }
})