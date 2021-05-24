import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'
import BattleView from './BattleView'
import './MainView.css'
const MainView = () => {
	return (
		<Router>
		<div className="main-wrapper">
			<header>
				<p className="small-header-upfront">
					World War Hamsters 2021
				</p>
			</header>
			<main>
				<Switch>
					<Route path="/battle">
						<BattleView />
					</Route>
					<Route path="/gallery">
						Gallery
					</Route>
					<Route path="/statistics">
						Statistics
					</Route>
					<Route path="/history">
						History
					</Route>
				</Switch>
			</main>
			<footer>
				<nav className="menu-wrapper">
					<NavLink activeClassName="link-active" to="/battle">Battle</NavLink>
					<NavLink activeClassName="link-active" to="/gallery">Gallery</NavLink>
					<NavLink activeClassName="link-active" to="/statistics">Stats</NavLink>
					<NavLink activeClassName="link-active" to="/history">History</NavLink>
				</nav>
			</footer>
		</div>
		</Router>
	)
}

export default MainView;