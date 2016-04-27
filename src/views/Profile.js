/* @flow */
'use strict';

import React from 'react-native';
import Storage from 'react-native-store';
import {updateProfile, loginUser} from '../components/ApiUtils';
import {isOk} from '../components/IsConnected';
import {isHeight} from '../components/CheckDimensions';

var {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} = React;

const DB = {  'user': Storage.model('user'),
              'userData': Storage.model('userData') };

const bottomMargin = (isHeight()< 530) ? 15 : 25;

var Profile = React.createClass({

  getInitialState(){
    return {
      userEmail: '',
      userName: '',
      userRole: '',
      currentPW: '',
      errorPW: false,
      userPW: '',
      userPW2: '',
      userToken: '',
      userGender: '',
      userPoints: '',
      userMessages: [],
      lastSync: '',
      modified: false
    };
  },

  componentWillMount(){
    DB.user.findById(1).then((resp) => {
      this.setState({
        userEmail: resp.userEmail,
        userName: resp.userName,
        currentPW: resp.userPW,
        userRole: resp.userRole,
        userToken: resp.userToken
      });
    });
    DB.userData.findById(1).then((resp) => {
      this.setState({
        userGender: resp.userGender,
        userPoints: resp.userPoints,
        userMessages: resp.userMessages,
        lastSync: resp.lastSync
      });
    });
  },

  _handlePWInput(inputText){
    this.setState({
      userPW: inputText,
      modified: true
    })
  },

  _handlePWInput2(inputText){
    this.setState({
      userPW2: inputText,
      errorPW: false,
      modified: true
    });
  },

  _onPressLogout(){
    DB.user.updateById({
      loggedIn: false 
    },1).then(() => {
      DB.userData.findById(1).then((response) => {
        this.props.navigator.replace({id: 'Login'});
      });
    });
  },

  _storeAndExit(response){
    var PW = this.state.userPW !== '' ? this.state.userPW : this.state.currentPW;
    DB.user.updateById({
      userEmail: this.state.userEmail,
      userPW: PW,
      userRole: this.state.userRole,
      userToken: this.state.userToken,
      loggedIn: true
    },1);
    DB.userData.updateById({
      userGender: this.state.userGender,
      userPoints: this.state.userPoints,
      userMessages: this.state.userMessages,
      lastSync: this.state.lastSync
    },1).then(() => {
      Alert.alert('Hinweis', 'Profil wurde aktualisiert',
        [{text: 'OK', onPress: () => { this.props.navigator.pop()}}]
      );
    });
  },

  _onPressUpdate(){
    this.setState({ modified: false });
    if (this.state.userPW2===this.state.userPW){
      if (isOk()) {
        updateProfile(this.state.userGender, this.state.userPW, this.state.userToken)
          .then((resp) => {
            console.log(resp);
            this._storeAndExit(resp)
          })
          .catch((err) => {
            console.log(err);
            if (err.message === 'Authorization has expired') {
              loginUser(this.state.userEmail, this.state.currentPW)
                .then((response) => {
                  if(response.success === true) {
                    this.setState({
                      userToken: response.token
                    });
                    console.log('versuchen wir es nochmals...');
                    this._onPressUpdate();
                  } else {
                    console.log('API reports no new token');
                    console.log(response);
                  }
                })
                .catch((err) => console.log(`There was an error: ${err}`));
            }
          });
      } else {
        console.log('no Internet connection');
        Alert.alert(
          'Sie haben keine Internet Verbindung','Bitte versuchen Sie es später erneut',
          [{text: 'Ok', onPress: () => {}},]
        );
      }
    } else {
      console.log('passwords not identical');
      this.setState({
        errorPW: true,
        modified: false
      });
      console.log('passwords not identical2');
      this._PW2Input.setNativeProps({text: ''});
      console.log('passwords not identical3');
    }
  },

  _onPressGender(pressedGender){
    this.setState({
      modified: true,
      userGender: pressedGender 
    });
  },

  render: function() {
    var gender;
    switch (this.state.userGender) {
      case 0:
        gender = (
          <View style={styles.segment}>
            <TouchableHighlight
              onPress ={() => this._onPressGender(0)}
              style={[styles.segmentItem, styles.segmentSelected]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextSelected]}>Weibl.</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress ={() => this._onPressGender(1)}
              style={[styles.segmentItem, styles.segmentOption]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextOption]}>Männl.</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress ={() => this._onPressGender(2)}
              style={[styles.segmentItem, styles.segmentOption, styles.segmentSeparator]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextOption]}>Geheim</Text>
            </TouchableHighlight>
          </View>
        );
        break;
      case 1:
        gender = (
          <View style={styles.segment}>
            <TouchableHighlight
              onPress ={() => this._onPressGender(0)}
              style={[styles.segmentItem, styles.segmentOption]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextOption]}>Weibl.</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress ={() => this._onPressGender(1)}
              style={[styles.segmentItem, styles.segmentSelected]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextSelected]}>Männl.</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress ={() => this._onPressGender(2)}
              style={[styles.segmentItem, styles.segmentOption]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextOption]}>Geheim</Text>
            </TouchableHighlight>
          </View>
        );
        break;
      default:
        gender = (
          <View style={styles.segment}>
            <TouchableHighlight
              onPress ={() => this._onPressGender(0)}
              style={[styles.segmentItem, styles.segmentOption]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextOption]}>Weibl.</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress ={() => this._onPressGender(1)}
              style={[styles.segmentItem, styles.segmentOption, styles.segmentSeparator]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextOption]}>Männl.</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress ={() => this._onPressGender(2)}
              style={[styles.segmentItem, styles.segmentSelected]}>
              <Text style={[styles.segmentItemText, styles.segmentItemTextSelected]}>Geheim</Text>
            </TouchableHighlight>
          </View>
        );
    }
    var updateBtn = this.state.modified ? (
      <TouchableHighlight
        style={[styles.button, styles.bgWhite]}
        onPress ={() => this._onPressUpdate()} >
        <Text style={[styles.buttonText, styles.btnTextBlue]} >Änderungen sichern</Text>
      </TouchableHighlight>
      ) : (<Text></Text>)
    var placeholderPW2 = !this.state.errorPW ? 'Bitte Password wiederholen' : 'Passwörter nicht identisch';
    return (
      <View style={styles.container}>
        <View style={styles.itemContent}>
          <View style={styles.listViewHeader}>
            <Text style={styles.headerText}>MEIN PROFIL</Text>
          </View>
          <View style={styles.contentLine}>
              <View style={styles.contentLeft}><Text style={styles.textLeft}>User-Email:</Text></View>
              <View style={styles.contentRight}><Text style={styles.textRight}>{this.state.userEmail}</Text></View>            
          </View>
          <View style={styles.contentLine}>
            <View style={styles.contentLeft}><Text style={styles.textLeft}>Name:</Text></View>
            <View style={styles.contentRight}><Text style={styles.textRight}>{this.state.userName}</Text></View>
          </View>
          <View style={styles.contentLine}>
            <View style={styles.contentLeft}><Text style={styles.textLeft}>Rolle:</Text></View>
            <View style={styles.contentRight}><Text style={styles.textRight}>{this.state.userRole}</Text></View>
          </View>
          <View style={styles.contentLine}>
            <View style={styles.contentLeft}><Text style={styles.textLeft}>Geschlecht:</Text></View>
            <View style={styles.contentRight}>{gender}</View>
          </View>
          <View style={styles.contentLine}>
            <View style={styles.contentLeft}><Text style={styles.textLeft}>Passwort:</Text></View>
            <View style={styles.contentRight}>
              <TextInput 
                keyboardType='default'
                style={styles.inputText}
                secureTextEntry={true}
                placeholder='Passwort ändern'
                placeholderTextColor= '#01577A'
                onChangeText={(text) => this._handlePWInput(text)} />
            </View>
          </View>
          <View style={styles.contentLine}>
            <View style={styles.contentLeft}><Text style={styles.textLeft}>Passwort:</Text></View>
            <View style={styles.contentRight}>
              <TextInput 
                keyboardType='default'
                style={styles.inputText}
                secureTextEntry={true}
                placeholder= {placeholderPW2}
                placeholderTextColor= '#01577A'
                onChangeText={(text) => this._handlePWInput2(text)}
                ref={component => this._PW2Input = component}  />
            </View>
          </View>
        </View>

        <View style={styles.itemBtns}>
          {updateBtn}
          <TouchableHighlight
            style={[styles.button, styles.bgRed]}
            onPress ={() => this._onPressLogout()} >
            <Text style={[styles.buttonText, styles.btnTextWhite]} >Logout</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#9DC02E',
  },
    itemContent: {
      flex: 6,
      flexDirection: 'column'
    },
      contentLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#9BDA70'
      },
      contentLeft: {
        flex: 3
      },
        textLeft: {
          color: 'white',
          fontWeight: 'bold',
        },
      contentRight: {
        flex: 7
      },
        textRight: {
          color: '#01577A'
        },
        segment: {
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: '#01577A',
          borderRadius: 6,
          overflow: 'hidden'
        },
          segmentItem: {
            flex: 1
          },
          segmentItemText: {
            textAlign: 'center',
            padding: 8,
          },
          segmentItemTextSelected: {
            color: '#9DC02E',
          },
          segmentItemTextOption: {
            color: '#01577A'
          },
          segmentSeparator: {
            borderLeftColor: '#01577A',
            borderLeftWidth: 1
          },
          segmentOption: {
            backgroundColor: '#9DC02E'
          },
          segmentSelected: {
            backgroundColor: '#01577A'
          },
      listViewHeader: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#FF2B4B'
      },
      headerText: {
        color: 'white',
        fontSize: 18
      },
      inputText: {
        height: 30,
        color: '#01577A',
        fontSize: 14
      },
    // BTN SECTION =========================
    itemBtns: {
      flex: 4,
      justifyContent: 'flex-end'
    },
      buttonText: {
        fontSize: 18,
        alignSelf: 'center'
      },
      button: {
        height: 40,
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: bottomMargin, // 15 vs. 25
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
      btnTextWhite: {
        color: 'white'
      },
      btnTextBlue: {
        color: '#01577A',
      },
    bgRed: {
      backgroundColor: '#FF2B4B'
    },
    bgWhite: {
      backgroundColor: '#ffffff'
    },
});

module.exports = Profile;
