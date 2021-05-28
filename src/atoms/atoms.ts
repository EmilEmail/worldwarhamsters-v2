import {atom} from 'recoil'

import {HamsterWithId} from '../interfaces/hamster'

const AllHamsters = atom({
	key: 'allHamsters',
	default: [] as HamsterWithId[]
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