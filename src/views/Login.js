/* @flow */
'use strict';

import React  from 'react-native';
import Storage from 'react-native-store';
import getUserData from '../components/ApiUserData';

var {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const DB = { 'user': Storage.model('user') };

var Login = React.createClass({

  getInitialState: function() {
    return {
      userEmail: '',
      userPW: '',
      loggedIn: false,
      error: false
    };
  },

  componentWillMount: function() {
    DB.user.findById(1).then((user) => {
      if (!user) {
        console.log('no local storage');
        this.setState({ loggedIn: false });
        return;
      }
      if (!user.loggedIn){
        this.setState({ loggedIn: false });
        return;
      }
      this.setState({ loggedIn: true });
      this.props.navigator.replace({id: 'MyPoints'});
    });
  },

  _handleUserInput(inputText){
    this.setState({
      userEmail: inputText
    })
  },

  _handlePWInput(inputText){
    this.setState({
      userPW: inputText
    })
  },

  _handleResponse(res){
    if(res.success === false){
      console.log('User not found');
      this.setState({
        error: res.message,
        loggedIn: false
      });
    } else {
      this.setState({
        error: '',
        loggedIn: true
      });
      let userProgramData = res.programData ? res.programData : '';
      DB.user.updateById({
        userEmail: this.state.userEmail,
        userPW: this.state.userPW,
        userGender: res.gender,
        loggedIn: true,
        userPoints: userProgramData
      },1).then(() => this.props.navigator.replace({id: 'MyPoints'}));
    }
  },

  _onPressLogin(){
    getUserData(this.state.userEmail, this.state.userPW)
      .then((response) => {
        this._handleResponse(response);
      })
      .catch((err) => console.log(`There was an error: ${err}`));
  },

  _onPressSignin(){
    this.props.navigator.push({id: 'Register'})
  },

  render: function() {
    var warningText;
    if (this.state.error){
      warningText = (<Text style={styles.warningText}>{this.state.error}</Text>);
    } else {
      warningText = (<Text></Text>);
    }
    return (
      <View style={styles.container}>
      	<TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='Bitte email eingeben'
          onChangeText={(text) => this._handleUserInput(text)} />
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Passwort'
          onChangeText={(text) => this._handlePWInput(text)} />

        <TouchableHighlight
          style={styles.button}
          onPress ={() => this._onPressLogin()} >
          <Text style={styles.buttonText} >Login</Text>
        </TouchableHighlight>
        {warningText}
        <TouchableHighlight
          style={styles.button}
          onPress ={() => this._onPressSignin()} >
          <Text style={styles.buttonText} >Konto erstellen</Text>
        </TouchableHighlight>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 20,
    paddingLeft: 5
  },
  image: {
    height: 350,
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
  },
  warningText: {
    margin: 20
  }
});

module.exports = Login;
