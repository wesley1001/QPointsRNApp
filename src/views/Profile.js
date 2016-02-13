/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var Profile = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
      	<Text>Profile-Details</Text>
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
});

module.exports = Profile;
