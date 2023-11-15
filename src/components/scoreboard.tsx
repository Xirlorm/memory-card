export default function Scoreboard({score = 0, bestScore = 0, total = 0}) {
	return (
		<div className="text-teal-500 text-center flex flex-wrap justify-around">
			<div className="score text-xl">
				<h3 className="font-bold">Score</h3>&nbsp;{score}
			</div>
			<div className="best-score text-xl">
				<h3 className="font-bold">Best Score</h3>&nbsp;{bestScore}/{total}</div>
		</div>
	)
}
