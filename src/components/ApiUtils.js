const serverHost = 'localhost';
// const serverHost = '172.20.10.2';

export function CheckCode(userEmail, code) {
	let source = 'http://' + serverHost + ':3000/apicodecheck';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ qpInput: code, userEmail: userEmail })
	}).then((response) => {
		return response.json();
	});
}

export function getUserData(userEmail, userPW) {
	let source = 'http://' + serverHost + ':3000/apicheckuser';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: userPW })
	}).then((response) => {
		return response.json();
	});
}

export function createAccount(userEmail, pw) {
	let source = 'http://' + serverHost + ':3000/apicreateaccount';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: pw })
	}).then((response) => {
		return response.json();
	});
}

export function getMessages(userEmail, pw) {
	let source = 'http://' + serverHost + ':3000/apinewsfeed';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: pw })
	}).then((response) => {
		return response.json();
	});
}

export function updateProfile(userEmail, currentPW, gender, newPW) {
	let source = 'http://' + serverHost + ':3000/apiupdateuser';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, passwordOld: currentPW, gender: gender, passwordNew: newPW })
	}).then((response) => {
		return response.json();
	});
}