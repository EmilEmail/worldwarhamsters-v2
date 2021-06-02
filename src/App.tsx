import { useEffect } from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom'
import './App.css';
import StartPage from './views/StartPage';
import {getAllHamsters} from './globalFunctions/G-ApiRequest'
import {useRecoilState} from 'recoil'
import {AllHamsters} from './atoms/atoms'
import BattleView from './views/BattleView';
import GalleryView from './views/GalleryView';
import StatsView from './views/StatsView';
import HistoryView from './views/HistoryView';
import NoConnection from './views/NoConnection';

function App() {
	const [hamsters, setHamsters] = useRecoilState(AllHamsters);
	// const [noConnection, setNoConnection] = useState(true)
	let noConnection = true;

	useEffect(() => {
		getAllHamsters(setHamsters);
		
	}, [setHamsters])

	if(hamsters) noConnection = false;
	
	return (
		<Router>
		<div className="App">
			<div className="main-wrapper">
				<header>
					<p className="small-header-upfront">
						World War Hamsters 2021
					</p>
				</header>
				<main>
					<Switch>
						{noConnection ? 
							<Route path="/"> 
								<NoConnection />
							</Route> :
							null
						}
						<Route path="/battle">
							<BattleView />
						</Route>
						<Route path="/gallery">
							<GalleryView />
						</Route>
						<Route path="/statistics">
							<StatsView />
						</Route>
						<Route path="/history">
							<HistoryView />
						</Route>
						<Route path="/">
							<StartPage />
						</Route>
					</Switch>
				</main>
				<footer>
					<nav className="menu-wrapper">
						<NavLink activeClassName="link-active" to="/">Start</NavLink>
						<NavLink activeClassName="link-active" to="/battle">Battle</NavLink>
						<NavLink activeClassName="link-active" to="/gallery">Gallery</NavLink>
						<NavLink activeClassName="link-active" to="/statistics">Stats</NavLink>
						<NavLink activeClassName="link-active" to="/history">History</NavLink>
					</nav>
				</footer>
			</div>
		</div>
		</Router>
	);
}

export default App;
