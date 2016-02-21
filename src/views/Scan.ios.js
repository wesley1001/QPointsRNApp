/* @flow */
'use strict';

import React from 'react-native';
import Camera  from 'react-native-camera';

var {
  AlertIOS,
  StyleSheet,
  Text,
  View
} = React;

var Scan = React.createClass({

  getInitialState: function() {
    return {
      showCamera: true,
      cameraType: Camera.constants.Type.back
    }
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
    AlertIOS.alert(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
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
