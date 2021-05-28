import { useEffect, useState } from "react"
import { getHamster, getMatchBetween } from "../../globalFunctions/G-ApiRequest"
import { HamsterWithId } from "../../interfaces/hamster"
import DefaultButton from "../DefaultButton"
import HamsterCard from "./HamsterCard"
import './WinnerLoserStats.css'

interface Props {
	winnerId: string
	loserId: string
	closeStats: () => void
}

const WinnerLoserStats = ({winnerId, loserId, closeStats}:Props) => {
	const [winner, setWinner] = useState<HamsterWithId|any>()
	const [loser, setLoser] = useState<HamsterWithId|any>()
	const [matches, setMatches] = useState<any>()
useEffect(() => {
	if(winnerId && loserId) {
		getHamster(winnerId, setWinner)
		getHamster(loserId, setLoser)
		getMatchBetween(winnerId, loserId, setMatches)
	}
}, [winnerId, loserId])



	let JSX:JSX.Element;
	
	if (winner && loser && matches) {
		JSX = (
			<section className="winner-loser-stats-wrapper">
				<div className="winner-loser-stats">
					<div>
						<h3>WINNER</h3>
						<div className="matches-border">
							<HamsterCard hamster={winner} gameScore={true} />
						</div>
						<h2 className="matches-between-score">{matches.challengerWins}</h2>
					</div>
					<div className="matches-between">
						<h3>Games between</h3>
						<h2 className="matches-between-score none-border">{matches.challengerWins + matches.defenderWins}</h2>
					</div>
					<div>
						<h3>LOSER</h3>
						<div className="matches-border">
							<HamsterCard hamster={loser} gameScore={true} />
						</div>
						<h2 className="matches-between-score">{matches.defenderWins}</h2>
					</div>
				</div>
	
				<DefaultButton buttonText="Play again" clicked={closeStats} />
	
			</section>
		)
	}
	
	else JSX = (<section className="winner-loser-stats-wrapper"><h2>Loading...</h2></section>)
	return (
		<div>
			{JSX}
		</div>
	)
}

export default WinnerLoserStats;