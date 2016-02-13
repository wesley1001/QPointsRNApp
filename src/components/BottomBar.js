'use strict';

var React = require('react-native');

var {
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var BottomBar = React.createClass({

  propTypes: {
    nav: React.PropTypes.object.isRequired,
    currentPage: React.PropTypes.string.isRequired,
  },

  _onPressBar1: function(){
    if (this.props.currentPage !='MyPoints'){
      this.props.nav.replace({
        id: 'MyPoints',
        sceneConfig: Navigator.SceneConfigs.FloatFromLeft,
      });
    }
  },

  _onPressBar2: function(){
    if (this.props.currentPage !='Scan'){
      this.props.nav.replace({
        id: 'Scan',
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      });
    }
  },

  _onPressBar3: function(){
    if (this.props.currentPage !='Messages'){
      this.props.nav.replace({
        id: 'Messages',
        sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      });
    }
  },

  render: function() {
    return (
      <View style={styles.navBar} >
	      <TouchableOpacity style={styles.navElement} onPress={this._onPressBar1}>
	      	<View style={styles.navImageView}>
            <Image
              style={this.props.currentPage==='MyPoints' ? styles.iconSelected : styles.icons}
  	      	  source={require('../assets/images/listicon.png')} />
          </View>
	      	<Text style={this.props.currentPage==='MyPoints' ? [styles.navText, styles.navTextSelected] : styles.navText}>QPoints</Text>
	      </TouchableOpacity>
	      <TouchableOpacity style={styles.navElement} onPress={this._onPressBar2}>
          <View style={styles.navImageView}>
            <Image
              style={this.props.currentPage==='Scan' ? styles.iconSelected : styles.icons}
              source={require('../assets/images/searchicon.png')} />
          </View>
	      	<Text style={this.props.currentPage==='Scan' ? [styles.navText, styles.navTextSelected] : styles.navText}>Scan</Text>
	      </TouchableOpacity>
	      <TouchableOpacity style={styles.navElement} onPress={this._onPressBar3}>
          <View style={styles.navImageView}>
            <Image
              style={this.props.currentPage==='Messages' ? styles.iconSelected : styles.icons}
              source={require('../assets/images/messageicon.png')} />
          </View>
	      	<Text style={this.props.currentPage==='Messages' ? [styles.navText, styles.navTextSelected] : styles.navText}>News</Text>
	      </TouchableOpacity>
	    </View>
    );
  }
});

var styles = StyleSheet.create({
  iconSelected:{
    tintColor: '#9DC02E',
     borderRadius: 1
  },
  navBar:{
    flexDirection: 'row',
    backgroundColor: '#01577A',
    height: 60,
    padding: 2,
  },
  navElement:{
  	flex: 1,
  },
  navText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
  },
  navTextSelected:{
    color: '#9DC02E',
  },
  navImageView:{
    height:35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = BottomBar;
