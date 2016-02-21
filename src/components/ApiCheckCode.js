function postData(userEmail, code) {
	let source = 'http://192.168.2.104:3000/apicodecheck';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ qpInput: code, userEmail: userEmail })
	}).then((response) => {
		return response.json();
	});
}

export default function CheckCode(userEmail, code){
	return postData(userEmail, code)
}