export default function Card({name, image, id, onClick}) {
	return (
		<div
			className="card rounded-md w-40 bg-stone-600 p-0 m-1" key={id}
			onClick={onClick}
		>
			<img
				src={image}
				alt={name}
				className="card-image w-40 h-40 m-0 rounded-tl-md rounded-tr-md"
			/>
			<div className="name text-center p-2 italic font-bold text-xl text-gray-200">{name}</div>
		</div>
	);
}
