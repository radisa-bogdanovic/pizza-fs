"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassowrd] = useState("");
	const [error, setError] = useState(false);
	const [creatingUser, setCreatingUser] = useState(false);
	const [userCreated, setUserCreated] = useState(false);

	async function handleFormSubmit(ev) {
		ev.preventDefault();
		setCreatingUser(true);
		setError(false);
		setUserCreated(false);

		let response;

		await fetch("/api/register", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((res) => {
				console.log("Response: ", res);
				response = res;
			})
			.catch((err) => {
				console.error("Error: ", err);
				response = err;
			});

		if (response._id) {
			setUserCreated(true);
		} else {
			setError(true);
		}
		setCreatingUser(false);
	}

	return (
		<section className="mt-8">
			<h1 className="text-center text-primary text-4xl mb-4">Registracija</h1>
			{userCreated && (
				<div className="my-4 text-center ">
					Korisnik je kreiran <br /> Sada mozete da se{" "}
					<Link className="underline" href={"/login"}>
						ulogujete &raquo;
					</Link>
				</div>
			)}
			{error && (
				<div className="my-4 text-center ">
					{" "}
					Greska! <br />
					Molim vas pokusajte ponovo
				</div>
			)}
			<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="email"
					placeholder="mejl"
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
					disabled={creatingUser}
				/>
				<input
					type="password"
					placeholder="sifra"
					value={password}
					onChange={(ev) => setPassowrd(ev.target.value)}
					disabled={creatingUser}
				/>
				<button type="submit" disabled={creatingUser}>
					Registruj se
				</button>
				<div className="my-4 text-center text-gray-500">
					Ili se uloguj sa nekom socijalnom mrezom{" "}
				</div>
				<button
					type="button"
					onClick={() => {
						signIn("google", { callbackUrl: "/" });
					}}
					className="flex gap-4 justify-center"
				>
					<img src="/google.png" alt="google-icon" width={20} height={20} />
					Uloguj se sa Guglom
				</button>
				<div className="text-center my-4 text-grey-500 border-t pt-4 ">
					Vec imas nalog?{" "}
					<Link className="underline" href={"/login"}>
						Uloguj se &raquo;
					</Link>{" "}
				</div>
			</form>
		</section>
	);
}
