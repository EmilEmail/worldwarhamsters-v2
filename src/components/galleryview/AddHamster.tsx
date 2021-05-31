import { useState } from 'react'
import './AddHamster.css'

const AddHamster = () => {
	const [wrongName, setWrongName] = useState<null|string>();
	const [errorText, setErrorText] = useState<null|string>();
	const [characterCount, setCharacterCount] = useState<number>(0);
	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [loves, setLoves] = useState('');
	const [favFood, setFavFood] = useState('');
	const [imgSrc, setImgSrc] = useState('');

	function validateName(event:any) {
		let newName:string = event.target.value;
		let currentValue = name
		newName.split('').forEach(char => {
			let str = 'abcdefghijklmnopqrstuvwyz ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			if (str.split('').includes(char)) {
				newName = newName;
			}
			else newName = currentValue;
		});

		setName(newName);
		setWrongName(null)
		setErrorText(null)
		setCharacterCount(newName.length)
		if (newName.length < 3 || newName.length > 32) setWrongName('wrong-color');
		
	}

	function validateAge(event:any) {
		let num = event.target.value
		if (num > 9999 || Number(num) === NaN) return; ////Skriv ut något
		setAge(Math.floor(num));
	}

	function validateLoves(event:any) {
		const loves = event.target.value;
		if (loves.length > 32) return  ////Skriv ut något
		setLoves(loves);
	}
	function validateFavFood(event:any) {
		const value = event.target.value;
		if (value.length > 32) return  ////Skriv ut något
		setFavFood(value);
	}
	function validateImgSrc(event:any) {
		let value = event.target.value;
		setImgSrc(value);
	}


	return (
		<section className="add-hamster-overlay">
			<section className="add-hamster-form">
				<h2>Add New Hamster</h2>
				<label>
					<p>Name:</p>
					<input 
						onChange={validateName}
						value={name} 
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
						onChange={validateAge}
						value={age}
					/>
				</label>
				<label>Loves: 
					<input type="text" onChange={validateLoves} value={loves} />
				</label>
				<label>Favorite Food: 
					<input type="text" onChange={validateFavFood} value={favFood} />
				</label>
				<label>Image Source: 
					<input type="text" onChange={validateImgSrc} value={imgSrc} />
				</label>
				<button disabled={true} >Add new hamster</button>
			</section>
		</section>
	)
}

export default AddHamster;