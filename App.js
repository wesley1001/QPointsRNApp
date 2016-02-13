'use strict';

import React, {
  Navigator
} from 'react-native';

import Routes from './src/components/Routes';

var App = React.createClass({

  render: function(route) {
    return (
      <Navigator
        initialRoute={{id: 'Login'}}
        renderScene={this.navigatorRenderScene}/>
    );
  },

  navigatorRenderScene: function(route, navigator){
    return (
      <Routes routeId={route.id} navigator={navigator} />
    );
  }

});

module.exports = App;