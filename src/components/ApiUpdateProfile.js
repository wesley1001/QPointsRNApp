function postData(userEmail, currentPW, gender, newPW) {
	let source = 'http://localhost:3000/apiupdateuser';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: userEmail, passwordOld: currentPW, gender: gender, passwordNew: newPW })
	}).then((response) => {
		return response.json();
	});
}

export default function updateProfile(userEmail, currentPW, gender, newPW){
	return postData(userEmail, currentPW, gender, newPW)
}