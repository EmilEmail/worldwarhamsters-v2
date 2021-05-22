import {Hamster} from '../interfaces/hamster'

export const BASE_URL = 'http://localhost:1337/'


export async function GET(url:string) {
	const getUrl = BASE_URL + url;
	const response = await fetch(getUrl, {method: 'GET'});
	const data = await response.json();
	console.log(data)
}
export async function POST(url:string, obj:Hamster) {
	const getUrl = BASE_URL + url;
	console.log(JSON.stringify(obj))

	const response = await fetch(getUrl, {
	method: 'POST',
	body: JSON.stringify(obj),
    headers: {"Content-type": "application/json; charset=UTF-8"}
	});

	const data = await response.json();
	console.log(data)
}
export async function PUT(url:string, obj:object, id:string) {
	try {

		///FIXA
		const getUrl = BASE_URL + `${url}/${id}`
		const response = await fetch(getUrl, {
			method: 'PUT', 
			body: JSON.stringify(obj),
			headers: {"Content-type": "application/json; charset=UTF-8"}
		});
		const data = await response.json();
		console.log(data)
		
	} catch (error) {
		console.log(error)
	}
}
export async function DELETE(url:string, id:string) {
	const getUrl = BASE_URL + `${url}/${id}`;
	const response = await fetch(getUrl, {method: 'DELETE'});
	const data = await response.json();
	console.log(data)
}