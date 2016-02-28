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

  getInitialState() {
    return {
      redeemStatus: false
    };
  },

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
    var Btn = (programData.ProgramsFinished != 0 && this.state.redeemStatus=== false )? (
      <TouchableHighlight
        style={styles.button}
        onPress ={() => this._onPressRedeem()} >
        <Text style={styles.buttonText} >QPoints einlösen</Text>
      </TouchableHighlight>
      ) : (<Text/>);
    var collected = (programData.ProgramsFinished > 0) ? (
      <View style={styles.infoCircle}>
        <Text style={styles.infoText}>{programData.ProgramsFinished}</Text>
      </View>
      ) : (<View style={styles.subContentInfo}><Text style={styles.subContentHeader}>0</Text></View>);
    var startDate = programData.programStartDate.slice(8,10) + '.'
      + programData.programStartDate.slice(5,7) + '.'
      + programData.programStartDate.slice(0,4);
    var endDate = programData.programEndDate.slice(8,10) + '.'
      + programData.programEndDate.slice(5,7) + '.'
      + programData.programEndDate.slice(0,4);
    return (
      <View style={styles.container}>
        <View style={styles.itemHeader}>
          <View style={styles.headerFrame}>
            <Text style={styles.headerTitle}>{programData.programCompany}</Text>
            <Text style={styles.headerSubTitle}>{programData.programName}</Text>
          </View>
          <View style={styles.itemPoints}>
            <View style={styles.pointsCircle}>
              <Text style={styles.pointsText}>{programData.myCount}/{programData.programGoal}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.contentText}>{programData.address1}</Text>
          <Text style={styles.contentText}>{programData.address2}</Text>
          <Text style={styles.contentText}>{programData.zip} {programData.companyCity}</Text>
          <Text style={styles.contentText}>{programData.phone} </Text>
          <Text></Text>
          <Text style={styles.contentText}>Gültig: {startDate} bis {endDate}</Text>
        </View>
        <View style={styles.itemSubContent}>
          <View style={styles.subContentFrame}>
            <Text style={styles.subContentHeader}>Bereits zum Einlösen erreicht:  </Text>
          </View>
          <View style={styles.subContentInfo}>
            {collected}
          </View>
        </View>
        <View style={styles.itemFillIn}></View>
        <View style={styles.itemBtn}>
            {Btn}
          </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DC02E',
  },
  // HEADER 
  itemHeader:{
    flex: 3,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  headerFrame: {
    flex: 3,
    padding: 10
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerSubTitle: {
    color: 'white',
    fontSize: 18
  },
  // HEADER CIRCLE
  itemPoints:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsCircle:{
    justifyContent: 'center',
    backgroundColor: '#9BDA70',
    borderColor: 'white',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 40
  },
  pointsText:{
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 20,
    fontWeight: 'bold'
  },
  // Content
  itemContent: {
    flex: 3,
    alignSelf: 'stretch',
    flexDirection: 'column',
    padding: 10
  },
  contentText: {
    color: 'white',
    fontSize: 18
  },
  // SubContent
  itemSubContent: {
    flex: 2,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  subContentFrame: {
    padding: 10
  },
  subContentHeader: {
    color: 'white',
    fontSize: 18
  },
  // SubContentInfo
  subContentInfo:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 2
  },
  infoCircle:{
    justifyContent: 'center',
    backgroundColor: '#01577A',
    height: 30,
    width: 30,
    borderRadius: 15
  },
  infoText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  // Fill-In
  itemFillIn: {
    flex: 4,
    alignSelf: 'stretch',
    backgroundColor: '#01577A',
    
  },
  // BTN
  itemBtn: {
    flex: 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#01577A',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#FF2B4B',
    borderRadius: 8,
    margin: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Program;
