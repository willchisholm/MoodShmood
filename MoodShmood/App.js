import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import {
//   createAppContainer,
//   createSwitchNavigator,
// } from 'react-navigation';
// import createRootNavigator from './src/router';
import TopNavigation from './src/welcome';

export default class App extends Component {
  render() {
    return (
      <TopNavigation />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
