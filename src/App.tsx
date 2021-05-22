import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './App.css';
import StartPage from './views/StartPage';
import {GET, POST, PUT, DELETE} from './globalFunctions/G-ApiRequest'

function App() {
	const [test, setTest] = useState<null|JSX.Element>(null);
	const [testOn, setTestOn] = useState(false)
	function firstStart() {
		localStorage.setItem('test', 'NotFirstTime')
	}
	if (localStorage.getItem('test') === 'NotFirstTime' && !testOn) {
		setTestOn(true)
		setTest(<Route path="/"><h1>Fungerar det?</h1></Route>);
	}
	return (
		<Router>
		<div className="App">
			<main>
				<Switch>
					<Route path="/settings"> på </Route>
					{test}
					<Route path="/"> <StartPage firstStart={firstStart} /> </Route>
				</Switch>
			</main>
		</div>
		</Router>
	);
}

export default App;
