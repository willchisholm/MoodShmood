import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { View, Text } from 'react-native';

const ChatTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Chat</Text></View>;
};

const ReportsTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Reports</Text></View>;
};

const FeedbackTab = (props) => {
  return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Feedback</Text></View>;
};

export const MainTabBar = createBottomTabNavigator({
  Chat: ChatTab,
  Reports: ReportsTab,
  Feedback: FeedbackTab,

}, {
  initialRouteName: 'Chat',
});


export default createAppContainer(MainTabBar);
