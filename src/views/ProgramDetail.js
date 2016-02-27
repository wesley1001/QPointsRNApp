/* @flow */
'use strict';

import React from 'react-native';

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var Program = React.createClass({

  _onPressRedeem(){
    this.props.navigator.push({
      id: 'Redeem',
      data: this.props.data,
      userEmail: this.props.userEmail
    })
  },

  render: function() {
    var programData = this.props.data;
    console.log('I am in ProgramDetail');
    console.log(programData);

    var redeemBtn = (programData.ProgramsFinished != 0)? (
      <TouchableHighlight
        style={styles.button}
        onPress ={() => this._onPressRedeem()} >
        <Text style={styles.buttonText} >QPoints einlösen</Text>
      </TouchableHighlight>
      ) : (<Text/>);
    return (
      <View style={styles.container}>
        <View style={styles.titel}>
          <Text>{programData.programName}</Text>
        </View>
        <View style={styles.header}>
          <Text>{programData.myCount} von {programData.programGoal} QPoints</Text>
          <Text>Bereits einlösbare Treffer {programData.ProgramsFinished}</Text>
        </View>
        <View style={styles.content}>
          <Text>{programData.programCompany}</Text>
          <Text>{programData.address1}</Text>
          <Text>{programData.address2}</Text>
          <Text>{programData.zip} {programData.companyCity}</Text>
          <Text>{programData.phone} </Text>
        </View>
        {redeemBtn}
      </View>
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
  titel: {
    flex: 1,
    justifyContent: 'center',
    // borderColor: 'white',
    // borderWidth: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    // borderColor: 'white',
    // borderWidth: 1
  },
  content: {
    flex: 3,
    padding: 10,
    // borderColor: 'white',
    // borderWidth: 1
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

module.exports = Program;
