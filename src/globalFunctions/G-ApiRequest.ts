import {Hamster, HamsterWinsId, HamsterWithId} from '../interfaces/hamster'
import { Matches, MatchesWithId } from '../interfaces/matches';

export async function getAllHamsters(setToState:(data:any)=>void) {
	const url = '/hamsters'
	try {
		const response = await fetch(url, {method: 'GET'});
		const data = await response.json();
		setToState(data);
		
	} catch (error) {setToState(null)}
}

export async function getHamsterWinners(setToState:(data:any)=>void) {
	const url = '/winners'
	try {
		const response = await fetch(url, {method: 'GET'});
		const data = await response.json();
		setToState(data);
		
	} catch (error) {setToState(null)}
}

export async function getHamsterLosers(setToState:(data:any)=>void) {
	const url = '/losers'
	try {
		const response = await fetch(url, {method: 'GET'});
		const data = await response.json();
		setToState(data);
		
	} catch (error) {setToState(null)}
}

export async function getRandomHamsters(setToState:(data:any)=>void) {
	const url = '/hamsters/random'
	try {
		const response = await fetch(url, {method: 'GET'});
		const data: HamsterWithId = await response.json();
		setToState(data);

	} catch (error) {setToState(null)}
}

export async function getHamster(id:string, setToState:(data:any)=>void) {
	const url = `/hamsters/${id}`;
	try {
		const response = await fetch(url, {method: 'GET'});
		const data: HamsterWithId = await response.json();
		setToState(data);

	} catch (error) {setToState(null)}
}
export async function getAllMatches(setToState:(data:any)=>void) {
	const url = `/matches`;
	try {
		const response = await fetch(url, {method: 'GET'});
		const data: HamsterWithId = await response.json();
		setToState(data);

	} catch (error) {setToState(null)}
}

export async function getMatchBetween(id1:string, id2:string, setToState:(data:any)=>void) {
	const url = ` /score/${id1}/${id2}`;
	try {
		const response = await fetch(url, {method: 'GET'});
		const data: MatchesWithId = await response.json();
		setToState(data);

	} catch (error) {setToState(null)}
}

export async function getMatchWinners(id:string, setToState:(data:any)=>void) {
	const url = `/matchwinners/${id}`;
	try {
		const response = await fetch(url, {method: 'GET'});
		const data: HamsterWinsId[] = await response.json();
		setToState(data);
		console.log(data);

	} catch (error) {setToState(null)}
}


export async function postHamster(obj:Hamster) {
	const url = `/hamsters`;
	const response = await fetch(url, {
	method: 'POST',
	body: JSON.stringify(obj),
    headers: {"Content-type": "application/json; charset=UTF-8"}
	});

	const data = await response.json();
	console.log(data)
}
export async function postMatch(obj:Matches) {
	const url = `/matches`;
	const response = await fetch(url, {
	method: 'POST',
	body: JSON.stringify(obj),
    headers: {"Content-type": "application/json; charset=UTF-8"}	
	});

	const data = await response.text();
	console.log(data);
}

export async function putHamster(id:string, obj:object) {
	const url = `/hamsters/${id}`;
	try {
		const response = await fetch(url, {
			method: 'PUT', 
			body: JSON.stringify(obj),
			headers: {"Content-type": "application/json; charset=UTF-8"}
		});
		const data = await response.text();
		console.log(data)
		
	} catch (error) {
		console.log(error)
	}
}

export async function deleteHamsterById(id:string) {
	const url = `/hamsters/${id}`;
	const response = await fetch(url, {method: 'DELETE'});
	const data = await response.text();
	console.log(data)
}
export async function deleteMatchById(id:string) {
	const url = `/matches/${id}`;
	const response = await fetch(url, {method: 'DELETE'});
	const data = await response.text();
	console.log(data)
}