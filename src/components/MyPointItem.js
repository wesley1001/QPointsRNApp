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
    var collected = (programData.ProgramsFinished > 0) ? (
      <View style={styles.infoCircle}>
        <Text style={styles.infoText}>{programData.ProgramsFinished}</Text>
      </View>
      ) : (<Text></Text>);
    return (
      <TouchableHighlight onPress={() => this.props.onClick(this.props.rowID)}  underlayColor='#dddddd'>
        <View style={styles.itemContainer}>

          <View style={styles.itemInfo}>
            {collected}
          </View>
          <View style={styles.itemContent} >
            <Text style={styles.contentHeader}>{programData.programCompany}</Text>
            <Text style={styles.contentTitle}>{programData.programName}</Text>
            <Text style={styles.contentAddress}>{programData.address1}, {programData.city}</Text>
          </View>
          <View style={styles.itemPoints}>
            <View style={styles.pointsCircle}>
              <Text style={styles.pointsText}>{programData.myCount}/{programData.programGoal}</Text>
            </View>
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
  // Information about current QPoint Status
  itemPoints:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pointsCircle:{
    justifyContent: 'center',
    backgroundColor: '#9BDA70',
    borderColor: 'white',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 40
  },
  pointsText:{
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 20,
    fontWeight: 'bold'
  },
});


module.exports = MyPointItem;
