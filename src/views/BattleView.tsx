import './BattleView.css'
import HamsterCard from '../components/battleview/HamsterCard'
import {Defender, Challenger} from '../atoms/atoms'
import { useRecoilState } from 'recoil';
import { HamsterWithId } from '../interfaces/hamster';
import { POST, PUT } from '../globalFunctions/G-ApiRequest';
import { useState } from 'react';
import WinnerLoserStats from '../components/battleview/WinnerLoserStats'
const BattleView = () => {
	const [defender] = useRecoilState(Defender)
	const [challenger] = useRecoilState(Challenger)
	// const [haveWon, setHaveWon] = useState<null|HamsterWithId>(null);
	// const [loser, setLoser] = useState<null|HamsterWithId>(null);
	const [stats, setStats] = useState<null|JSX.Element>(null);

	function selectedWinner(winner:HamsterWithId, loser:HamsterWithId) {
		const winnerURL = `/hamsters/${winner.firestoreId}`
		const loserURL = `/hamsters/${loser.firestoreId}`
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

		setStats(
		<WinnerLoserStats closeStats={newBattle}  winner={winner} loser={loser} />
		)
		PUT(winnerURL, winnerToDb);
		PUT(loserURL, loserToDb);
		POST(`/matches`, match)

		// TODO: göra post till /matches
	}

function newBattle() {
	setStats(null)
	//start a new fight!
}


	return (
			<div className="battle-view">
				{stats}
				<h2 className="blinking-header">Click to choose the winner...</h2>
				<section className="battle-section">
					<div onClick={() => selectedWinner(defender, challenger)}>
						<HamsterCard hamster={defender} gameScore={false} />
					</div>
					<p>VS</p>
					<div onClick={() => selectedWinner(challenger, defender)}>
						<HamsterCard hamster={challenger} gameScore={false} />
					</div>
				</section>

				
			</div> 
	)
}
export default BattleView;