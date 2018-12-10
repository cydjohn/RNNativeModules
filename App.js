/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';



const { MessageBridge } = NativeModules;
const messageBridgeEmitter = new NativeEventEmitter(MessageBridge);

type Props = {};
export default class App extends Component<Props> {
  state = {
    getMessage: "",
    pushMessage: ""
  }


  componentDidMount() {
    // DeviceEventEmitter.addListener('PushMessage', (data) => {
    //   this.setState({ "pushMessage": data.message });
    //   console.log(data);
    // });

    messageBridgeEmitter.addListener(
      'PushMessage',
      (data) => {
        console.log(data);
        this.setState({ "pushMessage": data.message });
      });
  }

  async measureLayout() {
    try {
      var data = await MessageBridge.getMessage('Get Message');
      this.setState({ "getMessage": data.message });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  getMessage() {
    this.measureLayout();
  }

  showMessage() {
    MessageBridge.show('Show Message');
  }

  getPushMessage() {
    MessageBridge.pushMessage('Push Message');
  }




  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.button} title='Push Message' onPress={() => this.getPushMessage()} />
        <Text style={styles.message}>{this.state.pushMessage}</Text>
        <Button style={styles.button} title='Get Message' onPress={() => this.getMessage()} />
        <Text style={styles.message}>{this.state.getMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 300,
  },
  message: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    margin: 30,
  }
});
