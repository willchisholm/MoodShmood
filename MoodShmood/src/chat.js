/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
// /* eslint-disable camelcase */
// /* eslint-disable react/destructuring-assignment */
// // adapted from https://github.com/FaridSafi/react-native-gifted-chat

// import React from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import {
//   View,
//   Button,
//   StyleSheet,
// } from 'react-native';

// // import {
// //   version, url, iam_apikey,
// // } from 'react-native-dotenv';

// // const AssistantV1 = require('ibm-watson/assistant/v1');

// // const assistant = new AssistantV1({
// //   version,
// //   iam_apikey,
// //   url,
// // });

// class ChatTab extends React.Component {
//   state = {
//     messages: [],
//   }

//   componentWillMount() {
//     // console.log(assistant);
//     this.setState({
//       messages: [
//         {
//           _id: 0,
//           text: 'Hi, I\'m Kahoot! Thanks for checking in today - what\'s your name?',
//           createdAt: new Date(),

//           user: {
//             _id: 2,
//             name: 'Kristie Chow',
//           },
//         },
//         {
//           _id: 2,
//           text: 'Nice to meet you! How are you doing today?',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//           },
//         },
//         {
//           _id: 4,
//           text: 'I’m sorry to hear that, what’s wrong?',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//           },
//         },
//         {
//           _id: 6,
//           text: 'That’s tough. If you want to, you can tell me more about that, or we can talk about something else.',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//           },
//         },
//         {
//           _id: 8,
//           text: 'I can definitely understand why that is overwhelming for you. Is there anything else you want to share with me today?',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//           },
//         },
//         {
//           _id: 10,
//           text: 'Thanks for talking to me today. I hope you feel better soon and continue to come back to chat. In the meantime, you can always check on the history of your mood with me!',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//           },
//         },
//       ],
//     });
//   }

//   onSend(messages = []) {
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }));
//     console.log(this.state.messages);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.buttonBox}>
//           <Button title="Analysis" color="black" onPress={() => this.props.navigation.navigate('Reports')} />
//         </View>
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={messages => this.onSend(messages)}
//           user={{
//             _id: 1,
//           }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(153, 164, 255, 0.5)',
//     justifyContent: 'space-around',
//   },
//   buttonBox: {
//     marginTop: 50,
//     backgroundColor: '#CD8BE8',
//     color: 'black',
//     width: 200,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },

// });

// export default ChatTab;

// adapted from https://github.com/tonydiaz/wa-react-native-minimal/

import React from 'react';
import {
  View,
  Button,
  StyleSheet,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
// eslint-disable-next-line import/named
import { MessageRequest } from './Assistant';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      context: null,
    };
  }

  componentDidMount() {
    this.initalMessage();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonBox}>
          <Button title="Analysis" color="black" onPress={() => this.props.navigation.navigate('Reports')} />
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

  onSend = (message = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }), () => {
      this.getMessage(message[0].text.replace(/[\n\r]+/g, ' '));
    });
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(153, 164, 255, 0.5)',
    justifyContent: 'space-around',
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
});
