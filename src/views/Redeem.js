/* @flow */
'use strict';

import React from 'react-native';
import Storage from 'react-native-store';
import {redeemPoint} from '../components/ApiUtils';


var {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const DB = { 'user': Storage.model('user') };

var Redeem = React.createClass({
  
  getInitialState: function() {
    return {
      programKey: '',
      userPoints: ''
    };
  },

  componentWillMount() {
    DB.user.findById(1)
      .then((storedUserData) => {
        this.setState({
          userPoints: storedUserData.userPoints
        });
      });
  },

  _handleKeyInput(inputText){
    this.setState({
      programKey: inputText
    })
  },

  _onPressKeyVerification(){
    redeemPoint(this.props.userEmail, this.props.data.programNr, this.props.data.programGoal)
      .then((response) => {
        var programNr = this.props.data.programNr;
        if (response.success===true){
          this.props.data.ProgramsFinished -= 1;
          var userPoints = this.state.userPoints;
          var foundIndex = userPoints.findIndex(function(item) {
            return (item.programNr === programNr);
          });
          userPoints[foundIndex].ProgramsFinished -= 1;
          DB.user.updateById({
            userPoints: userPoints
          },1).then(() => {
            this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[1]);
          });
        } else {
          Alert.alert(
            'QPoint could not be redeemed',
            response.message,
            [
              {text: 'OK', onPress: () => {
                this.props.navigator.pop();
                console.log('Konnte leider nicht eingelöst werden');
              }},
            ]
          );
        }
      });
  },

  render: function() {
    console.log('jetzt auf Redeem View');
    return (
      <View style={styles.container}>
      	<Text>Bitten Sie den Ladeninhaber um den Einlöse-Schlüssel und geben Sie diesen hier ein</Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Einlöse-Schlüssel'
          onChangeText={(text) => this._handleKeyInput(text)} />
        <TouchableHighlight
          style={styles.button}
          onPress ={() => this._onPressKeyVerification()} >
          <Text style={styles.buttonText}>Verifizieren & Einlösen</Text>
        </TouchableHighlight>
      </View>
    );
  },

  updateUserData(codeProgramNr){
    var userPoints = this.state.userPoints;
    var foundIndex = userPoints.findIndex(function(item) {
      return (item.programNr === codeProgramNr);
    });
    userPoints[foundIndex].ProgramsFinished -= 1;
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 20,
    paddingLeft: 5
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Redeem;
