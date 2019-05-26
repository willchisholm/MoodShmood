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
    <Text>We can help you track your mood over time and offer insights into your personality. Simply enter journal entries to our chat bot daily!</Text>
    <Button onPress={() => { props.navigation.navigate('Main'); }} title="Start Messaging" />
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
  },
  title: {
    fontSize: 40,
    color: 'black',
  },
});

export default createAppContainer(TopNavigation);
