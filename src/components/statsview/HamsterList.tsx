import { HamsterWithId } from "../../interfaces/hamster";

interface Props {
	hamsterList: HamsterWithId[]
}

const HamsterList = ({hamsterList}:Props) => {
	return (
		<h1>hamsterlist</h1>
	)
}

export default HamsterList;