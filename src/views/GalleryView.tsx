import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AllHamsters } from '../atoms/atoms';
import HamsterCard from '../components/battleview/HamsterCard';
import { HamsterWithId } from '../interfaces/hamster';
import './GalleryView.css';
import AddHamster from '../components/galleryview/AddHamster'
import DefaultButton from '../components/DefaultButton';
import HamsterWins from '../components/galleryview/hamsterWins';
import {deleteHamsterById, getAllHamsters} from '../globalFunctions/G-ApiRequest'
import ConfirmBox from '../components/ConfirmBox';


const GalleryView = () => {
	const [allHamsters, setAllHamsters] = useRecoilState(AllHamsters);
	const [page, setPage] = useState<number>(0);
	const [addHamster, setAddHamster] = useState<null|JSX.Element>(null);
	const [hamsterCard, setHamsterCard] = useState<null|JSX.Element>(null);
	const [confirmBoxOn, setConfirmBoxOn] = useState<null|JSX.Element>(null);
	let deleteId = '';

	let AllHamstersInPages: HamsterWithId[][] = [];
	let hamsterPage: HamsterWithId[] = [];

	useEffect(() => {
		getAllHamsters(setAllHamsters);
	},[setAllHamsters])

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
				<AddHamster setAddHamster={()=>setAddHamster(null)} />
			))
		}else {
			setAddHamster(null);
		}
	}
	
	function nextPage() {
		if (page === (AllHamstersInPages.length -1)) setPage(0);
		else setPage(page + 1)
	}
	function currentPage() {
		if (page <= 0) setPage(AllHamstersInPages.length - 1);
		else setPage(page - 1)
	}

	function confirmDelete(yes:boolean) {
		if (yes) {
			deleteHamsterById(deleteId);
			getAllHamsters(setAllHamsters);
			setHamsterCard(null);
			setConfirmBoxOn(null);
		} else {
			deleteId = '';
			setConfirmBoxOn(null);
			return;
		}
	}
	async function deleteHamster(id:string) {
		deleteId = id;
		setConfirmBoxOn(<ConfirmBox text={'delete'} confirmDelete={confirmDelete} />)		
	}

	function showHamsterCard(hamster:HamsterWithId) {

		setHamsterCard((
			<div className="hamster-card-single">
				<button className="delete-button" onClick={() => deleteHamster(hamster.firestoreId)}>Delete this hamster</button>
				<HamsterCard gameScore={true} hamster={hamster} />
				<HamsterWins hamsterId={hamster.firestoreId} />
				<DefaultButton clicked={() => setHamsterCard(null)} buttonText="back" />
			</div>
		))
	}

	if (allHamsters) {
		return (
			<section className="gallery-view">
				{addHamster}
				{hamsterCard}
				{confirmBoxOn}
	
				<section className="gallery-add-button">
					<DefaultButton clicked={toggleAddHamster} buttonText={'Lägg till en ny hamster'} />
				</section>
	
				<section className="gallery-items">
					{AllHamstersInPages.length > 0 ? AllHamstersInPages[page].map(hamster => (
						<section className="small-hamster-card" key={hamster.firestoreId} onClick={() => showHamsterCard(hamster)}>
							<h3>{hamster.name}</h3>
							<img src={hamster.imgName.startsWith('http') ? `${hamster.imgName}` : `/img/${hamster.imgName}`} alt="" />
						</section>
					)) : <div><p>Loading...</p></div>}
				</section>
	
				<section className="gallery-pagination">
					<DefaultButton clicked={currentPage} buttonText={'<'} />
					<h2 className="gallery-page">{page + 1} / {AllHamstersInPages.length}</h2>
					<DefaultButton clicked={nextPage} buttonText={'>'} />
				</section>
			</section>
		)
	}
	return (<div></div>)

}



export default GalleryView;