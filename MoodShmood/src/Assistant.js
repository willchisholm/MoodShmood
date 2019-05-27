/* eslint-disable no-undef */
import base64 from 'react-native-base64';

// Watson Assistant API documentation:
// https://console.bluemix.net/apidocs/assistant
MessageRequest = (input, context = {}) => {
  const body = {
    alternate_intents: true,
    input: {
      text: input,
    },
  };
  if (context) {
    body.context = context;
  }
  return fetch('https://gateway.watsonplatform.net/assistant/api/v1/workspaces/e3d15e39-9c55-4ec9-9c6b-72726b9ec7d1/message?version=2018-09-20', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64.encode('apikey:B65cRu3Vi-J4qbhdC0KB_QfXJQ7eIxVt1Cs_xlEyr9jE')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  // .then((response) => { response.json(); });
  // .then((responseJson) => {

  //   console.log(responseJson);
  //   return responseJson;
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
};

module.exports = {
  MessageRequest,
};
