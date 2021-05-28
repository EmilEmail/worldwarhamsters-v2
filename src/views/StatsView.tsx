import { useEffect, useState } from 'react';
import HamsterList from '../components/statsview/HamsterList'
import { getHamsterLosers, getHamsterWinners } from '../globalFunctions/G-ApiRequest';
import { HamsterWithId } from '../interfaces/hamster';
import './StatsView.css'
const StatsView = () => {
	const [mostWins, setMostWins] = useState<HamsterWithId[]|null>(null)
	const [mostDefeats, setMostDefeats] = useState<HamsterWithId[]|null>(null)
	useEffect(() => {
		getHamsterWinners(setMostWins);
		getHamsterLosers(setMostDefeats);
	}, [])

	return (
		<section className="stats-view-wrapper">
			<h2>TOP 5</h2>
			<div className="stats-list-wrapper">
				<HamsterList hamsterList={mostWins} />
				<HamsterList hamsterList={mostDefeats} />
			</div>
		</section>
	)
}
export default StatsView;