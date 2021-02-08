import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Animated, Easing } from 'react-native'
import { Avatar, Button, Icon } from 'react-native-elements'
import { Audio } from 'expo-av';
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

export default function playButton() {
    const [sound, setSound] = useState();
    const [songs, setSongs] = useState(null)
    const [onPlaying, setOnPlaying] = useState({})
    const [next, setNext] = useState(1)
    const [timer, setTimer] =useState()
    const [albumCover, setAlbumCover] = useState()

    useEffect(() => {

        var songsRef = firebase.database().ref("/songs");

        songsRef.once('value', function(snapshot) {
            let Songs = snapshot.val()
            var songList = [];
            
            for(let id in Songs){
                songList.push({id, ...Songs[id]})
            }
            setSongs(null)
            setSongs(songList)
        });

    }, [next])

    useEffect(() => {
        try {
            let randomSong = songs[Math.floor(Math.random() * songs.length)]
            console.log(randomSong)  
            setOnPlaying({})
            setOnPlaying({
                id: randomSong.id, 
                title: randomSong.title, 
                uri:{ uri: randomSong.uri },
                album: randomSong.album
            })

            if(randomSong.album =="HM&S"){
                setAlbumCover(require("../assets/heart.jpg"))
            }else if(randomSong.album =="RISSING SUN"){
                setAlbumCover(require("../assets/rissing.jpg"))
            }else if(randomSong.album =="MIROTIC"){
                setAlbumCover(require("../assets/MIROTIC.png"))
            }else if(randomSong.album =="TRI_-ANGLE"){
                setAlbumCover(require("../assets/triangle.webp"))
            }else if(randomSong.album =="SIDE-A"){
                setAlbumCover(require("../assets/SIDE-A.jpg"))
            }

            
        } catch (error) {}

    }, [songs])


    useEffect(() => {
        if(onPlaying !={}){
           playSound() 
        }
    }, [onPlaying])

    async function playSound() {
        clearTimeout(timer)

        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            onPlaying.uri
           ,
           {
            shouldPlay: true,
            volume: 1,
            isLooping: false
           }
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync();

        sound.getStatusAsync()
        .then(function(result) {
          console.log("DELAY START")
          
          setTimer(
            setTimeout(() => {
                setNext((prev)=>{return prev+1})
            }, result.durationMillis)        
          ) 

        })
        .catch(failureCallback);
    }
    
    useEffect(() => {
        
    return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

    //animation
    let spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.loop(
    Animated.timing(
        spinValue,
        {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
        }
    )
    ).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
    })



    return onPlaying.title== null? null:(
        <View style={styles.rightContainer}>
            <Text style={styles.title}> 
            { 
            onPlaying.title.length < 22?
            onPlaying.title
            :
            onPlaying.title.substring(0, 20)+'...'
            } 
            
            </Text>

            <View style={styles.upperLogos}>
                {/* <Text>{onPlaying.album}</Text> */}
                <Avatar
                size="medium"
                source={albumCover}
                />
                


                <View style={styles.btn}>
                    <Animated.View  style={{transform: [{rotate: spin}], zIndex: 5}}>
                        <TouchableOpacity
                        onPress={()=>{setNext((prev)=>{return prev+1})}}
                        style={styles.iconsContainer}
                        >
                            <Icon 
                            name="music"
                            type='font-awesome'
                            size={20}
                            color="red"
                            />                    
                        </TouchableOpacity>

                    </Animated.View> 

                    <Animatable.View 
                    animation="pulse" 
                    easing="ease-out" 
                    iterationCount="infinite" 
                    style={styles.beat}>
                        <View></View>
                    </Animatable.View>
                    
                    <Animatable.View 
                    animation="pulse" 
                    easing="ease-in" 
                    iterationCount="infinite" 
                    style={styles.beat2}>
                        <View></View>
                    </Animatable.View>
                </View>               
            </View>

  
        </View>

    )
}


const styles = StyleSheet.create({

    upperLogos:{
        flexDirection: 'row-reverse',
        width: 110,
        // backgroundColor: "blue",
        justifyContent: "space-between"
    },
    rightContainer:{
        // backgroundColor: "blue",
        marginRight: 20,
        maxWidth: 170,
        flexDirection: "column-reverse",
        alignItems: 'flex-end'
    },
    title: {
        color: "white",
        marginTop: 10
    },
    iconsContainer:{
        backgroundColor: "white",
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    btn:{
        padding: 5, 
        // backgroundColor: "blue", 
        // opacity: 0
    },
    beat:{
        position: "absolute",
        top: -7.5,
        left: -7.5,
        width: 65,
        height: 65,
        backgroundColor: "white",
        opacity: 0.1,
        borderRadius: 50
    },
    beat2:{
        position: "absolute",
        top: -0,
        left: 0,
        width: 50,
        height: 50,
        backgroundColor: "white",
        opacity: 0.1,
        borderRadius: 50
    }
})