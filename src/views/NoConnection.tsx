import { useRecoilState } from "recoil";
import { AllHamsters } from "../atoms/atoms";
import DefaultButton from "../components/DefaultButton";
import { getAllHamsters } from "../globalFunctions/G-ApiRequest";

const NoConnection = () => {
	const [hamsters, setHamsters] = useRecoilState(AllHamsters);
	function refresh() {
		getAllHamsters(setHamsters);
	}
	return (

		<section className="no-connection">
			<h2>no connection to server!</h2>
			<DefaultButton clicked={refresh} buttonText="Refresh"></DefaultButton>
		</section>
	)
	
}
export default NoConnection;