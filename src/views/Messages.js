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
    DB.user.findById(1).then((resp) => {
      this.setState({ userToken: resp.userToken });
    });
    this.initUserData();
  },

  initUserData() {
    this.getUserDataDB()
      .then((storedUserData) => {
        if (isOk()){
          this.getUserDataAPI(storedUserData);
        } else {
          console.log('no internet connection in newsFeed');
        }
      });
  },

  getUserDataDB(){
    return DB.userData.findById(1)
      .then((storedUserData) => {
        var userMessage = (storedUserData.userMessages.length !=0) ? storedUserData.userMessages : '';
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(userMessage),
          ds: userMessage
        });
        return storedUserData;
      });
  },

  getUserDataAPI(storedUserData) {
    return getMessages(this.state.userToken)
      .then((response) => {
        if (response.newsFeed) {
          storedUserData.userMessages = (storedUserData.userMessages.length > 0)? 
            storedUserData.userMessages.concat(response.newsFeed) : response.newsFeed;
          DB.userData.updateById(storedUserData,1).then((storedUserData) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(storedUserData.userMessages),
              ds: storedUserData.userMessages
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

  _renderHeader(){
    return (
      <View style={styles.listViewHeader}>
        <Text style={styles.headerText}>MEINE BOTSCHAFTEN</Text>
      </View>
    )
  },

  _itemPressed: function(rowID) {
    this.props.navigator.push({ id: 'Message', data: this.state.dataSource._dataBlob.s1[rowID] });
    DB.userData.findById(1).then((response) => {
      response.userMessages[rowID].readStatus = true;
      DB.userData.updateById(response,1).then((response) =>{
        var newDataSource = this.state.ds;
        newDataSource[rowID].readStatus = true;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newDataSource),
          ds: newDataSource
        });
      }).then(() => {this.getUserDataDB();});
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
      	<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderHeader={this._renderHeader}
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
  listViewHeader: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#FF2B4B'
  },
  headerText: {
    color: 'white',
    fontSize: 18
  }
});

module.exports = Messages;
