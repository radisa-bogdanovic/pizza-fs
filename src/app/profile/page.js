"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
	const session = useSession();
	const [name, setName] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [changesSaved, setChangesSaved] = useState(false);
	const { status } = session;

	const response = async function handleProfileInfoUpdate(e) {
		e.preventDefault();
		setIsSaving(true);
		setChangesSaved(false);
		await fetch("api/profile", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: name }),
		});

		setIsSaving(false);
		if (response.ok) {
			setChangesSaved(true);
		}
	};

	async function hanldePhotoChange(ev) {
		const files = ev.target.files;
		if (files?.length === 1) {
			const data = new FormData();
			data.set("files", files[0]);
			await fetch("/api/upload", {
				method: "POST",

				body: data,
			});
		}
	}

	useEffect(() => {
		if (session.data?.user?.name) {
			setName(session.data.user.name);
		}
	}, [session]);

	if (status === "loading") {
		return "Loading...";
	}
	if (status === "unauthenticated") {
		return redirect("/login");
	}

	const slikaKorisnika = session.data.user.image;
	return (
		<section className="mt-8">
			{" "}
			<h1 className="text-center text-primary text-4xl mb-4">Tvoj profil</h1>
			<div className="max-w-md mx-auto ">
				{isSaving && (
					<h2 className="text-center bg-blue-100 p-4 rounded-lg border-1 border-blue-300">
						{" "}
						Saljemo zahtev...
					</h2>
				)}
				{changesSaved && (
					<h2 className="text-center bg-green-100 p-4 rounded-lg border-1 border-green-300">
						{" "}
						Izmene su sacuvane!
					</h2>
				)}
				<div className="flex gap-4 items-center">
					<div>
						<div className=" p-2 rouded-lg relative">
							{" "}
							<Image
								className="rounded-lg w-full h-full mb-1"
								src={slikaKorisnika}
								alt="slika korisnika"
								width={350}
								height={350}
							/>
							<label className="cursor-pointer block border p-1 border-gray-300 text-center rounded-lg">
								{" "}
								<input
									type="file"
									className="hidden"
									onChange={hanldePhotoChange}
								/>{" "}
								Promeni
							</label>
						</div>
					</div>
					<form className="grow" onSubmit={response}>
						<input
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="Ime i prezime"
						/>
						<input type="text" value={session.data.user.email} disabled />
						<button type="submit"> Sacuvaj</button>
					</form>
				</div>
			</div>
		</section>
	);
}
