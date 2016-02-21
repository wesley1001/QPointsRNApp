function getData(userEmail, pw) {
	let source = 'http://192.168.2.104:3000/apinewsfeed';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: pw })
	}).then((response) => {
		return response.json();
	});
}

export default function getMessages(userEmail, pw){
	return getData(userEmail, pw)
}