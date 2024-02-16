import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./sectionHeaders";

export default function PocetnaMenu() {
	return (
		<section>
			<div className="absolute left-0 right-0">
				<div className="-top-[70px] text-left  absolute left-0 -z-10">
					<Image
						src={"/sallad1.png"}
						width={"107"}
						height={"195"}
						alt={"sallad"}
					/>
				</div>
				<div className="absolute  -top-[180px]  right-0 -z-10">
					<Image
						src={"/sallad2.png"}
						width={"107"}
						height={"195"}
						alt={"sallad"}
					/>
				</div>
			</div>
			<div className="text-center mb-4">
				<SectionHeaders subHeader={"Vidi ovde"} mainHeader={"Meni"} />
			</div>
			<div className="grid grid-cols-3 gap-4">
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />
				<MenuItem />{" "}
			</div>
		</section>
	);
}
