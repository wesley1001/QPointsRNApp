/* @flow */
'use strict';

import React from 'react-native';
import MessageItem from '../components/MessageItem';
import {getMessages} from '../components/ApiUtils';
import Storage from 'react-native-store';

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

const DB = { 'user': Storage.model('user') };

var Messages = React.createClass({

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([])
    };
  },

  componentWillMount() {
    this.initUserData();
  },

  initUserData() {
    DB.user.findById(1)
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

  updateUserData(storedUserData) {
    getMessages(storedUserData.userEmail, storedUserData.userPW)
      .then((response) => {
        if (response.newsFeed) {
          storedUserData.userMessages = storedUserData.userMessages.concat(response.newsFeed);
          DB.user.updateById(storedUserData,1).then((storedUserData) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(storedUserData.userMessages)
            });
          });
        }
      })
      .catch((err) => console.log(`There was an error: ${err}`));
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
