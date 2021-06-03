import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AllHamsters } from "../atoms/atoms";
import GamesBefore from "../components/historyview/GamesBefore";
import {getAllMatches, deleteMatchById, putHamster, getAllHamsters} from '../globalFunctions/G-ApiRequest'
import { HamsterWithId } from "../interfaces/hamster";
import { MatchesWithId } from "../interfaces/matches";
import './HistoryView.css';

const HistoryView = () => {
	const [hamsters, setHamsters] = useRecoilState(AllHamsters);
	const [allMatches, setAllMatches] = useState<MatchesWithId[]>();
	const [page, setPage] = useState(0);
	const [loadbar, setLoadbar] = useState(<></>)

	useEffect(() => {
		const getAllMatchHamsters = async() => {
			await getAllMatches(setAllMatches)
		} 
		getAllMatchHamsters()
	}, [])
	
	function paginate(num:number) {
		if (num === 1) {
			if (allMatches) if (page === (allMatches.length - 1)) return;
			setPage(page + 1);
		}else {
			if (page === 0) return;
			setPage(page - 1);
		}
	}

	const unknown = {loserId: '', winnerId: '', firestoreId: ''}

	async function deleteMatch(match:MatchesWithId) {
		setPage(0);
		if(match.firestoreId === ''){
			alert('No Match here...');
			return;
		}
		const loser = hamsters.find((hamster:HamsterWithId) => match.loserId === hamster.firestoreId)
		const winner = hamsters.find((hamster:HamsterWithId) => match.winnerId === hamster.firestoreId)

		setLoadbar(<div className="loadbar">Loading...</div>)
		
		let newLoser;
		let newWinner;
		if (winner && loser) {
			newLoser = {
				games: loser.games - 1,
				defeats: loser.defeats - 1
			}
			newWinner = {
				games: winner.games - 1,
				wins: winner.wins - 1
			}
			console.log(newLoser, newWinner)
			Promise.all([
				putHamster(loser.firestoreId, newLoser),
				putHamster(winner.firestoreId, newWinner)
			]).then(async()=> {
				await deleteMatchById(match.firestoreId);
				await getAllHamsters(setHamsters);
				await getAllMatches(setAllMatches);
				setLoadbar(<></>)
			})
			return;
		}
		if (winner) {
			newWinner = {
				games: winner.games - 1,
				defeats: winner.wins - 1,
			}
			await Promise.all([
				putHamster(winner.firestoreId, newWinner)
			]).then(async()=> {
				await getAllHamsters(setHamsters);
				await getAllMatches(setAllMatches);
				setLoadbar(<></>)
			})
			return;
		}
		if (loser) {
			newLoser = {
				games: loser.games - 1,
				defeats: loser.defeats - 1,
			}
			await Promise.all([
				putHamster(loser.firestoreId, newLoser)
			]).then(async()=> {
				await getAllHamsters(setHamsters);
				await getAllMatches(setAllMatches);
				setLoadbar(<></>)
			})
			return;
		}
	}
	return (
		<section className="history-view-wrapper">
			{loadbar}
			<button className="delete-button" onClick={() => deleteMatch(allMatches ? allMatches[page] : unknown)}>Delete Match</button>
			{!allMatches ? <p>One or more of the hamsters doesn't exist any more...</p>:
				(
					<GamesBefore loserId={allMatches[page].loserId} winnerId={allMatches[page].winnerId} />
				)
			}
			<div className="history-pagination">
				<button onClick={() => paginate(-1)}>&larr;</button>
				<p>{page + 1} / {allMatches ? (allMatches.length) : null}</p>
				<button onClick={() => paginate(1)}>&rarr;</button>
			</div>
		</section>
	)
}

export default HistoryView;