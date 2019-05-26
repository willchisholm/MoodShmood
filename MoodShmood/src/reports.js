/* eslint-disable react/destructuring-assignment */
// adapted from https://github.com/FaridSafi/react-native-gifted-chat

import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  View,
  Button,
  StyleSheet,
  Text,
} from 'react-native';

class ReportsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tone: true,
    };

    this.renderFeedback = this.renderFeedback.bind(this);
    this.toggleTone = this.toggleTone.bind(this);
  }

  componentWillMount() {

  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log(this.state.messages);
  }

  toggleTone() {
    this.setState(prevState => ({
      tone: !prevState.tone,
    }));
    console.log(this.state.tone);
  }

  renderFeedback() {
    if (this.state.tone) {
      return (
        <View style={styles.container}>
          <View style={styles.buttonBox}>
            <Button title="Back to Chat" onPress={() => this.props.navigation.navigate('Chat')} />
          </View>
          <View style={styles.buttonBox}>
            <Button title="Personality Insights" onPress={this.toggleTone} />
          </View>
          <Text>
            This is the tone feedback
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.buttonBox}>
            <Button title="Back to Chat" onPress={() => this.props.navigation.navigate('Chat')} />
          </View>
          <View style={styles.buttonBox}>
            <Button title="Tone Analyzer" onPress={this.toggleTone} />
          </View>
          <Text>
                This is the Personality Insights
          </Text>
        </View>
      );
    }
  }

  render() {
    return this.renderFeedback();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(153, 164, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBox: {
    marginTop: 20,
    backgroundColor: '#CD8BE8',
    color: 'black',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

});

export default ReportsTab;
