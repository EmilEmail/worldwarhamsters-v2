import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { AllHamsters } from '../../atoms/atoms';
import { getAllHamsters, postHamster } from '../../globalFunctions/G-ApiRequest';
import ConfirmBox from '../ConfirmBox';
import DefaultButton from '../DefaultButton';
import './AddHamster.css'
interface Props {
	setAddHamster: () => void
}
const AddHamster = ({setAddHamster}:Props) => {
	const [hamsters, setHamsters] = useRecoilState(AllHamsters);

	const [confirmBox, setConfirmBox] = useState(<></>);

	const [name, setName] = useState('');
	const [age, setAge] = useState(0);
	const [loves, setLoves] = useState('');
	const [favFood, setFavFood] = useState('');
	const [imgName, setImgName] = useState('');

	const [nameError, setNameError] = useState<string>('');
	const [ageError, setAgeError] = useState<string>('');
	const [lovesError, setLovesError] = useState<string>('');
	const [favFoodError, setFavFoodError] = useState<string>('');
	const [imgNameError, setImgNameError] = useState<string>('');

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
		setNameError('')
		setName(value);
		let isOkej = validateString(value);
		if (isOkej) {
			setIsValidName(true)
			return;
		}
		setIsValidName(false)
	}
	function blurName() {
		if (!isValidName) setNameError('Please enter 3-16 characters');
	}
	function blurAge() {
		if (!isValidAge) setAgeError('Please enter a number between 1-100');
	}
	function blurLoves() {
		if (!isValidLoves) setLovesError('Please enter 3-16 characters');
	}
	function blurFavFood() {
		if (!isValidFavFood) setFavFoodError('Please enter 3-16 characters');
	}
	function blurImgName() {
		if (!isValidImgName) setImgNameError('Please enter 3-16 characters');
	}

	function validateAge(e:any) {
		let value = e.target.value;
		setAgeError('');
		setAge(value);
		let isOkej = validateNumber(value)
		if (isOkej) {
			setIsValidAge(true)
			return;
		}
		setIsValidAge(false)
	}
	function validateLoves(e:any) {
		let value = e.target.value;
		setLovesError('');
		setLoves(value);
		let isOkej = validateString(value);
		if (isOkej) {
			setIsValidLoves(true)
		}
	}
	function validateFavFood(e:any) {
		let value = e.target.value;
		setFavFoodError('');
		setFavFood(value);
		let isOkej = validateString(value);
		if (isOkej) {
			setIsValidFavFood(true)
		}
	}
	function validateImgName(e:any) {
		let value = e.target.value;
		setImgName(value);
		setImgNameError('');
		if (value.length < 100 ||value.length > 3) {
			setIsValidImgName(true)
			return
		}
		setIsValidImgName(false)
	}

	if (isValidAge && isValidFavFood && isValidImgName && isValidName && isValidLoves) {
		if(isValidForm) {
			setIsValidForm(false);
		}
	}

	function confirm(yes:boolean) {
		if (yes) {
			setAddHamster(); 
		} 
		else setAddHamster();
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
		setIsValidForm(false)
		await postHamster(hamster);
		await getAllHamsters(setHamsters);
		setConfirmBox(<ConfirmBox text={'success'} confirmDelete={confirm} />)	
	}


	return (
		<section className="add-hamster-overlay">
			{confirmBox}
			<DefaultButton clicked={setAddHamster} buttonText="Close" />
			<section className="add-hamster-form">
				<h2>Add New Hamster</h2>
				<label>
					<p>Name:</p>
					<input 
						onChange={validateName}
						onBlur={blurName}
						value={name}
					/>
					<div>
						<p className="error-msg">
							{nameError}
						</p>
					</div>
				</label>
				<label>Age: 
					<input
						type="number" 
						onChange={validateAge}
						value={age}
						onBlur={blurAge}
					/>
					<div>
						<p className="error-msg">
							{ageError}
						</p>
					</div>
				</label>
				<label>Loves: 
					<input type="text" value={loves} onChange={validateLoves} onBlur={blurLoves} />
					<div>
						<p className="error-msg">
							{lovesError}
						</p>
					</div>
				</label>
				<label>Favorite Food: 
					<input type="text" value={favFood} onChange={validateFavFood} onBlur={blurFavFood} />
					<div>
						<p className="error-msg">
							{favFoodError}
						</p>
					</div>
				</label>
				<label>Image Source: 
					<input type="text" value={imgName} onChange={validateImgName} onBlur={blurImgName} />
					<div>
						<p className="error-msg">
							{imgNameError}
						</p>
					</div>
				</label>
				<button disabled={isValidForm} onFocus={() => setIsValidForm(false)} onClick={addHamster}>Add new hamster</button>
			</section>

			
		</section>
	)
}

export default AddHamster;