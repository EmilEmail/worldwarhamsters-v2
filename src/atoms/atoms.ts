import {atom} from 'recoil'

import {HamsterWithId} from '../interfaces/hamster'

const AllHamsters = atom({
	key: 'allHamsters',
	default: <HamsterWithId[]>[]
});
const Challenger = atom({
	key: 'challenger',
	default: <HamsterWithId>{}
});
const Defender = atom({
	key: 'defender',
	default: <HamsterWithId>{}
});

export {AllHamsters, Challenger, Defender} 