/* MessageItem */
'use strict';

import React from 'react-native';

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var MyPointItem = React.createClass({
	propTypes: {
    programData: React.PropTypes.object.isRequired,
    rowID: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render: function() {
    var programData = this.props.programData;
    return (
      <TouchableHighlight onPress={() => this.props.onClick(this.props.rowID)}  underlayColor='#dddddd'>
        <View style={styles.itemContainer}>

          <View style={styles.itemInfo}>
            <View style={styles.infoCircle}>
              <Text style={styles.infoText}>{programData.myCount}/{programData.programGoal}</Text>
            </View>
          </View>
          <View style={styles.itemContent} >
            <Text style={styles.itemHeader}>{programData.programCompany}</Text>
            <Text style={styles.itemTitle}>{programData.ProgramsFinished}</Text>
            <Text style={styles.itemTitle}>{programData.programName}</Text>
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
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemInfo:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
    backgroundColor: 'rgba(0,0,0,0)'
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


module.exports = MyPointItem;
