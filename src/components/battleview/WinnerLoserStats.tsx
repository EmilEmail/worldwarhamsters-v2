import { HamsterWithId } from "../../interfaces/hamster"
import DefaultButton from "../DefaultButton"
import HamsterCard from "./HamsterCard"
import './WinnerLoserStats.css'
import { useHistory } from "react-router-dom"

interface Props {
	winner:HamsterWithId,
	loser:HamsterWithId,
	closeStats: () => void
}

const WinnerLoserStats = ({winner, loser, closeStats}:Props) => {
	const history = useHistory()

	function reloadBattle() {
		// history.push('/battle');
		closeStats()
	}
	return (
		<section className="winner-loser-stats-wrapper">
			<div className="winner-loser-stats">
				<div>
					<h3>WINNER</h3>
					<HamsterCard hamster={winner} gameScore={true} />
					<h2>fixa</h2>
				</div>
				<div>
					<h3>Games between</h3>
					<h2>Fixa</h2>
				</div>
				<div>
					<h3>LOSER</h3>
					<HamsterCard hamster={loser} gameScore={true} />
					<h2>fixa</h2>
				</div>
				<DefaultButton buttonText="New Battle" clicked={reloadBattle} />
			</div>
		</section>
	)
}

export default WinnerLoserStats;