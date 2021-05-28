import { useEffect } from "react";
import { HamsterWinsId } from "../../interfaces/hamster";

interface Props {
	hamsterWinsId: HamsterWinsId[] | null
}
const HamsterWins = ({hamsterWinsId}:Props) => {
	let count = hamsterWinsId
	useEffect(() => {
		console.log(count)

	}, [])

	return (
		<section>
			{count}
		</section>
	)
}

export default HamsterWins;