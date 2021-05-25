import React, { useState } from 'react'
import './AddHamster.css'

const AddHamster = () => {
	const [wrongName, setWrongName] = useState<null|string>()
	const [errorText, setErrorText] = useState<null|string>()
	let newHamster = {name: '', age: 0, loves: '', favFood: '', imgName: '', wins: 0, defeats: 0, games:0}

	function changeName(e:string) {
		newHamster.name = e;
	}
	function nameBlur() {
		if (newHamster.name === '') {
			setWrongName('wrong-in-input')
			setErrorText('Please enter a name with 3-16 characters')
		}
		else if (newHamster.name.length < 3) {

		}
	}

	function changeAge(e:string) {
		let num = Number(e)
		newHamster.age = num;
	}
	function changeLoves(e:string) {
		newHamster.loves = e;
	}
	function changeFavFood(e:string) {
		newHamster.favFood = e;
	}
	function changeImgName(e:string) {
		newHamster.imgName = e;
	}

	function AddNewHamster() {
		console.log(newHamster)
	}
	return (
		<section className="add-hamster-form">
			<h2>Add New Hamster</h2>
			<label>
				<p>Name:</p>
				<input className={wrongName ? wrongName : ''} type="text" onBlur={nameBlur} onChange={(e) => changeName(e.target.value)} />
				<span>{errorText}</span>
			</label>
			<label>Age: 
				<input type="number" onChange={(e) => changeAge(e.target.value)} />
			</label>
			<label>Loves: 
				<input type="text" onChange={(e) => changeLoves(e.target.value)} />
			</label>
			<label>Favorite Food: 
				<input type="text" onChange={(e) => changeFavFood(e.target.value)} />
			</label>
			<label>Image Source: 
				<input type="text" onChange={(e) => changeImgName(e.target.value)} />
			</label>
			<button onClick={AddNewHamster} >Add new hamster</button>
		</section>
	)
}

export default AddHamster;