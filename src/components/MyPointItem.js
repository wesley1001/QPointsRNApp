/* MessageItem */
'use strict';

import React from 'react-native';
import {isHeight} from '../components/CheckDimensions';

var {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var pointCircleD, infoCircleD, textSize1;

var MyPointItem = React.createClass({
	propTypes: {
    programData: React.PropTypes.object.isRequired,
    rowID: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    currentHeight: React.PropTypes.number.isRequired
  },

  componentWillMount() {
    console.log(this.props.currentHeight);
    if (this.props.currentHeight < 530) {
      pointCircleD = 50;
      infoCircleD = 16;
      textSize1= 14;
    } else {
      pointCircleD = 80;
      infoCircleD = 30;
      textSize1= 18;
    }
  },

  render: function() {
    var programData = this.props.programData;
    var collected = (programData.programsFinished > 0) ? (
      <View style={[styles.infoCircle, {width: infoCircleD, height: infoCircleD, borderRadius: infoCircleD/2}]}>
        <Text style={styles.infoText}>{programData.programsFinished}</Text>
      </View>
      ) : (<Text></Text>);
    console.log(pointCircleD);
    return (
      <TouchableHighlight onPress={() => this.props.onClick(this.props.rowID)}  underlayColor='#dddddd'>
        <View style={styles.itemContainer}>

          <View style={styles.itemContent} >
            <Text style={[styles.contentTitle, {fontSize: textSize1+2}]} numberOfLines={1}>{programData.programName}</Text>
            <View style={styles.content2ndLine}>
              {collected}
              <Text style={[styles.contentHeader, {fontSize: textSize1}]} numberOfLines={1}>{programData.programCompany}</Text>
            </View>
          </View>

          <View style={styles.itemPoints}>
            <View style={[styles.pointsCircle, {height: pointCircleD, width: pointCircleD, borderRadius: pointCircleD/2}]}>
              <Text style={[styles.pointsText, {fontSize: textSize1+2}]}>{programData.myCount}/{programData.programGoal}</Text>
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
    // fontSize: textSize1+2, // 16 vs 20
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
    // fontSize: textSize1 // 14 vs 18
  },
  // Already successful collected Points
  infoCircle:{
    justifyContent: 'center',
    backgroundColor: '#01577A',
    borderColor: 'white',
    borderWidth: 1,
    // height: 30,
    // width: 30,
    // borderRadius: 15,
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
    // height: pointCircleD, // 50 vs 80
    // width: pointCircleD, // 50 vs 80
    // borderRadius: pointCircleD/2 // 25 vs 40
  },
  pointsText:{
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    // fontSize: 16, // vs 20
    fontWeight: 'bold'
  },
});


module.exports = MyPointItem;
