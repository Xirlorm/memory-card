import { MouseEventHandler } from "react";

interface CardArg {
	id: number,
	name: string,
	image: string,
	onClick: MouseEventHandler<HTMLDivElement>,
}

export default function Card(props: CardArg) {
	return (
		<div
			className="card rounded-md w-40 bg-stone-600 p-0 m-1" key={props.id}
			onClick={props.onClick}
		>
			<img
				src={props.image}
				alt={props.name}
				className="card-image w-40 h-40 m-0 rounded-tl-md rounded-tr-md"
			/>
			<div className="name text-center p-2 italic font-bold text-xl text-gray-200">
				{props.name}
			</div>
		</div>
	);
}
