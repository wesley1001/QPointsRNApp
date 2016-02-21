/* @flow */
'use strict';

import React from 'react-native';
import Storage from 'react-native-store';
import {updateProfile} from '../components/ApiUtils';

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const DB = { 'user': Storage.model('user') };

var Profile = React.createClass({

  getInitialState(){
    return {
      userEmail: '',
      userGender: '',
      errorPW: false,
      userPW: '',
      userPW2: '',
      currentPW: ''
    };
  },

  componentWillMount(){
    DB.user.findById(1).then((resp) => {
      console.log('Storage is');
      this.setState({
        userEmail: resp.userEmail,
        userGender: resp.userGender,
        currentPW: resp.userPW
      });
      console.log(resp);
    });
  },

  _handlePWInput(inputText){
    this.setState({
      userPW: inputText
    })
  },

  _handlePWInput2(inputText){
    this.setState({
      userPW2: inputText,
      errorPW: false
    });
  },

  _onPressLogout(){
    DB.user.updateById({
      loggedIn: false 
    },1).then(() => {
      console.log('userEmail has been logged out');
      this.props.navigator.replace({id: 'Login'});
    });
  },

  _onPressUpdate(){
    console.log(this.state.userPW2, this.state.userPW);
    if (this.state.userPW2===this.state.userPW){
      updateProfile(this.state.userEmail, this.state.currentPW, this.state.gender, this.state.userPW)
    } else {
      this.setState({
        errorPW: true
      });
      this._PW2Input.setNativeProps({text: ''});
    }
  },

  render: function() {
    var gender;
    switch (this.state.userGender) {
      case 0:
        gender = 'Weiblich';
        break;
      case 1:
        gender = 'Männlich';
        break;
      default:
        gender = 'nicht angegeben';
    }
    var placeholderPW2 = !this.state.errorPW ? 'Bitte Password wiederholen' : 'Passwörter nicht identisch';
    return (
      <View style={styles.container}>
        <Text>User-Email:</Text>
        <View style={[styles.textField, styles.bgBlue]}>
          <Text style={styles.textInField}>{this.state.userEmail}</Text>
        </View>
        <Text>Geschlecht:</Text>
        <View style={[styles.textField, styles.bgBlue]}>
          <Text style={styles.textInField}>{gender}</Text>
        </View>
        <TextInput
          style={[styles.textField, styles.bgGrey, styles.textInField]}
          keyboardType='default'
          placeholder='Passwort ändern'
          placeholderTextColor= '#01577A'
          onChangeText={(text) => this._handlePWInput(text)} />
        <TextInput
          style={[styles.textField, styles.bgGrey, styles.textInField]}
          keyboardType='default'
          placeholder= {placeholderPW2}
          placeholderTextColor= '#01577A'
          onChangeText={(text) => this._handlePWInput2(text)}
          ref={component => this._PW2Input = component} />

        <TouchableHighlight
          style={[styles.button, styles.bgBlue]}
          onPress ={() => this._onPressUpdate()} >
          <Text style={styles.buttonText} >Änderungen sichern</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, styles.bgWhite]}
          onPress ={() => this._onPressLogout()} >
          <Text style={styles.buttonText} >Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9DC02E',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textField: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  bgBlue: {
    backgroundColor: '#01577A'
  },
  bgGrey: {
    backgroundColor: '#e4e4e4'
  },
  bgWhite: {
    backgroundColor: '#ffffff'
  },
  textInField: {
    color: '#ffffff'
  }
});

module.exports = Profile;
