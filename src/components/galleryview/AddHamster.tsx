import { useState } from 'react'
import { postHamster } from '../../globalFunctions/G-ApiRequest'
import './AddHamster.css'

const AddHamster = () => {
	const [wrongName, setWrongName] = useState<null|string>();
	const [errorText, setErrorText] = useState<null|string>();
	const [characterCount, setCharacterCount] = useState<number>(0);
	const [hamster, setHamster] = useState({name: '', age: 0, loves: '', favFood: '', imgName: '', wins: 0, defeats: 0, games:0});
	function validateName(value:string) {
		let newHamster = hamster;
		let currentValue = hamster.name;
		newHamster.name = value;
		newHamster.name.split('').forEach(ch => {
			let str = 'abcdefghijklmnopqrstuvwyz ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			if (str.split('').includes(ch)) {
				newHamster.name = value;
			}
			else newHamster.name = currentValue
		});

		setHamster(newHamster);
		setWrongName(null)
		setErrorText(null)
		setCharacterCount(newHamster.name.length)
		if (newHamster.name.length < 3 || newHamster.name.length > 32) setWrongName('wrong-color');
		
	}
	function stringBlur(from: string) {
		if (hamster.name === '') {
			setWrongName('wrong-in-input')
			setErrorText('Please enter a name with 3-32 characters')
		}
		else if (hamster.name.length < 3) {
			setWrongName('wrong-in-input')
			setErrorText('Please enter a name with 3-32 characters')
		}
		else if (hamster.name.length > 32) {
			setWrongName('wrong-in-input')
			setErrorText('Please enter a name with 3-32 characters')
		}
	}

	function validateNumber(value:string) {
		let num = Number(value)
		let newHamster = hamster;
		hamster.age = num;
		setHamster(newHamster)
	}

	function addNewHamster() {
		postHamster(hamster);
	}

	return (
		<section className="add-hamster-form">
			<h2>Add New Hamster</h2>
			<label>
				<p>Name:</p>
				<input 
					className={wrongName === 'wrong-in-input' ? wrongName : ''} 
					type="text" onBlur={() => stringBlur('name')} 
					onChange={(e) => validateName(e.target.value)}
					value={hamster.name} 
				/>
				<div>
					<p className={wrongName === 'wrong-color' ? 'wrong-color' : ''}>
						{errorText} ({characterCount})
					</p>
				</div>
			</label>
			<label>Age: 
				<input
					type="number" 
					onChange={(e) => validateNumber(e.target.value)}
				/>
			</label>
			<label>Loves: 
				<input type="text" />
			</label>
			<label>Favorite Food: 
				<input type="text" />
			</label>
			<label>Image Source: 
				<input type="text" />
			</label>
			<button disabled={false} onClick={() => addNewHamster()} >Add new hamster</button>
		</section>
	)
}

export default AddHamster;