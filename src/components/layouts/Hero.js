import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
	return (
		<section className="hero mt-8">
			<div className="py-8">
				<h1 className="text-4xl font-semibold leading-12">
					Sve je bolje <br /> uz <span className="text-primary">Picu :)</span>
				</h1>
				<p className="my-4 text-gray-500 text-sm">
					{" "}
					Pica je ukusno parce zivota koja nam ulepsava dane. Jednostavan ali
					ipak predivan deo zivota koji nam ulepsava svaki dan.
				</p>
				<div className="flex gap-4 text-sm">
					<button className="bg-primary text-white rounded-full py-2 px-6 justify-center flex gap-2 uppercase  items-center">
						Narucii <Right />
					</button>
					<button className="flex gap-2 py-2 text-gray-600 border-0 items-center font-semibold">
						Saznaj vise <Right />
					</button>
				</div>
			</div>
			<div className=" relative">
				<Image
					src={"/pizza.png"}
					layout="fill"
					objectFit="contain"
					alt="pizza"
				/>
			</div>
		</section>
	);
}
