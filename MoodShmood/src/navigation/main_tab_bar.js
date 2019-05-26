/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  createAppContainer,
  // createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { View, Text, Button } from 'react-native';

const ChatTab = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Chat</Text>
      <Button onPress={this.props.navigation.navigate('Reports')} title="Analysis" />
    </View>
  );
};

const ReportsTab = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Reports</Text>
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


export default createAppContainer(MainTabBar);
