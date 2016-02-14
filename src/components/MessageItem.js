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
    return (
      <TouchableHighlight onPress={() => this.props.onClick(this.props.rowID)}  underlayColor='#dddddd'>
        <View style={styles.itemContainer}>

          <View style={styles.itemContent} >
            <Text style={styles.itemHeader}>{this.props.message.messageDate} {this.props.company}</Text>
              <Text style={styles.itemTitle}>{this.props.message.messageTitle}</Text>
              <Text>{this.props.message.messageText}</Text>
          </View>

          <View style={styles.itemNav}>
            <Text>></Text>
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
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  itemContent: {
    flex: 19,
    flexDirection: 'column'
  },
  itemHeader: {

  },
  itemTitle: {

  },
  itemNav: {
    flex: 1,
    justifyContent: 'center'
  },
  separator: {
    
  },
});


module.exports = MessageItem;
