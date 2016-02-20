function postData(userEmail, pw) {
	let source = 'http://localhost:3000/apicreateaccount';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: pw })
	}).then((response) => {
		return response.json();
	});
}

export default function createAccount(userEmail, pw){
	return postData(userEmail, pw)
}