import {PropsButton} from '../interfaces/ButtonInterface'
import './DefaultButton.css'
const DefaultButton = ({clicked, buttonText}:PropsButton) => {
	return (
		<button className="default-btn" onClick={clicked}>
			{ buttonText }
		</button>
	)
}
export default DefaultButton;