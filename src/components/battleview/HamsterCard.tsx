import {HamsterWithId} from '../../interfaces/hamster'
import './HamsterCard.css'
interface Props {
	hamster: HamsterWithId
}

const HamsterCard = ({hamster}:Props) => {
	return (
		<section className="hamster-card-wrapper">
				<h2>{hamster.name}</h2>
			<img src={`/img/${hamster.imgName ? hamster.imgName : 'hamster-1.jpg'}`} alt="Pic of a hamster" />
			<span className="hamster-card-info">
				<p>Age: {hamster.age}</p>
				<p>Loves to: {hamster.loves}</p>
				<p>Favorite food: {hamster.favFood}</p>
			</span>
		</section>
	)
}

export default HamsterCard;