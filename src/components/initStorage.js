import Storage from 'react-native-store';

const DB = {
	'user': Storage.model('user'),
	'userData': Storage.model('userData')
};

export function initStorage(){

	console.log('Init Storage');

	DB.user.find().then((response) => {
		console.log('this was found in Init');
		console.log(response);
	  if (!response) {
	  	console.log('User neu anlagen');
	    DB.user.add({
	      userEmail: 'kim.sora@web.de',
	      userPW: '1234',
	      userToken: '',
				userRole: '',
	      loggedIn: false,
	    });
	  }
	});

	DB.userData.find().then((response) => {
		console.log('this was find during Init');
		console.log(response);
	  if (!response) {
	  	console.log('userData neu anlegen');
	    DB.userData.add({
	      userGender: 1,
	      userPoints: '',
	      userMessages: [],
	      lastSync: ''
	    });
	  }
	});

	DB.userData.find().then((response) => {
		console.log(response);
	});
};