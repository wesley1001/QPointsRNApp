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
    messageTitle: React.PropTypes.string.isRequired,
    messageText: React.PropTypes.string.isRequired,
    company: React.PropTypes.string.isRequired,
    programGoal: React.PropTypes.number.isRequired,
    messageDate: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <View >
        <View style={styles.itemContainer}>

          <View style={styles.itemContent} >
            <Text style={styles.itemHeader}>{this.props.messageDate} {this.props.company}</Text>
              <Text style={styles.itemTitle}>{this.props.messageTitle}</Text>
              <Text>{this.props.messageText}</Text>
          </View>

          <View style={styles.itemNav}>
            <Text>></Text>
          </View>

          

        </View>
      </View>
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
