import {Hamster} from '../../interfaces/hamster'
import './HamsterCard.css'
interface Props {
	hamster: Hamster
}

const HamsterCard = () => {
	return (
		<section className="hamster-card-wrapper">
			<img src={'hamster.imgName'} alt="Pic of a hamster" />
			<span className="hamster-card-info">
				<p>{'hamster.name'}</p>
				<p>{'hamster.age'}</p>
				<p>{'hamster.loves'}</p>
				<p>{'hamster.favFood'}</p>
			</span>
		</section>
	)
}

export default HamsterCard;