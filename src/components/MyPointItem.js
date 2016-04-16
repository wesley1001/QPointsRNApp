/* MessageItem */
'use strict';

import React from 'react-native';

var {
  Dimensions,
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
    console.log(programData);
    var collected = (programData.programsFinished > 0) ? (
      <View style={styles.infoCircle}>
        <Text style={styles.infoText}>{programData.programsFinished}</Text>
      </View>
      ) : (<Text></Text>);
    return (
      <TouchableHighlight onPress={() => this.props.onClick(this.props.rowID)}  underlayColor='#dddddd'>
        <View style={styles.itemContainer}>

          <View style={styles.itemContent} >
            <Text style={styles.contentTitle} numberOfLines={1}>{programData.programName}</Text>
            <View style={styles.content2ndLine}>
              {collected}
              <Text style={styles.contentHeader} numberOfLines={1}>{programData.programCompany}</Text>
            </View>
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
    height: 100,
    backgroundColor: '#9DC02E',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  // Content
  itemContent: {
    flex: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10
  },
  contentTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal'
  },
  content2ndLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 33,
    marginTop: 5
  },
  contentHeader: {
    color: 'white',
    fontSize: 18
  },
  // Already successful collected Points
  infoCircle:{
    justifyContent: 'center',
    backgroundColor: '#01577A',
    borderColor: 'white',
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5
  },
  infoText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  // Information about current QPoint Status
  itemPoints:{
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
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
