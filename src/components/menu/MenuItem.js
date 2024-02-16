export default function MenuItem() {
	return (
		<div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
			<div className="text-center ">
				<img
					src="/pizza.png"
					alt="piza img"
					className="max-h-24 block mx-auto"
				></img>
			</div>
			<h4 className="semi-bold my-3 text-xl ">Feferoni picaa</h4>
			<p className="text-gray-500 text-sm">
				lLorem ipsum dolor sit amet, bla bla bla bla and more bro
			</p>
			<button className="bg-primary text-white rounded-full px-8 py-2 mt-4">
				{" "}
				Add to cart $12
			</button>
		</div>
	);
}
