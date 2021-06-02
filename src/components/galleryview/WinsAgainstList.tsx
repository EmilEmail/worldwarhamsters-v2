import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AllHamsters } from "../../atoms/atoms";
import { HamsterWithId } from "../../interfaces/hamster";

interface Props {
	id: string
}
const LostAgainstList= ({id}:Props) => {
	const [hamsters] = useRecoilState(AllHamsters);
	const [hamster, setHamster] = useState<HamsterWithId>();

	useEffect(() => {
		setHamster(hamsters.find(hamster => hamster.firestoreId === id));
	}, [id,hamsters]);

	return (
		<div>
			{hamster?.name}
		</div>
	)
}
export default LostAgainstList;