/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  createAppContainer,
  // createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';

const ChatTab = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Chat</Text>
      <Button onPress={() => props.navigation.navigate('Reports')} title="Analysis" />
    </View>
  );
};

const ReportsTab = (props) => {
  return (
    <View style={styles.reportsContainer}>
      <Text>Reports</Text>
      <Button onPress={() => props.navigation.navigate('Chat')} title="Back to Chat" />

    </View>
  );
};

// const FeedbackTab = (props) => {
//   return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Feedback</Text></View>;
// };

// export const MainTabBar = createBottomTabNavigator({
//   Chat: ChatTab,
//   Reports: ReportsTab,
//   // Feedback: FeedbackTab,

// }, {
//   initialRouteName: 'Chat',
// });

export const MainTabBar = createSwitchNavigator({
  Chat: ChatTab,
  Reports: ReportsTab,
  // Feedback: FeedbackTab,

}, {
  initialRouteName: 'Chat',
});

const styles = StyleSheet.create({
  reportsContainer: {
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


export default createAppContainer(MainTabBar);
