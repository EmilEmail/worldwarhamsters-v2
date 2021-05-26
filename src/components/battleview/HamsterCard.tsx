import {HamsterWithId} from '../../interfaces/hamster'
import './HamsterCard.css'
interface Props {
	hamster: HamsterWithId,
	gameScore: boolean
}

const HamsterCard = ({hamster, gameScore}:Props) => {

	if (gameScore) {
		return (
		<section className="hamster-card-wrapper">
				<h2>{hamster.name}</h2>
			<img src={`/img/${hamster.imgName ? hamster.imgName : 'hamster-1.jpg'}`} alt="Pic of a hamster" />
			<span className="hamster-card-info">
				<p>Age: {hamster.age}</p>
				<p>Loves to: {hamster.loves}</p>
				<p>Favorite food: {hamster.favFood}</p>
				<p>Wins: {hamster.wins} </p>
				<p>Defeats: {hamster.defeats} </p>
				<p>Games: {hamster.games} </p>
			</span>
		</section>
		)
	}
	
	return (
		<div>
			<section className="hamster-card-wrapper">
				<h2>{hamster.name}</h2>
				<img src={`/img/${hamster.imgName ? hamster.imgName : 'hamster-1.jpg'}`} alt="Pic of a hamster" />
				<span className="hamster-card-info">
					<p>Age: {hamster.age}</p>
					<p>Loves to: {hamster.loves}</p>
					<p>Favorite food: {hamster.favFood}</p>
				</span>
			</section>

		</div>
	)
}

export default HamsterCard;