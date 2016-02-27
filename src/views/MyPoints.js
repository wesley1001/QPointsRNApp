/* @flow */
'use strict';

import React from 'react-native';
import MyPointItem from '../components/MyPointItem';
import Storage from 'react-native-store';
import {getUserData} from '../components/ApiUtils';

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

const DB = { 'user': Storage.model('user') };

var MyPoints = React.createClass({
  
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows([]),
        userEmail: '',
        userPW: '',
        userMessages: '',
        lastSync: ''
    };
  },

  componentWillMount() {
    DB.user.findById(1).then((resp) => {
      if (resp) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(resp.userPoints),
          userEmail: resp.userEmail,
          userPW: resp.userPW,
          userMessages: resp.userMessages,
          lastSync: resp.lastSync
        });
        console.log('secondes since last update ' + (Date.parse(new Date()) - resp.lastSync)/1000);
        if ((Date.parse(new Date()) - resp.lastSync)/1000 > 60) {
          this.refreshData();
        }
      }
    });
  },

  refreshData() {
    console.log('now lets call API');
    getUserData(this.state.userEmail, this.state.userPW)
      .then((response) => {
        if (response.success===true){
          DB.user.updateById({
            userEmail: this.state.userEmail,
            userPW: this.state.userPW,
            userGender: response.gender,
            loggedIn: true,
            userPoints: response.programData,
            userMessages: this.state.userMessages,
            lastSync: Date.parse(new Date())
          },1).then(() => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(response.programData), 
            });
          });
        }
      })
      .catch((err) => console.log(`There was an error: ${err}`));
  },

  _renderRow: function(rowData, sectionID, rowID) {
    return (
      <MyPointItem 
        rowID={rowID}
        programData={rowData}
        onClick={this._itemPressed}/>
    );
  },

  _itemPressed: function(rowID) {
    this.props.navigator.push({
      id: 'ProgramDetail',
      data: this.state.dataSource._dataBlob.s1[rowID],
      userEmail: this.state.userEmail
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
    backgroundColor: '#9DC02E',
  },
});

module.exports = MyPoints;
