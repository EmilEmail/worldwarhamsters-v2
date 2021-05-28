import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { AllHamsters } from '../atoms/atoms';
import HamsterCard from '../components/battleview/HamsterCard';
import { HamsterWinsId, HamsterWithId } from '../interfaces/hamster';
import './GalleryView.css';
import AddHamster from '../components/galleryview/AddHamster'
import DefaultButton from '../components/DefaultButton';
import { getHamster, getMatchWinners } from '../globalFunctions/G-ApiRequest';
import HamsterWins from '../components/galleryview/hamsterWins';
const GalleryView = () => {
	const [allHamsters] = useRecoilState(AllHamsters);
	const [page, setPage] = useState<number>(0);
	const [addHamster, setAddHamster] = useState<null|JSX.Element>(null);
	const [hamsterCard, setHamsterCard] = useState<null|JSX.Element>(null);
	const [hamsterWinsId, setHamsterWinsId] = useState<null|HamsterWinsId[] | any>(null);

	let AllHamstersInPages: HamsterWithId[][] = [];
	let hamsterPage: HamsterWithId[] = [];


	if (allHamsters) {
		allHamsters.forEach((hamster: HamsterWithId) => {
			hamsterPage.push(hamster)
			if (hamsterPage.length > 9) {
				AllHamstersInPages.push(hamsterPage);
				hamsterPage = [];
			}
		});
		if (hamsterPage.length > 0) {
			AllHamstersInPages.push(hamsterPage);
		}
	}

	function toggleAddHamster() {
		if (!addHamster) {
			setAddHamster((
				<AddHamster />
			))
		}else {
			setAddHamster(null);
		}
	}
	
	function nextPage() {
		if (page === (AllHamstersInPages.length -1)) setPage(0);
		else setPage(page + 1)
		console.log(page)
	}
	function currentPage() {
		if (page <= 0) setPage(AllHamstersInPages.length - 1);
		else setPage(page - 1)
		console.log(page)
	}

	async function showHamsterCard(hamster:HamsterWithId) {
		await getMatchWinners(hamster.firestoreId, setHamsterWinsId).then((value) => {
			setHamsterCard((
				<div className="hamster-card-single" onClick={() => setHamsterCard(null)}>
					<HamsterCard gameScore={true} hamster={hamster} />
				</div>
			))
		  });
	}

	return (
		<section className="gallery-view">
			{addHamster}
			{hamsterCard}

			<section className="gallery-add-button">
				<DefaultButton clicked={toggleAddHamster} buttonText={'Lägg till en ny hamster'} />
			</section>

			<section className="gallery-items">
				{AllHamstersInPages.length > 0 ? AllHamstersInPages[page].map(hamster => (
					<section className="small-hamster-card" key={hamster.firestoreId} onClick={() => showHamsterCard(hamster)}>
						<h3>{hamster.name}</h3>
						<img src={`/img/${hamster.imgName}`} alt="" />
					</section>
				)) : 'Loading...'}
			</section>

			<section className="gallery-pagination">
				<DefaultButton clicked={currentPage} buttonText={'<'} />
				<h2 className="gallery-page">{page + 1} / {AllHamstersInPages.length}</h2>
				<DefaultButton clicked={nextPage} buttonText={'>'} />
			</section>
		</section>
	)
}



export default GalleryView;