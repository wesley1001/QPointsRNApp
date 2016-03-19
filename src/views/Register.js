/* @flow */
'use strict';

import React from 'react-native';
import {createAccount} from '../components/ApiUtils';

var {
  Alert,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

var Register = React.createClass({

  getInitialState: function() {
    return {
      userEmail: '',
      userPW: '',
      userPW2: '',
      userGender: 0,
      errorPW: false,
      errorMessge: ''
    };
  },

  _handleUserEmail(inputText){
    this.setState({
      userEmail: inputText
    })
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

  _handleResponse(res){
    if(res.success === false){
      this.setState({
        errorMessge: res.message,
      });
    Alert.alert('Sie können nicht angemeldet werden', this.state.errorMessge)
    } else {
      this.props.navigator.pop();
    }
  },

  _onPressRegister(){
    if (this.state.userPW2===this.state.userPW){
      console.log(this.state);
      createAccount(this.state.userEmail, this.state.userPW)
        .then((response) => {
        this._handleResponse(response);
      })
      .catch((err) => console.log(`There was an error: ${err}`));
    } else {
      this.setState({
        errorPW: true
      });
      this._PW2Input.setNativeProps({text: ''});
      console.log('nicht identisch');
    }
  },

  render: function() {
    var placeholderPW2 = !this.state.errorPW ? 'Bitte Password wiederholen' : 'Passwörter nicht identisch';
    return (
      <View style={styles.container}>
      	<TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='Bitte email eingeben'
          onChangeText={(text) => this._handleUserEmail(text)} />
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Bitte Passwort eingeben'
          onChangeText={(text) => this._handlePWInput(text)} />
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder= {placeholderPW2}
          onChangeText={(text) => this._handlePWInput2(text)}
          ref={component => this._PW2Input = component} />
        <View style={styles.pickerView} >
          <Picker
            selectedValue={this.state.userGender}
            onValueChange={(userGender) => this.setState({userGender: userGender})}
            style={styles.picker} >
            <Picker.Item itemStyle={styles.pickerItem} label="keine Angabe" value="0" />
            <Picker.Item label="Weiblich" value="1" />
            <Picker.Item label="Männlich" value="2" />
          </Picker>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress ={() => this._onPressRegister()} >
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
  pickerView: {
    padding: 0,
    margin: 0,
    borderColor: 'white',
    borderWidth: 1,
  },
  picker: {
    width: 200,

    borderColor: 'black'
  },
  pickerItem: {
    color: 'white'
  }
});


module.exports = Register;