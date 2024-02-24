"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
	const path = usePathname();
	return (
		<div className="flex gap-2 tabs justify-center">
			<Link
				className={path.includes("profile") ? "active" : ""}
				href={"/profile/"}
			>
				{" "}
				Profil
			</Link>
			{isAdmin ? (
				<>
					<Link
						className={path.includes("categories") ? "active" : ""}
						href={"/categories/"}
					>
						Kategorije
					</Link>
					<Link
						className={path.includes("menu-items") ? "active" : ""}
						href={"/menu-items/"}
					>
						Stvari sa menija
					</Link>
					<Link
						className={path.includes("korisnici") ? "active" : ""}
						href={"/korisnici/"}
					>
						Korisnici
					</Link>
				</>
			) : (
				<h1 className="text-center text-primary text-4xl mb-4">Tvoj profil</h1>
			)}
		</div>
	);
}
