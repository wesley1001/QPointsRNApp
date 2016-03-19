const serverHost = 'localhost';
// const serverHost = '192.168.2.104';

export function CheckCode(userEmail, code) {
	let source = 'http://' + serverHost + ':3000/api/v1/codecheck';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ qpInput: code, userEmail: userEmail })
	}).then((response) => {
		return response.json();
	});
}

export function loginUser(userEmail, userPW) {
	let source = 'http://' + serverHost + ':3000/api/v2/login'; // v1/checkuser
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ username: userEmail, password: userPW })
	}).then((response) => {
		return response.json();
	});
}

export function getUserData(token) {
	let source = 'http://' + serverHost + ':3000/api/v2/user';
	return fetch(source, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}).then((response) => {
		return response.json();
	});
}

export function createAccount(userEmail, pw) {
	let source = 'http://' + serverHost + ':3000/api/v2/user';
	return fetch(source, {
		method: 'PUT',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: pw })
	}).then((response) => {
		return response.json();
	});
}

export function getMessages(userEmail, pw) {
	let source = 'http://' + serverHost + ':3000/api/v1/newsfeed';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: pw })
	}).then((response) => {
		return response.json();
	});
}

export function updateProfile(gender, newPW, token) {
	let source = 'http://' + serverHost + ':3000/api/v2/user';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
		body: JSON.stringify({ gender: gender, passwordNew: newPW })
	}).then((response) => {
			let json = response.json();
		  if (response.status >= 200 && response.status < 300) {
		    return json;
		  } else {
		    return json.then(Promise.reject.bind(Promise));
		  }  
	});
}

export function redeemPoint(userEmail, programNr, programGoal) {
	let source = 'http://' + serverHost + ':3000/api/v1/coderedeem';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, programNr: programNr, programGoal: programGoal })
	}).then((response) => {
		return response.json();
	});
}