/* @flow */
'use strict';

import React from 'react-native';
import MessageItem from '../components/MessageItem';
import getMessages from '../components/Api';

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

var Messages = React.createClass({

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
    getMessages().then((response) => {
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.newsFeed)
      });
    });
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
    backgroundColor: '#9DC02E',
  },
});

module.exports = Messages;
