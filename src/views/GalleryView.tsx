import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AllHamsters } from '../atoms/atoms';
import HamsterCard from '../components/battleview/HamsterCard';
import { HamsterWithId } from '../interfaces/hamster';
import './GalleryView.css';
import AddHamster from '../components/galleryview/AddHamster'
const GalleryView = () => {
	const [allHamsters] = useRecoilState(AllHamsters);
	const [page, setPage] = useState<number>(0);
	const [addHamster, setAddHamster] = useState<null|JSX.Element>(null);
	// let hamstersJSX: JSX.Element[] = [];
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

	return (
		<section >
			<button onClick={toggleAddHamster}>Lägg till en ny hamster</button>
			{addHamster}
			<section className="gallery-view">
				{AllHamstersInPages.length > 0 ? AllHamstersInPages[page].map(hamster => (
					<section className="small-hamster-card" key={hamster.firestoreId}>
						<p>Name: {hamster.name}</p>
						<img src={`/img/${hamster.imgName}`} alt="" />
					</section>
				)) : 'Loading...'}
			</section>
			<button onClick={currentPage}>current page</button>
			{page + 1} / {AllHamstersInPages.length}
			<button onClick={nextPage}>next page</button>
		</section>
	)
}



export default GalleryView;