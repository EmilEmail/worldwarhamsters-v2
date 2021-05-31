import { useEffect, useState } from "react";
import {getAllMatches, getHamster} from '../globalFunctions/G-ApiRequest'
import { MatchesWithId } from "../interfaces/matches";

const HistoryView = () => {
	const [allMatches, setAllMatches] = useState<MatchesWithId[]>()
	let hamsters = [];
	useEffect(() => {
		const getAllMatchHamsters = async() => {
			await getAllMatches(setAllMatches)
		} 
		getAllMatchHamsters()
	}, [])
	return (
		<section className="history-view-wrapper">
			<h1>Fråga om history</h1>
			{!allMatches ? null:
				allMatches.map(match => (
					<div>
						{match.loserId}
						{match.winnerId}
					</div>
				))
			}
		</section>
	)
}

export default HistoryView;