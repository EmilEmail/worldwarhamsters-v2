import './BattleView.css'
import HamsterCard from '../components/battleview/HamsterCard'
import {Defender, Challenger, AllHamsters} from '../atoms/atoms'
import { useRecoilState } from 'recoil';
import { HamsterWithId } from '../interfaces/hamster';
import { getAllHamsters, getRandomHamsters, postMatch, putHamster } from '../globalFunctions/G-ApiRequest';
import { useEffect, useState } from 'react';
import WinnerLoserStats from '../components/battleview/WinnerLoserStats'
import DefaultButton from '../components/DefaultButton';
const BattleView = () => {
	const [defender, setDefender] = useRecoilState(Defender)
	const [challenger, setChallenger] = useRecoilState(Challenger)
	const [hamsters, setHamsters] = useRecoilState(AllHamsters)
	const [stats, setStats] = useState<null|JSX.Element>(null);

	useEffect(() => {
		getRandomHamsters(setDefender);
		getRandomHamsters(setChallenger);
	},[setDefender, setChallenger])
	if (challenger.firestoreId === defender.firestoreId) {
		getRandomHamsters(setChallenger);
	}

	async function selectedWinner(winner:HamsterWithId, loser:HamsterWithId) {

		const winnerToDb = {
			wins: winner.wins + 1,
			games: winner.games + 1	
		}
		const loserToDb = {
			defeats: loser.defeats + 1,
			games: loser.games + 1	
		}
		const match = {
			winnerId: winner.firestoreId,
			loserId: loser.firestoreId
		}
		setStats(<div className="loadbar"><h2>...</h2></div>)
		await Promise.all([
			putHamster(winner.firestoreId, winnerToDb),
			putHamster(loser.firestoreId, loserToDb),
			postMatch(match),
			getAllHamsters(setHamsters)
		])
		setStats(
			<WinnerLoserStats closeStats={newBattle} winnerId={winner.firestoreId} loserId={loser.firestoreId} />
		)
	}

function newBattle() {
	setStats(null)
	getRandomHamsters(setChallenger);
	getRandomHamsters(setDefender);
}


	return (
			<div className="battle-view">
				{stats}
		
				<section className="battle-section">
					<div className="battle-div">
						<HamsterCard hamster={defender} gameScore={false} />
						<DefaultButton clicked={() => selectedWinner(defender, challenger)} buttonText="Pick winner" />
					</div>
					<h2>VS</h2>
					<div className="battle-div" >
						<HamsterCard hamster={challenger} gameScore={false} />
						<DefaultButton clicked={() => selectedWinner(challenger, defender)} buttonText="Pick winner" />
					</div>
				</section>
			</div> 
	)
}
export default BattleView;