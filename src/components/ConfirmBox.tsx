import { useEffect, useState } from 'react';
import './ConfirmBox.css'
import DefaultButton from './DefaultButton';
interface Props {
	text: string
	confirmDelete: (yes:boolean) => void
}

const ConfirmBox = ({text, confirmDelete}: Props) => {
	const [Text, setText] = useState('')
	const [JSX, setJSX] = useState(<></>)
	useEffect(()=> {
		switch (text) {
			case 'delete':
				setText('Are you sure you want to delete this hamster?')
				setJSX(<div><DefaultButton clicked={() => confirmDelete(true)} buttonText={'Yes'} />
				<DefaultButton clicked={() => confirmDelete(false)} buttonText={'No'} /></div>)
				break;
				
			case 'success':
				setText('You have now added a hamster')
				setTimeout(() => confirmDelete(true), 2000);
				
				break;
		}
	},[])

	return (
		<div className="confirm-box">
			<p>{Text}</p>
			<div>
				{JSX}
			</div>
		</div>
	)
}
export default ConfirmBox;