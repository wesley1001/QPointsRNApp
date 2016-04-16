/* @flow */
'use strict';

import React from 'react-native';
import MyPointItem from '../components/MyPointItem';
import Storage from 'react-native-store';
import {getUserData} from '../components/ApiUtils';
import {isOk} from '../components/IsConnected';

var {
  ListView,
  StyleSheet,
  Text,
  View
} = React;

const DB = {
  'user': Storage.model('user'),
  'userData': Storage.model('userData')
 };

var MyPoints = React.createClass({
  
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        dataSource: ds.cloneWithRows([]),
        userToken: '',
        userMessages: '',
        lastSync: '',
        reloading: false
    };
  },

  componentWillMount() {
    DB.user.findById(1).then((resp) => {
      this.setState({ userToken: resp.userToken });
    });
    DB.userData.findById(1)
      .then((resp) => {
        if (resp) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(resp.userPoints),
            userMessages: resp.userMessages,
            lastSync: resp.lastSync
          });
          console.log('secondes since last update ' + (Date.parse(new Date()) - resp.lastSync)/1000);
          if ((Date.parse(new Date()) - resp.lastSync)/1000 > 60) {
            this.refreshData();
          }
        } else {console.log('WARUM NICHT?');}
      });
  },

  refreshData() {
    if (isOk()){
      this.setState({ reloading: true });
        getUserData(this.state.userToken)
          .then((response) => {
            if (response.success===true){
              DB.userData.updateById({
                userGender: response.gender,
                userPoints: response.programData,
                userMessages: this.state.userMessages,
                lastSync: Date.parse(new Date())
              },1).then(() => {
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(response.programData), 
                  reloading: false
                });
              });
            }
          })
          .catch((err) => console.log(`There was an error: ${err}`));
    } else {
      console.log('no Internet connection');
    }
  },

  _renderRow: function(rowData, sectionID, rowID) {
    return (
      <MyPointItem 
        rowID={rowID}
        programData={rowData}
        onClick={this._itemPressed}/>
    );
  },

  _renderHeader(){
    return (
      <View style={styles.listViewHeader}>
        <Text style={styles.headerText}>MEINE PROGRAMME</Text>
      </View>
    )
  },

  _itemPressed: function(rowID) {
    this.props.navigator.push({
      id: 'ProgramDetail',
      data: this.state.dataSource._dataBlob.s1[rowID],
      userToken: this.state.userToken
    });
  },

  _handleScroll(e) {
    if (e.nativeEvent.contentOffset.y < -45) {
      console.log(('Seconds since last update and state ' + this.state.reloading + ' ' + ((Date.parse(new Date()) - this.state.lastSync))/1000));
      if ( this.state.reloading === true || (((Date.parse(new Date()) - this.state.lastSync))/1000 < 20) ) {
        return;
      } else {
        this.setState({
          reloading: true,
          lastSync: Date.parse(new Date())
        });
        this.refreshData();
        console.log('scrolling...');
      }
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          onScroll={this._handleScroll}
          renderRow={this._renderRow}
          renderHeader={this._renderHeader}
          />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01577A',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  listViewHeader: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#FF2B4B'
  },
  headerText: {
    color: 'white',
    fontSize: 18
  }
});

module.exports = MyPoints;
