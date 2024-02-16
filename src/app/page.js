import Hero from "../components/layouts/Hero";
import PocetnaMenu from "../components/layouts/PocetnaMenu";
import SectionHeaders from "../components/layouts/sectionHeaders";

export default function Home() {
	return (
		<>
			<Hero />
			<PocetnaMenu />
			<section className="text-center my-16">
				<SectionHeaders subHeader={"Nasa prica"} mainHeader={"O nama"} />
				<div className="max-w-2xl mx-auto mt-4 text-gray-500 flex flex-col gap-4">
					<p>
						Lorem ipum Lorem ipsum sdaosdmsia dsamidsamidsampdsam
						dsanidosandosan dlsakn ldsanld sn onds oadsapiodnoisanodindsaon
						daosdsada sadjsadd sdsdadsad sdds1212ds ad sadsa d as d dsadsa
					</p>
					<p>
						Lorem ipum Lorem ipsum sdaosdmsia dsamidsamidsampdsam
						dsanidosandosan dlsakn ldsanld sn onds oadsapiodnoisanodindsaon
						daosdsada sadjsadd sdsdadsad sdds1212ds ad
					</p>
					<p>
						Lorem ipum Lorem ipsum sdaosdmsia dsamidsamidsampdsam
						dsanidosandosan dlsakn ldsanld sn onds oadsapiodnoisanodindsaon
						daosdsada sadjsadd
					</p>
				</div>
			</section>
			<section className="text-center my-8">
				<SectionHeaders subHeader={"Ne stiduj"} mainHeader={"Pisi nam"} />

				<div className="mt-8">
					<a
						className="text-4xl underline text-gray-500 "
						href="tel:+46 738 123 123"
					>
						+46 738 123 123
					</a>
				</div>
			</section>
		</>
	);
}
