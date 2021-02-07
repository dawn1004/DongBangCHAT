import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button, Text, ListItem, Avatar } from 'react-native-elements';

const Stack = createStackNavigator();

export default function AboutScreen({ navigation }) {
    return (
        <Stack.Navigator>
          <Stack.Screen 
          name="About App" 
          component={AboutStack} 
          options={{ 
              title: 'About App',
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

const list = [
  {
    name: 'Dawn Lemuel Bugay',
    avatar_url: 'https://scontent.fmnl25-1.fna.fbcdn.net/v/t1.0-9/105009081_2836110856616508_807291393452165952_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFTNa0V2HYCa-2gp2NAIMAiGnURKZ8Sb84adREpnxJvzswqa-SH1rO-THjMVBiNNlaysEVcr1j2P3t68cQ8K0HN&_nc_ohc=virQwGVHlcMAX93aqwc&_nc_ht=scontent.fmnl25-1.fna&oh=7df918c4c12cda14e68022ed5f7f7f2d&oe=6044F06F',
    subtitle: 'Developer and UI/UX'
  },
  {
    name: 'James Paul Nuque',
    avatar_url: 'https://scontent.fmnl25-1.fna.fbcdn.net/v/t1.0-9/62177184_1322568027911873_4815460127605784576_o.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFOVGEUwW-JGKcbs-JIfuKubZ1jDuIwAVdtnWMO4jABVx0zrvn2JYsqOoMAEhPZoMWZJFVaPbcRySdpT3hGDVw0&_nc_ohc=ZLRmXi3Em0cAX8_qqcK&_nc_ht=scontent.fmnl25-1.fna&oh=5b41fa83ee7ed8c961679021269bef44&oe=6044B5C4',
    subtitle: 'Leader and Brochure'
  },
  {
    name: 'Neil Adrian Torres',
    avatar_url: 'https://scontent.fmnl25-2.fna.fbcdn.net/v/t1.0-9/34586097_1915706181794809_6906370285994246144_o.jpg?_nc_cat=101&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeFF1Y66W_XSLD1zwcvTuWGBO-lCNCA2jMo76UI0IDaMyhuaeCYyIH7wwYC_M-7LfnjlRxzIry3Qb79i0OTYqLah&_nc_ohc=Shwph4baC5YAX8GkOM_&_nc_ht=scontent.fmnl25-2.fna&oh=baabb7271bd621474c1051e142de9bb8&oe=6042B3A2',
    subtitle: 'Images Editor'
  },
  {
    name: 'Jovito Tiglao',
    avatar_url: 'https://scontent.fmnl25-2.fna.fbcdn.net/v/t1.0-9/141562604_487499215986080_7854562866437324470_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEAHoF6JJCUAXu4QUkbCxd8wZpOk505xtXBmk6TnTnG1RAw4GwkvqtBTek-hrxJoBd7qhoZu-AQUs46xKNT92r8&_nc_ohc=dYzx0no6bSkAX8bfhqX&_nc_ht=scontent.fmnl25-2.fna&oh=bb3721f7052fb13dd6c04b216158e47c&oe=604539A3',
    subtitle: 'Idea and testing'
  },
  {
    name: 'Jhon Randle DeLeon',
    avatar_url: 'https://scontent.fmnl25-2.fna.fbcdn.net/v/t1.0-9/93219346_554782078503612_7182958040893620224_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeH0EFGTTIec9e_DtynX2hR4jSW7Tqiel8GNJbtOqJ6XwYNtegWlHzpu09qbRj2jfe6emL09L8ZFVfUtG08wxGqf&_nc_ohc=3yXMSr-BgwEAX9DVgwX&_nc_ht=scontent.fmnl25-2.fna&oh=bf3a9c4edb8d391962044d9fa3ba43fe&oe=604380E0',
    subtitle: 'Idea and testing'
  }
]

function AboutStack({navigation}){
    return(
        <View style={styles.container}>
            <Text h3 style={{marginBottom: 6}}>About the app</Text>
            <Text style={{marginBottom: 10}}>This app is our project in subject 
              <Text style={{fontWeight: "bold"}}> FREL IV (Android Development) </Text>
              under sir <Text style={{fontWeight: "bold"}}>Jayson Batoon. </Text>
              This app is made with 🖤 by the following student:
            </Text>


            {
              list.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <Avatar source={{uri: l.avatar_url}} />
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20 
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})