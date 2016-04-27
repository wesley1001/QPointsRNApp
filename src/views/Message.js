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
        <View style={styles.itemContent}>
          <Text style={styles.contentSubHeader} numberOfLines={1}>{this.props.data.newsDate}</Text>
          <Text style={styles.contentHeader} numberOfLines={1}>{this.props.data.company}</Text>
          <Text style={styles.contentText} numberOfLines={1}>{this.props.data.programName}</Text>
          <Text style={styles.contentText} numberOfLines={1}>{this.props.data.newsTitle}</Text>
          <Text style={styles.contentText} numberOfLines={8}>{this.props.data.newsMessage}</Text>
        </View>
      	<View style={styles.itemInbetween}></View>
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
  // CONTENT ===========================
  itemContent: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10
  },
    contentSubHeader: {
      color: 'white',
      fontSize: 14,
      marginTop: 10
    },
    contentHeader: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 5
    },
    contentText: {
      color: 'white',
      fontSize: 18,
      marginTop: 5
    },
  // BELOW SPACE ========================
  itemInbetween: {
    flex: 5,
    alignSelf: 'stretch',
    backgroundColor: '#01577A',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
});

module.exports = Message;
