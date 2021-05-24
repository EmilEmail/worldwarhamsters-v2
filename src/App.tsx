import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import StartPage from './views/StartPage';
import MainView from './views/MainView'
import {Hamster} from './interfaces/hamster'
import {GET} from './globalFunctions/G-ApiRequest'

function App() {
	const [test, setTest] = useState<null|JSX.Element>(null);
	const [testOn, setTestOn] = useState<boolean>(false);
	const [allHamsters, setAllHamsters] = useState<null|Hamster[]>(null)

	useEffect(() => {
		GET('/hamsters', setAllHamsters);
	}, [])

	if (allHamsters) {
		console.log(allHamsters)
	}
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
