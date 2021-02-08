import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button, Text, ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Stack = createStackNavigator();

export default function AboutTvxq({ navigation }) {
    return (
        <Stack.Navigator>
          <Stack.Screen 
          name="About App" 
          component={AboutStack} 
          options={{ 
              title: 'About Tvxq & Fans',
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

function AboutStack({navigation}){
    return(
        <ScrollView>
            <View style={styles.container}>
                <Image
                style={styles.image}
                source={{uri: "https://images-na.ssl-images-amazon.com/images/I/41Yy52TSN8L.jpg"}}
                />
                <Animatable.View 
                    animation="pulse" 
                    easing="ease-out" 
                    iterationCount="infinite" 
                    style={styles.beat}>
                    <Text h3 style={styles.h1}>TVXQ (東方神起)</Text>
                </Animatable.View>
                <Text style={styles.text} > 
                Whether they’re known to you by the moniker TVXQ or DBSK, there’s no question that as a K-Pop fan, you’re at least familiar with the impact this group has left on K-Pop as a whole. Whether it be early domination of the industry or the first major reported company dispute and resulting split, you’ve certainly heard tales of the group. This month we’ll be taking a deep dive into TVXQ’s formation, dispute, and current whereabouts.
                </Text>
                <Text style={{...styles.text, marginTop: 15}} >
                    TVXQ came to fruition under SM Entertainment in 2003 with five members, Yunho, Changmin, Jaejoong, Junsu and Yoochun. The group was originally meant to fill a boy group hole that had opened up with the disbandment of H.O.T. in 2001 and Shinhwa’s departure from SM in 2003. Before the official debut of TVXQ, the members participated in a number of project groups with other trainees who would later come together to form Super Junior. Their debut single “Hug” initially didn’t gain much traction, but upon increased TV appearances, more recognition came to the group and they achieved their first music show win with “Hug” on Inkigayo. 2004 saw their first debut at No.1 with album Tri-Angle, which became one of the best selling albums of the year. That year also marked the group’s Japanese debut, but it was not as successful as the label had anticipated and in 2005, they returned their focus on Korea. 
                </Text>
            </View>

            <Image 
            source={require("../assets/separator.png")} 
            />
            <View style={styles.container2}>
                <Image
                style={styles.image2}
                source={{uri: "http://student-weekly.com/290615/PiX/TVXQ-3.jpg"}}
                />
                <Animatable.View 
                animation="pulse" 
                easing="ease-out" 
                iterationCount="infinite" 
                style={styles.beat}>
                    <Text h3 style={{...styles.h1, marginTop: 10}}>Cassiopeia</Text>
                </Animatable.View>
                <Text style={styles.text} > 
                Cassiopeia is the official fan club of South Korean band, TVXQ. It was named after the 5-starred constellation, Cassiopeia. Its counterpart in Japan is called BigEast. The fan club was formed on April 23  2006, a few years after the group’s debut. The official fanclub color is pearl red, signifying passion. April 23 is celebrated by fans as Cassiopeia Day as this is the day when the fanclub member registration initiated.
                </Text>
                <Text style={{...styles.text, marginTop: 15}} >
                Cassiopeia is the largest fan club in South Korea, with over 800,000 members registered on their Daum fancafe, Yuaerubi. Its membership totalled to over 920,000 members internationally in 2009.In 2008, Cassiopeia was listed in ‘Guinness Book of Records’ for “World’s Largest Fanclub“. Cassiopeia was again listed as the “World’s Largest Fanclub” in 2011.International fans of TVXQ who do not belong to the official Daum fancafe or have SMTown membership also call themselves Cassiopeia.
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container2: {
        flex: 1,
        backgroundColor: '#e13f3c',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image2: {
        width: 290,
        height: 240
    },

    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1:{
        color: "white",
        marginBottom: 20
    },
    text: {
        color: "white",
        //   textAlign: "center",
        fontSize: 16
    },
    image: {
        width: 260,
        height: 260
    }
})