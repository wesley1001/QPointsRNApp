/* @flow */
'use strict';

import React  from 'react-native';
import Storage from 'react-native-store';

var {
  AsyncStorage,
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
      password: '',
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
      console.log(user);
      if (!user.loggedIn){
        this.setState({ loggedIn: false });
        return;
      }
      this.setState({ loggedIn: true });
      this.props.navigator.replace({id: 'Messages'});
    });
  },

  _handleUserInput(inputText){
    this.setState({
      userEmail: inputText
    })
  },

  _handlePWInput(inputText){
    this.setState({
      password: inputText
    })
  },

  // _handleResponse(res){
  //   console.log('this is the api.loginUser response:');
  //   console.log(res);
  //   if(res.success === false){
  //     this.setState({
  //       error: 'User not found'
  //     })
  //   } else {
  //     AsyncStorage.setItem(USEREMAIL_KEY, this.state.userEmail)
  //     .then(() => {
  //       console.log('userEmail has been save in storage');
  //       this.setState({
  //         error: false,
  //       });
  //       this.props.navigator.push({
  //         id: 'MyQPoints'
  //       });
  //     });
  //   }
  // },

  // _onPressSubmit(){
  //   console.log('will start api.loginUser. With email: ' + this.state.userEmail);
  //   api.loginUser(this.state.userEmail)
  //     .then((jsonRes) => this._handleResponse(jsonRes))
  //     .catch((err) => {
  //       this.setState({
  //         error: `There was an error: ${err}`
  //     });
  //   })
  // },

  _onPressLogin(){
    DB.user.updateById({
      userEmail: this.state.userEmail,
      userPW: this.state.password,
      loggedIn: true
    },1);
    console.log('userEmail has been saved in storage');
    this.setState({
      error: false,
    });
    this.props.navigator.replace({id: 'MyPoints'});
  },

  render: function() {
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
});

module.exports = Login;
