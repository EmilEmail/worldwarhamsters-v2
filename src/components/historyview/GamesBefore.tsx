import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AllHamsters } from "../../atoms/atoms";
import { HamsterWithId } from "../../interfaces/hamster";
import HamsterCard from "../battleview/HamsterCard";
import './GamesBefore.css'

interface Props {
	loserId: string
	winnerId: string
}

const GamesBefore = ({winnerId, loserId}:Props) => {
	const [allHamsters] = useRecoilState(AllHamsters)
	const [winner, setWinner] = useState<HamsterWithId>()
	const [loser, setLoser] = useState<HamsterWithId>()
	let JSX = (<p>One or more of the hamsters doesn't exist any more...</p>);
	useEffect(()=> {
		setWinner(
			allHamsters.find(hamster => hamster.firestoreId === winnerId)
		);
		setLoser(
			allHamsters.find(hamster => hamster.firestoreId === loserId)
		)
		
	},[winnerId, loserId, allHamsters])


	if (winner && loser) {
		JSX = (
			<section className="games-before">
				<div>
					<h2>Winner</h2>
					<HamsterCard gameScore={true} hamster={winner} />
				</div>
				<div>
					<h2>Loser</h2>
					<HamsterCard gameScore={true} hamster={loser} />
				</div>
			</section>
		)
	}
	return(
		<section>
			{JSX}
		</section>
	)
}
export default GamesBefore;