/* eslint-disable global-require */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
// adapted from https://github.com/tonydiaz/wa-react-native-minimal/

import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import base64 from 'react-native-base64';
// eslint-disable-next-line import/named
import { MessageRequest } from './Assistant';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      context: null,
      reports: false,
      sad: false,
    };
    this.renderChat = this.renderChat.bind(this);
    this.renderReports = this.renderReports.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  componentDidMount() {
    this.initalMessage();
  }

  initalMessage = async () => {
    const response = await MessageRequest('');
    // console.log(response);
    console.log(response._bodyInit.substring(35, 200));
    console.log(response._bodyInit);
    this.setState({
      context: response.context,
    });
    const message = {
      _id: Math.round(Math.random() * 1000000).toString(),
      text: response._bodyInit.substring(101, 165),
      createdAt: new Date(),
      user: {
        _id: '2',
        name: 'Kahoot',
      },
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  }

  getMessage = async (text) => {
    const response = await MessageRequest(text, this.state.context);
    this.setState({
      context: response.context,
    });
    console.log(response._bodyInit);
    const startMessage = response._bodyInit.indexOf('"text","text":') + 15;
    const message = {
      _id: Math.round(Math.random() * 1000000).toString(),
      text: response._bodyInit.substring(startMessage, startMessage + 71),
      createdAt: new Date(),
      user: {
        _id: '2',
        name: 'Kahoot',
      },
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }));
  }

  onSend = (message = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }), () => {
      this.getMessage(message[0].text.replace(/[\n\r]+/g, ' '));
    });
  }

  toggleReports() {
    this.setState({ reports: true });
    const arr = this.state.messages.filter((value) => {
      return value.user._id === '1';
    });
    const newMsgs = [];
    let i;
    for (i = 0; i < arr.length; i++) {
      const temparr = arr[i].text.split(' ');
      newMsgs[i] = temparr.join('%20');
    }
    const userMsgs = newMsgs.join('%20');

    console.log(userMsgs);
    const url = `https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2019-02-28&text=${userMsgs}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64.encode('apikey:q2xrM_3KSjXcW1inxs1Sxk56j6qxdQU-W68BB86xaLid')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        const sadness = data._bodyInit.includes('sad');
        if (sadness) {
          this.setState({
            sad: true,
          });
        }
      });

    // ToneAnalyzer.initialize('apikey', 'q2xrM_3KSjXcW1inxs1Sxk56j6qxdQU-W68BB86xaLid');

    // ToneAnalyzer.getTone(userMsgs)
    //   .then(toneAnalysis => console.log(JSON.stringify(toneAnalysis)));
  }

  renderChat() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonBox}>
          <Button title="Analysis" color="black" onPress={() => this.toggleReports()} />
        </View>
        <GiftedChat
          placeholder="Send your message to Watson..."
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          multiline={false}
          user={{
            _id: '1',
          }}
        />
      </View>
    );
  }

  renderReports() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonBox}>
          <Button title="Back to Chat" onPress={() => this.setState({ reports: false })} />
        </View>
        {this.renderImage()}
        <Image style={styles.graph} source={require('../assets/graph.png')} />
      </View>
    );
  }

  renderImage() {
    if (this.state.sad) {
      return (
        <View style={styles.container2}>
          <Image style={styles.emoji} source={require('../assets/sad.png')} />
          <Text style={styles.body}>
            You seem a bit down today. Make sure to go outside and take a break!
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container2}>
          <Image style={styles.emoji} source={require('../assets/happy.png')} />
          <Text style={styles.body}>
            You seem happy today! I am glad for you!
          </Text>
        </View>
      );
    }
  }

  render() {
    if (!this.state.reports) {
      return (this.renderChat());
    } else {
      return (this.renderReports());
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(153, 164, 255, 0.5)',
    justifyContent: 'space-around',
  },
  container2: {
    flex: 1,
    backgroundColor: 'rgba(153, 164, 255, 0.5)',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonBox: {
    marginTop: 50,
    backgroundColor: '#CD8BE8',
    color: 'black',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  body: {
    fontSize: 25,
    width: 300,
    textAlign: 'center',
  },
  emoji: {
    width: 200,
    height: 200,
  },
  graph: {
    width: 400,
    height: 300,
  },
});
