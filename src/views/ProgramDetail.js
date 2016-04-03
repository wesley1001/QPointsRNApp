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

const DB = { 'userData': Storage.model('userData') };

var Program = React.createClass({

  getInitialState() {
    return {
      programKey: '',
      redeemStatus: false,
      userPoints: ''
    };
  },

  componentWillMount() {
    DB.userData.findById(1)
      .then((storedUserData) => {
        console.log(storedUserData);
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
    redeemPoint( this.props.data.programNr, this.props.data.programGoal, this.props.userToken)
      .then((response) => {
        console.log(response);
        var programNr = this.props.data.programNr;
        if (response.success===true){
          this.props.data.programsFinished -= 1;
          var userPoints = this.state.userPoints;
          console.log('das sind die userPoints');
          console.log(userPoints);
          var foundIndex = userPoints.findIndex(function(item) {
            return (item.programNr === programNr);
          });
          userPoints[foundIndex].programsFinished -= 1;
          DB.userData.updateById({
            userPoints: userPoints
          },1).then(() => {
            this.setState({
              redeemStatus: false 
            });
          });
        } else {
          Alert.alert(
            'QPoint could not be redeemed',
            response.message,
            [
              {text: 'Warnung', onPress: () => {
                this.setState({
                  redeemStatus: false 
                });
                console.log('Konnte leider nicht eingelöst werden');
              }},
            ]
          );
        }
      });
  },

  _onPressRedeem(){
    this.setState({
      redeemStatus: true
    });
  },

  render: function() {
    var programData = this.props.data;
    console.log('I am in ProgramDetail');
    console.log(programData);
    var Btn = (programData.programsFinished != 0 && this.state.redeemStatus=== false )? (
      <TouchableHighlight
        style={styles.button}
        onPress ={() => this._onPressRedeem()} >
        <Text style={styles.buttonText} >QPoints einlösen</Text>
      </TouchableHighlight>
      ) : (this.state.redeemStatus===true) ? (
      <TouchableHighlight
        style={styles.button}
        onPress ={() => this._onPressKeyVerification()} >
        <Text style={styles.buttonText} >Verifizieren & Einlösen</Text>
      </TouchableHighlight>
      ) : (<Text/>);
    var collected = (programData.programsFinished > 0) ? (
      <View style={styles.infoCircle}>
        <Text style={styles.infoText}>{programData.programsFinished}</Text>
      </View>
      ) : (<View style={styles.subContentFrame}><Text style={styles.contentText}>0</Text></View>);
    var keyInput = (this.state.redeemStatus===true) ? (
      <View style={styles.inputFrame}>
        <Text style={styles.inputText}>Bitten Sie den Ladeninhaber um den Einlöse-Schlüssel und geben Sie diesen hier ein</Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Einlöse-Schlüssel'
          onChangeText={(text) => this._handleKeyInput(text)} />
      </View>
      ) : (<Text></Text>);
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
            <Text style={styles.headerText}>Gültig: {startDate} bis {endDate}</Text>
          </View>
          <View style={styles.itemPoints}>
            <View style={styles.pointsCircle}>
              <Text style={styles.pointsText}>{programData.myCount}/{programData.programGoal}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.contentText}>{programData.address1} {programData.address2}</Text>
          <Text style={styles.contentText}>{programData.zip} {programData.companyCity}</Text>
          <Text style={styles.contentText}>{programData.phone} </Text>
          <View style={styles.itemSubContent}>
          <View style={styles.subContentFrame}>
            <Text style={styles.contentText}>Bereits zum Einlösen erreicht: </Text>
          </View>
          <View style={styles.subContentInfo}>
            {collected}
          </View>
        </View>
        </View>
        <View style={styles.itemVerification}>
          {keyInput}
        </View>
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
  // HEADER ===========================
  itemHeader:{
    flex: 2.5,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  headerFrame: {
    flex: 3,
    padding: 10,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerSubTitle: {
    color: 'white',
    fontSize: 20
  },
  headerText: {
    color: 'white',
    fontSize: 16
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
  // CONTENT ===========================
  itemContent: {
    flex: 2,
    alignSelf: 'stretch',
    flexDirection: 'column',
    padding: 10
  },
  contentText: {
    color: 'white',
    fontSize: 16
  },
  // SUBCONTENT ===========================
  itemSubContent: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  subContentFrame: {
    alignSelf: 'center',
  },
  // SubContentInfo
  subContentInfo:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  // VERIFICATION ===========================
  itemVerification: {
    flex: 5,
    alignSelf: 'stretch',
    backgroundColor: '#01577A',
  },
  inputFrame: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputText: {
    padding: 10,
    fontSize: 16,
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    margin: 25,
    paddingLeft: 5
  },
  // BTN ===========================
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
