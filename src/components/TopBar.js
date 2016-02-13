'use strict';

var React = require('react-native');

var {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var toolbarActions = [
  {title: 'Profile', icon: require('image!profile'), show: 'always'},
];

var topBar = React.createClass({

	propTypes: {
	  nav: React.PropTypes.object.isRequired,
	  displBackIcon: React.PropTypes.bool.isRequired,
	},

  _onProfileClick: function(){
    this.props.nav.push({id: 'Profile'});
  },

  _onBackClicked: function(){
    this.props.nav.pop();
  },

  render: function() {
    let _navIcon = this.props.displBackIcon ? require('../assets/images/lefticon.png') : require('../assets/images/transparent.png');
    let _profIcon = this.props.displProfile ? require('../assets/images/profile.png') : require('../assets/images/transparent.png');
    return (
    	<View style={styles.toolbar}>
        <View style={styles.toolbarHeader}></View>
        <View style={styles.toolbarRow}>
          <TouchableOpacity style={styles.toolbarLeft} onPress={this._onBackClicked}>
            <Image
              style={styles.actionImage}
              source={_navIcon} />
          </TouchableOpacity>
          <View style={styles.toolbarInBetween}></View>
          <View style={styles.toolbarCenter}>
            <Image
              style={styles.brandImage}
              source={require('../assets/images/qpoints_brand_100.png')} />
          </View>
          <View style={styles.toolbarInBetween}></View>
          <TouchableOpacity style={styles.toolbarRight} onPress={this._onProfileClick}>
            <Image
              style={styles.profileImage}
              source={_profIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
	toolbar: {
    flexDirection:'column',
    backgroundColor: '#01577A',
    height: 75,
  },
  toolbarHeader: {
    flex: 1
  },
  toolbarRow: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolbarLeft: {
    flex: 1,
    alignItems: 'center'
  },
  toolbarCenter: {
    flex: 4,
    alignItems: 'center'
  },
  toolbarRight: {
    flex: 1,
    alignItems: 'center'
  },
  toolbarInBetween: {
    flex: 2
  }
});

module.exports = topBar;