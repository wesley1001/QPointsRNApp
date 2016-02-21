/* @flow */
'use strict';

import React from 'react-native';
import MyPointItem from '../components/MyPointItem';
import Storage from 'react-native-store';

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
        dataSource: ds.cloneWithRows([])
    };
  },

  componentWillMount() {
    this.refreshData();
  },

  refreshData() {
    DB.user.findById(1).then((resp) => {
      if (resp) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(resp.userPoints)
        });
      }
    });
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
    this.props.navigator.push({ id: 'Program', data: this.state.dataSource._dataBlob.s1[rowID] });
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
