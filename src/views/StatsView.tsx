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
			<h2 className="top5">TOP 5</h2>
			<div className="stats-list-wrapper">
				<div>
					<h3 className="topwins">Most wins</h3>
					<HamsterList hamsterList={mostWins} />
				</div>
				<div>
					<h3 className="topwins">Most Defeats</h3>
					<HamsterList hamsterList={mostDefeats} />
				</div>
			</div>
		</section>
	)
}
export default StatsView;