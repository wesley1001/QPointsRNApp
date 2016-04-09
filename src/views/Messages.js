/* @flow */
'use strict';

import React from 'react-native';
import MessageItem from '../components/MessageItem';
import {getMessages} from '../components/ApiUtils';
import Storage from 'react-native-store';
import {isOk} from '../components/IsConnected';

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

const DB = {
  'user': Storage.model('user'),
  'userData': Storage.model('userData')
};

var Messages = React.createClass({

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
      userToken: ''
    };
  },

  componentWillMount() {
    this.initUserData();
  },

  initUserData() {
    DB.user.findById(1).then((resp) => {
      this.setState({ userToken: resp.userToken });
    });
    DB.userData.findById(1)
      .then((storedUserData) => {
        var userMessage = (storedUserData.userMessages.length !=0) ? storedUserData.userMessages : '';
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(userMessage)
        });
        return storedUserData;
      })
      .then((storedUserData) => {
        this.updateUserData(storedUserData)        
      });
  },

  componentWillUnmount() {
    DB.userData.findById(1)
      .then((storedUserData) => {
      });
  },

  updateUserData(storedUserData) {
    if (isOk()){
      getMessages(this.state.userToken)
        .then((response) => {
          if (response.newsFeed) {
            storedUserData.userMessages = (storedUserData.userMessages.length > 0)? 
              storedUserData.userMessages.concat(response.newsFeed) : response.newsFeed;
            DB.userData.updateById(storedUserData,1).then((storedUserData) => {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(storedUserData.userMessages)
              });
            });
          }
        })
        .catch((err) => console.log(`There was an error: ${err}`));
    } else {
      console.log('no internet connection in newsFeed');
    }
  },

  _renderRow: function(rowData, sectionID, rowID) {
    return (
      <MessageItem 
        rowID={rowID}
        message={rowData}
        onClick={this._itemPressed}/>
    );
  },

  _itemPressed: function(rowID) {
    this.props.navigator.push({ id: 'Message', data: this.state.dataSource._dataBlob.s1[rowID] });
    DB.userData.findById(1).then((response) => {

    });
  },

  render: function() {
    return (
      <View style={styles.container}>
      	<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          />
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01577A',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});

module.exports = Messages;
