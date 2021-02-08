import React, {useContext, useEffect, useState} from 'react'
import { Image, Text, View, StyleSheet, ProgressBarAndroid } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button, Card, Avatar, Input } from 'react-native-elements';
import { UserContext } from "../store/UserContext"
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function SettingScreen({ navigation }) {
  const [authUser, setAuthUser] = useContext(UserContext)

  return (
      <Stack.Navigator>
        <Stack.Screen 
        name="DongBangChat" 
        component={SettingStack} 
        options={{ 
            title: 'Account Setting',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Button
              onPress={() => {navigation.openDrawer()}}
              color="#fff"
              buttonStyle={{backgroundColor: "transparent"}}
              icon={{
                name: "menu",
                size: 30,
                color: "#fff"
              }}
            />
            ),
            headerStyle: {
              backgroundColor: '#e13f3c',
              elevation: 0,
          },
          headerTintColor: '#fff'
        }}
        />
      </Stack.Navigator>
    );
}


function SettingStack({navigation}){
    const [authUser, setAuthUser] = useContext(UserContext)
    const [ImagePick, setImagePick] = useState(null)
    const [progress, setProgress] =useState(false)
    const [newPassword, setNewPassowrd] = useState("")
    const [oldPassowrd, setOldPassowrd] = useState("")
    const [confirmPassword, setConfirmPassowrd] = useState("")
    const [error1, setError1] = useState("")
    const [error2, setError2] = useState("")
    const [error3, setError3] = useState("")

    const [showEye1, setShowEye1] = useState(false)
    const [showEye2, setShowEye2] = useState(false)
    const [showEye3, setShowEye3] = useState(false)

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImagePick(result.uri);
        // handleUpload(result.uri)
      }
    };

    // const changeUsernameAndPassowd = ()=>{
    //   // userNameInput
    //   var usersRefs = firebase.database().ref("/users");

    //   usersRefs.child(authUser.id)
    //   .update({
    //     imgURI: authUser.imgURI,
    //     password: authUser.password,
    //     userName: userNameInput
    //   }) 

    // }

    const uploadHandler = async()=>{
      
      if(ImagePick==null){
        alert('Please select image')
        return
      }


      setProgress(true)
      console.log("uploadAsFile", ImagePick)
      const response = await fetch(ImagePick);
      const blob = await response.blob();

      var metadata = {
        contentType: 'image/jpeg',
      };

      let name = "Imahemoooboi"+Date.now()
      const ref = firebase
        .storage()
        .ref()
        .child('images/' + name)
    
      const task = ref.put(blob, metadata);

      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // setUploadingValue(progress)
          },
          (error) => reject(error), /* this is where you would put an error callback! */
          () => {
            firebase.storage()
            .ref("images")
            .child(name)
            .getDownloadURL()
            .then(url=>{
                var usersRefs = firebase.database().ref("/users");


                usersRefs.child(authUser.id)
                .update({
                  imgURI: url,
                  password: authUser.password,
                  userName: authUser.userName
                }, ()=>{
                  let temp = authUser;
                  temp.imgURI = url
                  setAuthUser(temp)
                  setProgress(false)
                  alert("DP Successfully Updated")
                  setImagePick(null)
                }) 
                console.log(url)
              })
          }
        );
      });

    }

    const changePassword = ()=>{
      var usersRefs = firebase.database().ref("/users");
      setProgress(true)
      let err = false
      setError1("")
      setError2("")
      setError3("")

      if(oldPassowrd != authUser.password){
        setError1("Incorrect old password")
        err = true
      }
      if(newPassword.length <=0){
        setError2("Required")
        err = true
      }
      if(newPassword != confirmPassword){
        setError3("Password not matched")
        err = true
      }

      if(err){setProgress(false); return}


      usersRefs.child(authUser.id)
      .update({
        imgURI: authUser.imgURI? authUser.imgURI: "",
        password: newPassword,
        userName: authUser.userName
      }, ()=>{
        let temp = authUser;
        temp.password = newPassword
        setAuthUser(temp)
        setProgress(false)
        alert("Password Successfully Updated")
        setOldPassowrd("")
        setNewPassowrd("")
        setConfirmPassowrd("")
      }) 
    }
  
    const eyeHandler1 = (target)=>{
      if(target==1){
        setShowEye1(!showEye1)
      }else if(target == 2){
        setShowEye2(!showEye2)
      }else if(target == 3){
        setShowEye3(!showEye3)
      }
    }

    return(
        <View style={styles.container}>


          <Card containerStyle={styles.card}>
            <ProgressBarAndroid 
            styleAttr="Horizontal" 
            animating={progress}
            color="red"
            style={{position: "absolute", top: -22, width: 270}}
            />

            <View style={styles.upper}>
              {
                authUser.imgURI?
                (
                  <TouchableOpacity 
                  onPress={pickImage} 
                  style={styles.imageBG}> 
                    <Icon
                    containerStyle={styles.changeDp}
                    type= 'font-awesome'
                    name='pencil'
                    size={40}
                    color={ImagePick?'transparent':'white'}
                    />  
                    <Avatar
                    rounded
                    title="MD"
                    size="large"
                    containerStyle={{backgroundColor: "grey"}}
                    source={ImagePick?
                      {uri: ImagePick}:
                      {uri: authUser.imgURI}
                    }
                    />                    
                  </TouchableOpacity>

                ):
                (
                  <TouchableOpacity 
                  onPress={pickImage} 
                  style={styles.imageBG}> 
                    <Icon
                    containerStyle={styles.changeDp}
                    type= 'font-awesome'
                    name='pencil'
                    size={40}
                    color={ImagePick?'transparent':'black'}
                    />  
                    <Avatar
                    onPress={pickImage} 
                    rounded
                    title={(authUser.userName.split("")[0] +authUser.userName.split("")[1]).toUpperCase()}
                    size="large"
                    containerStyle={{backgroundColor: "grey"}}
                    titleStyle={{color:"white"}}
                    source={ImagePick?
                      {uri: ImagePick}:
                      null
                    }
                    />
                  </TouchableOpacity>            
                )
              }

              
              <Input 
              placeholder="asdasd"
              containerStyle={styles.username}
              defaultValue={authUser.userName}
              disabled
              leftIcon={
                <Icon
                type= 'font-awesome'
                name='pencil'
                size={24}
                color='black'
                />                
              }
              />
            </View>
            <Button 
            title="Save DP"  
            style={{marginBottom: 10}}
            buttonStyle={{backgroundColor: "#e13f3c"}} 
            onPress={uploadHandler}
            />
            <Card.Divider/>
            
            <View>
              <Card.Title>
                Change Password
              </Card.Title>


              <Input 
              secureTextEntry={!showEye1}
              rightIcon={{ 
                type: 'font-awesome', name: showEye1?'eye':'eye-slash', color: "grey", style: { marginRight: 10}, 
                onPress: ()=>{eyeHandler1(1)}
              }}
              defaultValue={oldPassowrd}
              errorMessage={error1}
              placeholder="Old password"
              onChangeText={(text)=>{setOldPassowrd(text)}}
              leftIcon={
                <Icon type= 'font-awesome' name='key' size={24} color='black'/>                
              }
              />
              <Input
              secureTextEntry={!showEye2}
              rightIcon={{ 
                type: 'font-awesome', name: showEye2?'eye':'eye-slash', color: "grey", style: { marginRight: 10}, 
                onPress: ()=>{eyeHandler1(2)}
              }}
              defaultValue={newPassword}
              errorMessage={error2} 
              placeholder="New password"
              onChangeText={(text)=>{setNewPassowrd(text)}}
              leftIcon={
                <Icon type= 'font-awesome' name='key' size={24} color='black'/>                
              }
              />
              <Input 
              secureTextEntry={!showEye3}
              rightIcon={{ 
                type: 'font-awesome', name: showEye3?'eye':'eye-slash', color: "grey", style: { marginRight: 10}, 
                onPress: ()=>{eyeHandler1(3)}
              }}
              defaultValue={confirmPassword}
              errorMessage={error3}
              placeholder="Confirm password"
              onChangeText={(text)=>{setConfirmPassowrd(text)}}
              leftIcon={
                <Icon type= 'font-awesome' name='key' size={24} color='black'/>                
              }
              />
              <Button 
              onPress={changePassword}
              buttonStyle={{backgroundColor: "#e13f3c"}} 
              title="Save Password"  style={{marginBottom: 10}} />
            </View>
          </Card>

            {/* <Button 
            onPress={pickImage}
            title="Image" />
             */}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 300,
    height: 200,
  },
  card:{
    // height: 500,
    width: 310,
    borderRadius: 20
  },
  upper: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10
  },
  username:{
    width: 200,
  },
  imageBG:{
    alignItems: "center",
    justifyContent: 'center'
  },
  changeDp:{
    position: "absolute",
    zIndex: 3,
    opacity: 0.7
  }
});
