import { useState } from "react";
import { HamsterWithId } from "../../interfaces/hamster";
import HamsterCard from "../battleview/HamsterCard";
import './HamsterList.css';

interface Props {
	hamsterList: null | HamsterWithId[]
}

const HamsterList = ({hamsterList}:Props) => {
	const [list, setList] = useState<null | JSX.Element[]>(null);
	const [overlay, setOverlay] = useState<JSX.Element>(<></>)

	function showHamster(hamster: HamsterWithId) {
		setOverlay(	
			<div className="overlay" onClick={() => setOverlay(<></>)}>
				<HamsterCard hamster={hamster} gameScore={true} />
			</div>
		)
	}

	if (hamsterList && !list) {
		setList(hamsterList.map((hamster, index) => (
			<li onClick={() => showHamster(hamster)} key={hamster.firestoreId}><p>{index + 1}. {hamster.name}</p></li>
		)))
	}

	return (
		<section className="hamster-list">
			<ul>
				{list}
			</ul>
			{overlay}
		</section>
	)
}

export default HamsterList;