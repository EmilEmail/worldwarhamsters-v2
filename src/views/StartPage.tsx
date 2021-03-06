import { NavLink } from 'react-router-dom'
import './StartPage.css'


const StartPage = () => {
	return (
		<section className="start-page-wrapper">
			<h1>
				World War Hamsters 2021
			</h1>
			<article className="app-info">
				<p>
					This is World War Hamsters 2021, the only thing you do is to click on the hamster that you thinks is coolest, cutest or whatever... You can also add more hamsters to the board and delete the ones that you don't think deserves to be here. Have fun!
				</p>
				<div className="battle-or-gallery">
					<NavLink to="/battle">BATTLE</NavLink>
						<p>or</p>
					<NavLink to="/gallery">GALLERY</NavLink>
				</div>
			</article>
		</section>
	)
}

export default StartPage;