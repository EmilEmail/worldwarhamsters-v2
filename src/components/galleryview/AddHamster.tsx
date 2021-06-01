import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { AllHamsters } from '../../atoms/atoms';
import { getAllHamsters, postHamster } from '../../globalFunctions/G-ApiRequest';
import DefaultButton from '../DefaultButton';
import './AddHamster.css'
interface Props {
	setAddHamster: () => void
}
const AddHamster = ({setAddHamster}:Props) => {
	const [hamsters, setHamsters] = useRecoilState(AllHamsters);

	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [loves, setLoves] = useState('');
	const [favFood, setFavFood] = useState('');
	const [imgName, setImgName] = useState('');

	const [isValidName, setIsValidName] = useState(false);
	const [isValidAge, setIsValidAge] = useState(false);
	const [isValidLoves, setIsValidLoves] = useState(false);
	const [isValidFavFood, setIsValidFavFood] = useState(false);
	const [isValidImgName, setIsValidImgName] = useState(false);
	const [isValidForm, setIsValidForm] = useState(true);

	function validateString(input:string) {
		if (input.length > 32) return false;
		if (input.length < 3) return false;
		return true;
	}
	function validateNumber(input:number) {
		if (input > 100 || input < 0) return false;
		return true;
	}

	function validateName(e:any) {
		let value = e.target.value;
		setName(value);
		let isOkej = validateString(value);
		if (isOkej) {
			setIsValidName(true)
		}
	}
	function validateAge(e:any) {
		let value = e.target.value;
		setAge(value);
		let isOkej = validateNumber(value)
		if (isOkej) {
			setIsValidAge(true)
		}
	}
	function validateLoves(e:any) {
		let value = e.target.value;
		setLoves(value);
		let isOkej = validateString(value);
		if (isOkej) {
			setIsValidLoves(true)
		}
	}
	function validateFavFood(e:any) {
		let value = e.target.value;
		setFavFood(value);
		let isOkej = validateString(value);
		if (isOkej) {
			setIsValidFavFood(true)
		}
	}
	function validateImgName(e:any) {
		let value = e.target.value;
		setImgName(value);
		let isOkej = validateString(value);
		if (isOkej) {
			setIsValidImgName(true)
		}
	}

	if (isValidAge && isValidFavFood && isValidImgName && isValidName && isValidLoves) {
		if(isValidForm) {
			setIsValidForm(false);
		}
	}

	async function addHamster() {
		let hamster = {
			name: name,
			age: Number(age),
			favFood: favFood,
			loves: loves,
			wins: 0,
			imgName: imgName,
			defeats: 0,
			games: 0
		}
		await postHamster(hamster);
		await getAllHamsters(setHamsters);
		setAddHamster();
	}


	return (
		<section className="add-hamster-overlay">
			<DefaultButton clicked={setAddHamster} buttonText="Close" />
			<section className="add-hamster-form">
				<h2>Add New Hamster</h2>
				<label>
					<p>Name:</p>
					<input 
						onChange={validateName}
						value={name}
					/>
					<div>
						<p>
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
					<input type="text" value={loves} onChange={validateLoves} />
				</label>
				<label>Favorite Food: 
					<input type="text" value={favFood} onChange={validateFavFood} />
				</label>
				<label>Image Source: 
					<input type="text" value={imgName} onChange={validateImgName} />
				</label>
				<button disabled={isValidForm} onClick={addHamster}>Add new hamster</button>
			</section>

			
		</section>
	)
}

export default AddHamster;