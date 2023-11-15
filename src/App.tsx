import { useState } from 'react'
import './App.css'
import Header from './components/header.tsx'
import ScoreBoard from './components/scoreboard.tsx'
import Gameboard from './components/gameboard.tsx'

function App() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [total, setTotal] = useState(0);

	return (
		<div className='bg-stone-800'>
			<Header />
			<ScoreBoard score={score} bestScore={bestScore} total={total} />
			<Gameboard
				scoreState={[score, setScore]}
				bestScoreState={[bestScore, setBestScore]}
				setTotal={setTotal}
			/>
		</div>
	)
}

export default App
