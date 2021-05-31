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
	useEffect(() => {
		if(!hamsterWins) {
			const getMatches = async () => {
				await getMatchWinners(hamsterId, setHamsterWinsId)
			};
			getMatches();
		}
	}, [])

	// let AllMatchesInPages: MatchesWithId[][] = [];
	// let matchPage: MatchesWithId[] = [];


	// if (hamsterWins) {
	// 	hamsterWins.forEach((match: MatchesWithId) => {
	// 		matchPage.push(match)
	// 		if (matchPage.length > 3) {
	// 			AllMatchesInPages.push(matchPage);
	// 			matchPage = [];
	// 		}
	// 	});
	// 	if (matchPage.length > 0) {
	// 		AllMatchesInPages.push(matchPage);
	// 	}
	// }

	return (
		<section>
			{hamsterWins ? hamsterWins.map(match => (
				<div>
					<h2>Winner Against</h2>
					<LostAgainstList id={match.loserId} />
				</div>
			)) : null}

		</section>
	)
}

export default HamsterWins;