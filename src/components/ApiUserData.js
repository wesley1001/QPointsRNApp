function getData(userEmail, userPW) {
	let source = 'http://localhost:3000/apicheckuser';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, password: userPW })
	}).then((response) => {
		return response.json();
	});
}

export default function getUserData(userEmail, userPW){
	return getData(userEmail, userPW)
}