import React from 'react';
import {
  StyleSheet, View, Button, Text,
} from 'react-native';
import {
  // createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { MainTabBar } from './navigation/main_tab_bar';

// import Ionicons from 'react-native-vector-icons/FontAwesome';
// import { Button } from 'react-native';

const Welcome = props => (
  <View style={styles.container}>
    <Text style={styles.title}>MoodShmood</Text>
    <Text style={styles.body}>We can help you track your mood over time and offer insights into your personality. Simply enter journal entries to our chat bot daily!</Text>
    <View style={styles.buttonBox}>
      <Button style={styles.button} color="black" onPress={() => { props.navigation.navigate('Main'); }} title="Start Messaging" />
    </View>
  </View>
);

// nest stack navigator to handle two internal views
const TopNavigation = createSwitchNavigator({
  // keys are the names of the "routes"
  WelcomeScreen: Welcome,
  Main: MainTabBar,
},
{
  initialRouteName: 'WelcomeScreen',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(204, 166, 255, 0.7)',
  },
  title: {
    fontSize: 50,
    color: 'black',
  },
  button: {
    fontSize: 50,
    color: 'black',
  },
  body: {
    fontSize: 25,
    width: 300,
    textAlign: 'center',
  },
  buttonBox: {
    backgroundColor: '#CD8BE8',
    color: 'black',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default createAppContainer(TopNavigation);
