/* @flow */
'use strict';

import React  from 'react-native';
import Storage from 'react-native-store';
import {loginUser, getUserData} from '../components/ApiUtils';
import {initStorage} from '../components/initStorage';
import {isOk} from '../components/IsConnected';

var {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const DB = {
  'user': Storage.model('user'),
  'userData': Storage.model('userData')
 };

initStorage();

var Login = React.createClass({

  getInitialState: function() {
    return {
      userEmail: '',
      oldUser: '',
      userPW: '',
      oldPW: '',
      userToken: '',
      loggedIn: false,
      error: false,
      isConnected: null,
      lastSavedMessages: ''
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
        this.setState({
          userEmail: user.userEmail,
          oldUser: user.userEmail,
          userPW: user.userPW,
          oldPW: user.userPW,
          userRole: user.userRole,
          userToken: user.userToken,
          loggedIn: false
        });
        DB.userData.findById(1).then((response) => {
          if (response.userMessages.length > 0){
            this.setState({ lastSavedMessages: response.userMessages });
          }
        });
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
      let recordDate = Date.parse(new Date());
      DB.userData.updateById({
        userGender: res.gender,
        userPoints: userProgramData,
        userMessages: this.state.lastSavedMessages,
        lastSync: recordDate
      },1)
        .then(() => this.props.navigator.replace({id: 'MyPoints'}))
        .catch((err) => console.log(`SOMETHING WRONG: ${err}`));
    }
  },

  _saveToken(token, role){
    let gender = this.state.gender;
    if (this.state.userEmail === this.state.oldUser) {
      gender = this.state.userGender;
    }
    DB.user.updateById({
      userEmail: this.state.userEmail,
      userPW: this.state.userPW,
      userRole: role,
      userToken: token,
      loggedIn: true
    },1)
  },

  _onPressLogin(){
    if(isOk()){
      if (this.state.userEmail !== this.state.oldUser) {
        this.setState({ lastSavedMessages: '' });
      }
      loginUser(this.state.userEmail, this.state.userPW)
        .then((response) => {
          if(response.success === true) {
            this.setState({
              userToken: response.token,
              userRole: response.role 
            });
            this._saveToken(response.token, response.role);
            getUserData(response.token)
              .then((respData) => {
                this._handleResponse(respData);
              })
              .catch((err) => console.log(`Did not receive userData: ${err}`));
            return;
          } else {
          }
        })
        .catch((err) => console.log(`There was an error: ${err}`));
    } else {
      console.log('No internet connection to login');
      if (this.state.userEmail === this.state.oldUser && this.state.userPW === this.state.oldPW){
        this.setState({ loggedIn: true });
        this.props.navigator.replace({id: 'MyPoints'});
      }
    }
    
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
