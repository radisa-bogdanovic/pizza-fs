"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassowrd] = useState("");
	const [loginInProgress, setLoginInProgress] = useState(false);
	const [error, setError] = useState(false);

	async function handleFormSubmit(ev) {
		ev.preventDefault();
		setLoginInProgress(true);

		await signIn("credentials", { email, password, callbackUrl: "/" });
	}
	return (
		<section className="mt-8">
			<h1 className="text-center text-primary text-4xl mb-4">Uloguj se</h1>
			<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="email"
					placeholder="mejl"
					name="email"
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
					disabled={loginInProgress}
				/>
				<input
					type="password"
					placeholder="sifra"
					value={password}
					name="password"
					onChange={(ev) => setPassowrd(ev.target.value)}
					disabled={loginInProgress}
				/>
				<button type="submit" disabled={loginInProgress}>
					Uloguj se
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
					Nemas nalog?{" "}
					<Link className="underline" href={"/login"}>
						Registruj se&raquo;
					</Link>{" "}
				</div>
			</form>
		</section>
	);
}
