import Link from "next/link";

export default function Header() {
	return (
		<header className="flex items-center justify-between">
			<Link href=" " className="text-primary font-semibold  text-2x;">
				PICAA
			</Link>
			<nav className="flex gap-7 items-center text-grey-500 semibold">
				<Link href={""}>Pocetna</Link>

				<Link href={""}>Meni</Link>

				<Link href={""}>O Nama</Link>

				<Link href={""}>Kontakt</Link>

				<Link
					className="bg-primary  text-white px-6 rounded-full py-2"
					href={""}
				>
					Uloguj se
				</Link>
			</nav>{" "}
		</header>
	);
}
