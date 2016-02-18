function getData() {
	let source = 'http://localhost:3000/apinewsfeed';
	return fetch(source, {
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({ userEmail: 'kim.sora@web.de', password: '123' })
	}).then((response) => {
		return response.json();
	});
}

export default function getMessages(){
	return getData()
}
