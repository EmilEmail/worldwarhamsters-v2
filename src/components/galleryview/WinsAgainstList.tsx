import { useEffect, useState } from "react";
import { getHamster } from "../../globalFunctions/G-ApiRequest";
import { HamsterWithId } from "../../interfaces/hamster";

interface Props {
	id: string
}
const LostAgainstList= ({id}:Props) => {
	const [hamster, setHamster] = useState<HamsterWithId>()

	useEffect(() => {
		getHamster(id, setHamster);
	}, [id]);

	return (
		<div>
			{hamster?.name}
		</div>
	)
}
export default LostAgainstList;