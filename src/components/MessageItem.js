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
    console.log('rendering Rows');
    var message = this.props.message;
    var newMessage = (message.readStatus) ? (<Text></Text>) : (
        <View style={styles.infoCircle}>
          <Text style={styles.infoText}>!</Text>
        </View>
      );
    return (
      <TouchableHighlight onPress={() => this.props.onClick(this.props.rowID)}  underlayColor='#dddddd'>
        <View style={styles.itemContainer}>  
          <View style={styles.content1stLine}>
            {newMessage}
            <Text style={styles.contentSubHeader} numberOfLines={1}>{message.newsDate}</Text>
          </View>
          <Text style={styles.contentHeader} numberOfLines={1}>{message.company}</Text>
          <Text style={styles.contentText} numberOfLines={1}>{message.newsTitle}: {message.newsMessage}</Text>
        </View>
      </TouchableHighlight>
    );
  }
});


var styles = StyleSheet.create({
	itemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    height: 100,
    backgroundColor: '#9DC02E',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  // Content
  content1stLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 19
  },
  // Already successful collected Points
  infoCircle:{
    justifyContent: 'center',
    backgroundColor: '#01577A',
    borderColor: 'white',
    borderWidth: 1,
    height: 16,
    width: 16,
    borderRadius: 8,
    marginRight: 5
  },
  infoText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 8,
    backgroundColor: 'rgba(0,0,0,0)'
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
  contentSubHeader: {
    color: 'white',
    fontSize: 14
  },
});


module.exports = MessageItem;
