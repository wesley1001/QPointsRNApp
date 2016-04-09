/* MessageItem */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var MessageItem = React.createClass({
	propTypes: {
    message: React.PropTypes.object.isRequired,
    rowID: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render: function() {
    var message = this.props.message;
    var newMessage = (message.readStatus) ? (<Text></Text>) : (
        <View style={styles.infoCircle}>
          <Text style={styles.infoText}>I</Text>
        </View>
      );
    return (
      <TouchableHighlight onPress={() => this.props.onClick(this.props.rowID)}  underlayColor='#dddddd'>
        <View style={styles.itemContainer}>

          <View style={styles.itemInfo}>
            {newMessage}
          </View>

          <View style={styles.itemContent} >
            <Text style={styles.contentAddress} numberOfLines={1}>{message.newsDate}</Text>
            <Text style={styles.contentHeader} numberOfLines={1}>{message.company}</Text>
            <Text style={styles.contentTitle} numberOfLines={1}>{message.newsTitle}</Text>
            <Text style={styles.contentAddress} numberOfLines={1}>{message.newsMessage}</Text>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
});


var styles = StyleSheet.create({
	itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    height: 100,
    backgroundColor: '#9DC02E',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  // Already successful collected Points
  itemInfo:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10
  },
  infoCircle:{
    justifyContent: 'center',
    backgroundColor: '#01577A',
    borderColor: 'white',
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 15
  },
  infoText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  // Content
  itemContent: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  contentHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentTitle: {
    color: 'white',
    fontSize: 18
  },
  contentAddress: {
    color: 'white',
    fontSize: 14
  },
});


module.exports = MessageItem;
