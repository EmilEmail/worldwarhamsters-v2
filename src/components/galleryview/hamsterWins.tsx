import { useEffect, useState } from "react";
import { HamsterWinsId } from "../../interfaces/hamster";
import {getMatchWinners} from '../../globalFunctions/G-ApiRequest'
import LostAgainstList from "./WinsAgainstList";
import { MatchesWithId } from "../../interfaces/matches";
import './HamsterWins.css'

interface Props {
	hamsterId: string
}
const HamsterWins = ({hamsterId}:Props) => {
	const [hamsterWins, setHamsterWinsId] = useState<HamsterWinsId[]|undefined>()
	const [page, setPage] = useState(0)
	useEffect(() => {
		if(!hamsterWins) {
			const getMatches = async () => {
				await getMatchWinners(hamsterId, setHamsterWinsId)
			};
			getMatches();
		}
	}, [hamsterId, hamsterWins])
	

	let AllMatchesInPages: MatchesWithId[][] = [];
	let matchPage: MatchesWithId[] = [];


	if (hamsterWins) {
		hamsterWins.forEach((match: MatchesWithId) => {
			matchPage.push(match)
			if (matchPage.length > 0) {
				AllMatchesInPages.push(matchPage);
				matchPage = [];
			}
		});
		if (matchPage.length > 0) {
			AllMatchesInPages.push(matchPage);
		}
	}
	function paginate(num:number) {
		if ((num + 1) > AllMatchesInPages.length) return;
		if (num < 0) return;
		setPage(num)
	}

	return (
		<section>
			<h2>Winner Against</h2>
			{AllMatchesInPages.length > 0 ? AllMatchesInPages[page].map(match => (
				<div key={match.firestoreId} className="paginate-hamsterwins">
					<LostAgainstList id={match.loserId} />
				</div>
			)) : null}
			{AllMatchesInPages.length < 2 ? null :
				<div className="paginate-hamsterwins">
					<button onClick={()=>paginate(page - 1)}>&larr;</button> 
					{page + 1} / {AllMatchesInPages.length}
					<button onClick={()=>paginate(page + 1)}>&rarr;</button>
				</div>
			}
		</section>
	)
}

export default HamsterWins;