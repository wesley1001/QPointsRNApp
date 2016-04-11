/* @flow */
'use strict';

import React from 'react-native';
import Camera  from 'react-native-camera';
import {CheckCode} from '../components/ApiUtils';
import Storage from 'react-native-store';
import {isOk} from '../components/IsConnected';

var {
  Alert,
  AlertIOS,
  StyleSheet,
  Text,
  View
} = React;

const DB = {
  'user': Storage.model('user'),
  'userData': Storage.model('userData')
};

var Scan = React.createClass({

  getInitialState: function() {
    return {
      showCamera: true,
      cameraType: Camera.constants.Type.back,
      userToken: '',
      userPoints: ''
    }
  },

  componentWillMount() {
    DB.user.findById(1).then((resp) => {
      this.setState({ userToken: resp.userToken });
    });
    DB.userData.findById(1)
      .then((storedUserData) => {
        this.setState({
          userPoints: storedUserData.userPoints
        });
      });
  },

  renderCamera: function() {
   if(this.state.showCamera) {
    return (
      <Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this._onBarCodeRead}
        type={this.state.cameraType} >
      </Camera>
      );
    } else {  
      return (
        <View></View>
      );
    }  
  },

  render: function() {
    return (
      	this.renderCamera()
    );
  },

  _onBarCodeRead: function(e) {
    if (isOk()) {
      this.setState({showCamera: false});
      CheckCode(e.data, this.state.userToken)
        .then((response) => {
          var alertTitle;
          if (response.success === false) {
            alertTitle = 'Leider ist der QR-Code nicht gültig';
          } else {
            alertTitle = 'Herzliche Glückwünsche';
            this.updateUserData(response.nr);
          }
          AlertIOS.alert(
              alertTitle,
              response.message
          );
          this.setState({showCamera: true});  
        });
    } else {
      this.setState({showCamera: false});
      console.log('no Internet connection');
      Alert.alert(
        'Sie haben keine Internet Verbindung','Bitte versuchen Sie es später erneut',
        [{text: 'Ok', onPress: () => {}},]
      );
      this.setState({showCamera: true});
    }
  },

  updateUserData(codeProgramNr){
    var userPoints = this.state.userPoints;
    var foundIndex = userPoints.findIndex(function(item) {
      return (item.programNr === codeProgramNr);
    });
    userPoints[foundIndex].myCount += 1;
    if (userPoints[foundIndex].myCount == userPoints[foundIndex].programGoal){
      userPoints[foundIndex].myCount = 0;
      userPoints[foundIndex].ProgramsFinished += 1;
    }
    DB.user.updateById({
      userPoints: userPoints
    },1)
  }
  
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DC02E',
  }
});

module.exports = Scan;
