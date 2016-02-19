/* @flow */
'use strict';

import React from 'react-native';
import Storage from 'react-native-store';

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

const DB = { 'user': Storage.model('user') };

var Profile = React.createClass({

  getInitialState(){
    return {
      userEmail: '',
      userGender: ''
    };
  },

  componentWillMount(){
    DB.user.findById(1).then((resp) => {
      console.log('Storage is');
      this.setState({
        userEmail: resp.userEmail,
        userGender: resp.userGender
      });
      console.log(resp);
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

  render: function() {
    return (
      <View style={styles.container}>
      	<Text>Profile-Details</Text>
        <Text>{this.state.userEmail}</Text>
        <Text>{this.state.userGender}</Text>
        <Text></Text>
        <TouchableHighlight
          style={styles.button}
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
    justifyContent: 'center',
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
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Profile;
