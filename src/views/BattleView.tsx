import './BattleView.css'
import HamsterCard from '../components/battleview/HamsterCard'
import {Defender, Challenger} from '../atoms/atoms'
import { useRecoilState } from 'recoil';
import { HamsterWithId } from '../interfaces/hamster';
import { POST, PUT } from '../globalFunctions/G-ApiRequest';
const BattleView = () => {
	const [defender] = useRecoilState(Defender)
	const [challenger] = useRecoilState(Challenger)

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

		PUT(winnerURL, winnerToDb);
		PUT(loserURL, loserToDb);
		POST(`/matches`, match)

		// TODO: göra post till /matches
	}


	return (
		<div className="battle-view">
			<h2 className="blinking-header">Click to choose the winner...</h2>
			<section className="battle-section">
				<div onClick={() => selectedWinner(defender, challenger)}>
					<HamsterCard hamster={defender} />
				</div>
				<p>VS</p>
				<div onClick={() => selectedWinner(challenger, defender)}>
					<HamsterCard hamster={challenger} />
				</div>
			</section>

		</div>
	)
}
export default BattleView;