"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
	const sesion = useSession();
	const status = sesion.status;
	let userName = sesion.data?.user?.name
		? sesion.data?.user?.name
		: sesion.data?.user?.email;
	if (userName && userName.includes(" ")) {
		userName = userName.split(" ")[0];
	}
	return (
		<header className="flex items-center justify-between  ">
			<nav className="flex gap-7 items-center text-grey-500 semibold">
				<Link href="/" className="text-primary font-semibold  text-2x;">
					PICAA
				</Link>
				<Link href={"/"}>Pocetna</Link>

				<Link href={""}>Meni</Link>

				<Link href={""}>O Nama</Link>

				<Link href={""}>Kontakt</Link>
			</nav>{" "}
			<nav className="flex items-center gap-4 text-gray-500">
				{status === "authenticated" ? (
					<>
						<Link href={"/profile"} className="whitespace-nowrap">
							{" "}
							Zdravo, {userName}
						</Link>
						<button
							className="bg-primary  text-white px-6 rounded-full py-2"
							onClick={() => {
								signOut();
							}}
						>
							Izloguj se
						</button>
					</>
				) : (
					<>
						<Link href={"/login"}>Uloguj se</Link>
						<Link
							className="bg-primary  text-white px-6 rounded-full py-2"
							href={"/registracija"}
						>
							Registruj se
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}
