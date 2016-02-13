import React, {View} from 'react-native';
import BottomBar from './BottomBar';
import TopBar from './TopBar';

import Login from '../views/Login';
import Register from '../views/Register';
import MyPoints from '../views/MyPoints';
import Scan from '../views/Scan';
import Messages from '../views/Messages';
import Program from '../views/Program';
import Redeem from '../views/Redeem';
import Message from '../views/Message';
import Profile from '../views/Profile';

export default function (props){
	switch (props.routeId){
    case 'Login':
      return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={false} displBackIcon={false} />
          <Login navigator={props.navigator} />
        </View>
      );
    case 'MyPoints':
      return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={true} displBackIcon={false} />
          <MyPoints navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    case 'Register':
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={false} displBackIcon={true} />
          <Register navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    case 'Scan':
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={true} displBackIcon={false} />
          <Scan navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    case 'Messages':
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={true} displBackIcon={false} />
          <Messages navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    case 'Program':
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={true} displBackIcon={true} />
          <Program navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    case 'Redeem':
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={true} displBackIcon={true} />
          <Redeem navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    case 'Message':
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={true} displBackIcon={true} />
          <Message navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    case 'Profile':
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={false} displBackIcon={true} />
          <Profile navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
    default:
    	return (
        <View style={{flex: 1}}>
          <TopBar nav={props.navigator} displProfile={false} displBackIcon={false} />
          <Login navigator={props.navigator} />
          <BottomBar nav={props.navigator} currentPage={props.routeId} />
        </View>
      );
  };
}