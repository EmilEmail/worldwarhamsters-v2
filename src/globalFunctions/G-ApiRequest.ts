import {Hamster} from '../interfaces/hamster'
import { Matches } from '../interfaces/matches';

export async function GET(url:string, setToState:(data:any)=>void) {
	try {
		const response = await fetch(url, {method: 'GET'});
		const data = await response.json();
		setToState(data);
		console.log('data from api :', data);
		
	} catch (error) {setToState(null)}
}

export async function POST(url:string, obj:Hamster|Matches) {

	const response = await fetch(url, {
	method: 'POST',
	body: JSON.stringify(obj),
    headers: {"Content-type": "application/json; charset=UTF-8"}
	});

	const data = await response.json();
	console.log(data)
}

export async function PUT(url:string, obj:object) {
	try {
		const response = await fetch(url, {
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
	const response = await fetch(url, {method: 'DELETE'});
	const data = await response.json();
	console.log(data)
}