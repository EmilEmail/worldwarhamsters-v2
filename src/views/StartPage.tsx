import { Link, NavLink } from 'react-router-dom'
import DefaultButton from '../components/DefaultButton'
import './StartPage.css'

interface Props {
	firstStart: () => void
}
const StartPage = ({firstStart}:Props) => {

	function StartApp() {
		alert('fixa!!')
	}
	return (
		<section className="start-page-wrapper">
			<h1>
				World War Hamsters 2021
			</h1>
			<article className="app-info">
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
				</p>
			</article>
			<Link to="/battle">
				<DefaultButton buttonText="Battle" clicked={StartApp}/>
			</Link>

			<Link to="/gallery">
				<DefaultButton buttonText="Gallery" clicked={StartApp}/>
			</Link>
		</section>
	)
}

export default StartPage;