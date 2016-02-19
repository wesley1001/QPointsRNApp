/* @flow */
'use strict';

import React from 'react-native';

var {
  StyleSheet,
  Text,
  View
} = React;

var Message = React.createClass({

  render: function() {
    console.log(this.props.data);
    return (
      <View style={styles.container}>
        <View style={styles.titel}>
          <Text>{this.props.data.newsTitle}</Text>
        </View>
        <View style={styles.header}>
          <Text>{this.props.data.company} - {this.props.data.programName} </Text>
          <Text>{this.props.data.newsDate} </Text>
        </View>
      	<View style={styles.content}>
          <Text>{this.props.data.newsMessage}</Text>
        </View>
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
  titel: {
    flex: 1,
    justifyContent: 'center',
    // borderColor: 'white',
    // borderWidth: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    // borderColor: 'white',
    // borderWidth: 1
  },
  content: {
    flex: 5,
    padding: 10,
    // borderColor: 'white',
    // borderWidth: 1
  },
});

module.exports = Message;
