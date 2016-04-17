/* @flow */
'use strict';

import React from 'react-native';
import Storage from 'react-native-store';
import {redeemPoint} from '../components/ApiUtils';
import {isOk} from '../components/IsConnected';

var {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const DB = { 'userData': Storage.model('userData') };

var jsEncode = {
    encode: function (s, k) {
      var enc = "";
      var str = "";
      // make sure that input is string
      str = s.toString();
      for (var i = 0; i < s.length; i++) {
        // create block
        var a = s.charCodeAt(i);
        // bitwise XOR
        var b = a ^ k;
        enc = enc + String.fromCharCode(b);
      }
      return enc;
    }
  };

var Program = React.createClass({

  getInitialState() {
    return {
      inputKey: '',
      decodedKey: '',
      redeemStatus: 0,
      userPoints: ''
    };
  },

  componentWillMount() {
    DB.userData.findById(1)
      .then((storedUserData) => {
        this.setState({
          userPoints: storedUserData.userPoints,
          redeemStatus: 0
        });
      });
  },

  _handleKeyInput(inputText){
    this.setState({
      inputKey: inputText
    });
  },

  _onPressRedeem(){
    if (isOk()){
      redeemPoint( this.props.data.programNr, this.props.data.programGoal, this.props.userToken)
        .then((response) => {
          var programNr = this.props.data.programNr;
          if (response.success===true){
            this.props.data.programsFinished -= 1;
            var userPoints = this.state.userPoints;
            var foundIndex = userPoints.findIndex(function(item) {
              return (item.programNr === programNr);
            });
            userPoints[foundIndex].programsFinished -= 1;
            DB.userData.updateById({
              userPoints: userPoints
            },1).then(() => {
              Alert.alert(
                'Herzliche Glückwünsche!','Hiermit haben Sie die gesammelten QPoints eingelöst',
                [{text: 'Ok', onPress: () => {}},]
              );
              this.setState({
                redeemStatus: 0
              });
            });
          } else {
            Alert.alert(
              'QPoint konnte nicht eingelöst werden',
              response.message,
              [{text: 'Warnung', onPress: () => console.log('Konnte leider nicht eingelöst werden') },]
            );
            this.setState({ redeemStatus: 0 });
            // this.props.navigator.replace({
            //   id: 'ProgramDetail',
            //   data: this.props.data,
            //   userToken: this.props.userToken
            // });
          }
        });
    } else {
      console.log('no Internet connection');
      Alert.alert(
        'Sie haben keine Internet Verbindung','Bitte versuchen Sie es später erneut',
        [{text: 'Ok', onPress: () => {}},]
      );
      this.props.navigator.pop();
    }
  },

  _onPressVerfiy(){
    if (this.state.inputKey !== '') {
      var decoded = jsEncode.encode(this.state.inputKey, this.props.data.programKey); // 'Jcnnm'
      this.setState({
        redeemStatus: 2,
        decodedKey:  decoded
      });
    } else {
      Alert.alert(
        'Bitte einlöse Schlüssel vom Ladeninhaber eingeben','',
        [{text: 'Ok', onPress: () => {}},]
      );
    }
  },

  _onPressStartRedeem(){
    this.setState({ redeemStatus: 1 });
  },

  render: function() {
    var programData = this.props.data;

    var collected = (programData.programsFinished > 0) ? (
      <View style={styles.infoCircle}>
        <Text style={styles.infoText}>{programData.programsFinished}</Text>
      </View>
      ) : (<Text></Text>);

    var redeem;
    if (programData.programsFinished <= 0) {
      console.log('Scenario 1');
      redeem = (<View style={styles.itemRedeemFrame}></View>);
    } else if (programData.programsFinished > 0 && this.state.redeemStatus === 0) {
      console.log('Scenario 2');
      redeem = (
        <View style={styles.itemRedeemFrame}>
          <View style={styles.inputFrame}>
            <Text style={styles.inputText}>Sie haben bereits genügend QPoints gesammelt und können {programData.programsFinished} Gewinn(e) einlösen.</Text>
          </View>
          <TouchableHighlight
          style={styles.button}
          onPress ={() => this._onPressStartRedeem()} >
            <Text style={styles.buttonText} >Einlösen starten</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (this.state.redeemStatus === 1){
      console.log('Scenario 3');
      redeem = (
        <View style={styles.itemRedeemFrame}>
          <View style={styles.inputFrame}>
            <Text style={styles.inputText}>Bitten Sie den Ladeninhaber um den Einlöse-Schlüssel und geben Sie diesen hier ein</Text>
            <TextInput
              style={styles.input}
              keyboardType='default'
              placeholder='Einlöse-Schlüssel'
              onChangeText={(text) => this._handleKeyInput(text)} />
          </View>
          <TouchableHighlight
          style={styles.button}
          onPress ={() => this._onPressVerfiy()} >
            <Text style={styles.buttonText} >Einlöse-Schlüssel Verifizieren</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (this.state.redeemStatus === 2) {
      console.log('Scenario 4');
      redeem = (
        <View style={styles.itemRedeemFrame}>
          <View style={styles.inputFrame}>
            <Text style={styles.inputText}>Bitten Sie den Ladeninhaber den Schlüssel{'\n'}&quot;{this.state.decodedKey}&quot;{'\n'}zu bestätigen und lösen Sie dann ein.</Text>
            <TextInput
              style={styles.input}
              editable={false}
              placeholder={this.state.inputKey} />
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress ={() => this._onPressRedeem()} >
            <Text style={styles.buttonText} >QPoints einlösen</Text>
          </TouchableHighlight>
        </View>
      );
    }
    
    var startDate = programData.programStartDate.slice(8,10) + '.'
      + programData.programStartDate.slice(5,7) + '.'
      + programData.programStartDate.slice(0,4);
    var endDate = programData.programEndDate.slice(8,10) + '.'
      + programData.programEndDate.slice(5,7) + '.'
      + programData.programEndDate.slice(0,4);

    return (
      <View style={styles.container}>

        <View style={styles.itemContent}>
          <View style={styles.contentFrame}>
            <Text style={styles.contentTitle}>{programData.programName}</Text>
            <View style={styles.content2ndLine}>
              {collected}
              <Text style={styles.contentHeader}>{programData.programCompany}</Text>
            </View>
          </View>
          <View style={styles.itemPoints}>
            <View style={styles.pointsCircle}>
              <Text style={styles.pointsText}>{programData.myCount}/{programData.programGoal}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemContent2}>
          <Text style={styles.content2Text}>{programData.address1} {programData.address2}</Text>
          <Text style={styles.content2Text}>{programData.zip} {programData.city}</Text>
          <Text style={styles.content2Text}>{programData.phone} </Text>
          <Text style={styles.content2Text}>Gültig von {startDate} bis {endDate}</Text>
          
        </View>
        <View style={styles.itemInbetween}></View>
        {redeem}

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
  // CONTENT ===========================
  itemContent:{
    flex: 2.5,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  contentFrame: {
    flex: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10
  },
  contentTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal'
  },
  contentHeader: {
    color: 'white',
    fontSize: 18
  },
  content2ndLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 33,
    marginTop: 5
  },
  // Already successful collected Points
  infoCircle: {
    justifyContent: 'center',
    backgroundColor: '#01577A',
    borderColor: 'white',
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5
  },
  infoText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  // HEADER CIRCLE
  itemPoints:{
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  // CONTENT2 ===========================
  itemContent2: {
    flex: 3,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  content2Text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    marginRight: 5
  },
  // SUBCONTENT ===========================
  itemSubContent2: {
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  subContent2Frame: {
    alignSelf: 'center'
  },
  // SubContent2Info
  subContent2Info:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 2 
  },
  // INBETWEEN SPACE ========================
  itemInbetween: {
    flex: 2,
    alignSelf: 'stretch',
    backgroundColor: '#01577A'
  },
  // REDEEM FRAME ==================
  itemRedeemFrame: {
    flex: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#01577A',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  // VERIFICATION ===========================
  inputFrame: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 5
  },
  // BTN ===========================
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
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Program;
