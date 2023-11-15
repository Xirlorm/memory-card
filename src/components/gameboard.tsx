import { useEffect, useState } from "react"
import Card from "./card";


export default function Gameboard({scoreState, bestScoreState, setTotal}) {
	const [images, setImages] = useState([]);
	const [score, setScore] = scoreState;
	const [bestScore, setBestScore] = bestScoreState;

	function onClick(image) {
		if (image.clicked) {
			if (score > bestScore) setBestScore(score)
			setScore(0)

			// Reset clicked state of images
			setImages(images => images.map(image => ({...image, clicked: false})))

			return
		}
			
		setImages((images) => {
			let copy = images.map(image => ({...image}))

			// Mark card as clicked
			for (let item of copy) {
				if (image.id == item.id) item.clicked = true;
			}

			copy = copy.sort(() => 0.5 - Math.random()) // shuffle array

			return copy
		})

		setScore(score => score + 1)
	}

	useEffect(() => {
		let invalid = false;

		(async function() { 
				if (invalid) return

				const results = await fetch(
					// "https://picsum.photos/v2/list?page=2&limit=10",
					"https://rickandmortyapi.com/api/character", {mode: 'cors', method: 'GET'}
				);

				if (results.ok) {
					const data = await results.json();
					// Structure fetched data
					setImages(() => {
						return data.results.map(({name, image, id}) => ({name, image, id}))
					});
					setTotal(data.results.length)
				}
		})()

		return () => { invalid = true } ;
	}, []);

	return (
		<div className="gameboard text-gray-200 p-2 flex flex-wrap justify-center">
		{images.length ? images.map(src => (
			<Card onClick={() => onClick(src)} name={src.name} image={src.image} id={src.id} />
		)) : 'Loading...'}
		</div>
	)
}
