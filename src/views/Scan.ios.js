/* @flow */
'use strict';

import React from 'react-native';
import Camera  from 'react-native-camera';
import CheckCode from '../components/ApiCheckCode';
import Storage from 'react-native-store';

var {
  AlertIOS,
  StyleSheet,
  Text,
  View
} = React;

const DB = { 'user': Storage.model('user') };

var Scan = React.createClass({

  getInitialState: function() {
    return {
      showCamera: true,
      cameraType: Camera.constants.Type.back,
      userEmail: '',
      userPoints: ''
    }
  },

  componentWillMount() {
    DB.user.findById(1)
      .then((storedUserData) => {
        this.setState({
          userEmail: storedUserData.userEmail,
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
    this.setState({showCamera: false});
    CheckCode(this.state.userEmail, e.data).then((response) => {
      AlertIOS.alert(
          "Barcode Found",
          response.message
      );

      var userPoints = this.state.userPoints;
      var foundIndex = userPoints.findIndex(function(item) {
        return (item.programNr === response.nr);
      });
      userPoints[foundIndex].myCount += 1;
      if (userPoints[foundIndex].myCount == userPoints[foundIndex].programGoal){
        userPoints[foundIndex].myCount = 0;
        userPoints[foundIndex].ProgramsFinished += 1;
      }
      DB.user.updateById({
        userPoints: userPoints
      },1)

      this.setState({showCamera: true});  
    });
    
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DC02E',
  },
});

module.exports = Scan;
