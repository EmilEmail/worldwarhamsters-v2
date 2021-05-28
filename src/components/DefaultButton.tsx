import './DefaultButton.css'

interface PropsButton {
	buttonText:string
	clicked: () => void
}

const DefaultButton = ({clicked, buttonText}:PropsButton) => {
	return (
		<button className="default-btn" onClick={clicked}>
			{ buttonText }
		</button>
	)
}
export default DefaultButton;