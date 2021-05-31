import { useEffect, useState } from "react";
import { HamsterWinsId } from "../../interfaces/hamster";
import {getMatchWinners} from '../../globalFunctions/G-ApiRequest'
import LostAgainstList from "./WinsAgainstList";
import { MatchesWithId } from "../../interfaces/matches";

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
				console.log(hamsterWins)
			};
			getMatches();
		}
	}, [])
	

	let AllMatchesInPages: MatchesWithId[][] = [];
	let matchPage: MatchesWithId[] = [];


	if (hamsterWins) {
		hamsterWins.forEach((match: MatchesWithId) => {
			matchPage.push(match)
			if (matchPage.length > 3) {
				AllMatchesInPages.push(matchPage);
				matchPage = [];
			}
		});
		if (matchPage.length > 0) {
			AllMatchesInPages.push(matchPage);
		}
	}

	return (
		<section>
			<h2>Winner Against</h2>
			{AllMatchesInPages.length > 0 ? AllMatchesInPages[page].map(match => (
				<div>
					<LostAgainstList id={match.loserId} />
				</div>
			)) : null}
			{AllMatchesInPages.length < 2 ? null :
			<div><button>prev</button> {page + 1} / {AllMatchesInPages.length - 1} <button>next</button></div>
			}
		</section>
	)
}

export default HamsterWins;