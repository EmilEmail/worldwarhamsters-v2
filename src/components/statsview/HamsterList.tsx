import { useState } from "react";
import { HamsterWithId } from "../../interfaces/hamster";
import './HamsterList.css';

interface Props {
	hamsterList: null | HamsterWithId[]
}

const HamsterList = ({hamsterList}:Props) => {
	const [list, setList] = useState<null | JSX.Element[]>(null);

	if (hamsterList && !list) {
		setList(hamsterList.map((hamster) => (
			<li>{hamster.name}</li>
		)))
	}

	return (
		<section className="hamster-list">
			<ul>
				{list}
			</ul>
		</section>
	)
}

export default HamsterList;