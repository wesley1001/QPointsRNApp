/* @flow */
'use strict';

import React from 'react-native';
import MessageItem from '../components/MessageItem';

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

const interimData = {
  messages: [
    {
      messageTitle: 'Heute unsere neuen Sorten1',
      messageText: 'Liebe Kunden, heute zwischen 15 und 17 Uhr findet Ice-Happy-Hour statt',
      programName: '3 für 1 Eis',
      company: 'Eishaus',
      programGoal: 3,
      messageDate: '2016-02-11'
    },
    {
      messageTitle: 'Heute unsere neuen Sorten2',
      messageText: 'Liebe Kunden, heute zwischen 15 und 17 Uhr findet Ice-Happy-Hour statt',
      programName: '3 für 1 Eis',
      company: 'Eishaus',
      programGoal: 3,
      messageDate: '2016-02-11'
    },
    {
      messageTitle: 'Heute unsere neuen Sorten3',
      messageText: 'Liebe Kunden, heute zwischen 15 und 17 Uhr findet Ice-Happy-Hour statt',
      programName: '3 für 1 Eis',
      company: 'Eishaus',
      programGoal: 3,
      messageDate: '2016-02-12'
    }
  ]
};

var Messages = React.createClass({

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows([])
    };
  },

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(interimData.messages)
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
    this.props.navigator.push({ id: 'Message', data: interimData.messages[rowID] });
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
