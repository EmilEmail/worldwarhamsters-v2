import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import StartPage from './views/StartPage';
import MainView from './views/MainView'
import {GET} from './globalFunctions/G-ApiRequest'
import {useRecoilState} from 'recoil'
import {AllHamsters, Defender, Challenger} from './atoms/atoms'

function App() {
	const [test, setTest] = useState<null|JSX.Element>(null);
	const [testOn, setTestOn] = useState<boolean>(false);

	//FLYTTA UT
	const [hamsters, setHamsters] = useRecoilState(AllHamsters);
	const [challenger, setChallenger] = useRecoilState(Challenger);
	const [defender, setDefender] = useRecoilState(Defender);

	useEffect(() => {
		GET('/hamsters', setHamsters);
		GET('/hamsters/random', setChallenger);
		GET('/hamsters/random', setDefender);
		console.log('GET request gjort!');
	}, [])



	function firstStart() {
		localStorage.setItem('first-time', 'false')
		setTest(<Route path="/"> <MainView /> </Route>);
	}
	if (localStorage.getItem('first-time') === 'false' && !testOn) {
		setTestOn(true)
		setTest(<Route path="/"> <MainView /> </Route>);
	}
	

	return (
		<Router>
		<div className="App">
			<main>
				{}
				<Switch>
					{test}
					<Route path="/"> <StartPage firstStart={firstStart} /> </Route>
				</Switch>
			</main>
		</div>
		</Router>
	);
}

export default App;
