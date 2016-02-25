/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

var Redeem = React.createClass({

  render: function() {
    console.log('jetzt auf Redeem View');
    console.log(this.props.data);
    return (
      <View style={styles.container}>
      	<Text>Punkte einlösen</Text>
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

module.exports = Redeem;
