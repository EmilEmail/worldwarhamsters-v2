import { useEffect, useState } from 'react';
import HamsterList from '../components/statsview/HamsterList'
import { GET } from '../globalFunctions/G-ApiRequest';
import { HamsterWithId } from '../interfaces/hamster';
const StatsView = () => {
	const [mostWins, setMostWins] = useState<null|HamsterWithId[]>(null)
	const [mostDefeats, setMostDefeats] = useState<null|HamsterWithId[]>(null)
	useEffect(() => {
		GET('/winners', setMostWins);
		GET('/losers', setMostDefeats);
	}, [])

	return (
		<section className="stats-view-wrapper">
			<h2>TOP 5</h2>
			<HamsterList hamsterList={mostWins} />
			<HamsterList hamsterList={mostDefeats} />
		</section>
	)
}
export default StatsView;