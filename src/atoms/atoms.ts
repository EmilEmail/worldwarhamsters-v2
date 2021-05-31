import {atom} from 'recoil'

import {HamsterWithId} from '../interfaces/hamster'

const AllHamsters = atom({
	key: 'allHamsters',
	default: [{
		name: 'Test',
		age: 3,
		loves: 'testing',
		favFood: 'testing',
		imgName: 'hamster-1.jpg',
		wins: 3,
		defeats: 4,
		games: 7,
		firestoreId: 'testing...'
	},
	{
		name: 'Test',
		age: 3,
		loves: 'testing',
		favFood: 'testing',
		imgName: 'hamster-1.jpg',
		wins: 3,
		defeats: 4,
		games: 7,
		firestoreId: 'test..'
	}] as HamsterWithId[]
});
const Challenger = atom({
	key: 'challenger',
	default: {} as HamsterWithId
});
const Defender = atom({
	key: 'defender',
	default: {} as HamsterWithId
});

export {AllHamsters, Challenger, Defender} 