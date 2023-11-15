import { useEffect, useState } from "react"
import Card from "./card";

interface Card {
	image: string,
	clicked?: boolean,
	name: string,
	id: number,
}

interface GameboardArg {
	scoreState: [number, Function]
	bestScoreState: [number, Function]
	setTotal: Function
}

export default function Gameboard(props: GameboardArg) {
	const [images, setImages] = useState([] as Card[]);
	const [score, setScore] = props.scoreState;
	const [bestScore, setBestScore] = props.bestScoreState;

	function onClick(image: Card) {
		if (image.clicked) {
			if (score > bestScore) setBestScore(score)
			setScore(0)

			// Reset clicked state of images
			setImages((images: Card[]) => {
				return images.map((image: Card) => ({...image, clicked: false}))
			})

			return
		}
			
		setImages((images) => {
			let copy = images.map((image: Card) => ({...image}))

			// Mark card as clicked
			for (let item of copy) {
				if (image.id == item.id) item.clicked = true;
			}

			copy = copy.sort(() => 0.5 - Math.random()) // shuffle array

			return copy
		})

		setScore((score: number) => score + 1)
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
						return data.results.map(({name = "", image = "", id = -1}) => ({name, image, id}))
					});
					props.setTotal(data.results.length)
				}
		})()

		return () => { invalid = true } ;
	}, []);

	return (
		<div className="gameboard text-gray-200 p-2 flex flex-wrap justify-center">
		{images.length ? images.map((image: Card) => (
			<Card onClick={() => onClick(image)} name={image.name} image={image.image} id={image.id} />
		)) : 'Loading...'}
		</div>
	)
}
