"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import EditableImage from "../../components/layouts/EditableImage";
import UserTabs from "../../components/layouts/profileTabs";
import toast from "react-hot-toast";

export default function ProfilePage() {
	const session = useSession();
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [phone, setPhone] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [profileFetched, setProfileFetched] = useState(false);

	const { status } = session;

	const response = async function handleProfileInfoUpdate(e) {
		e.preventDefault();

		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/profile/", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					image,
					city,
					country,
					postalCode,
					streetAddress,
					phone,
				}),
			});
			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});
		toast.promise(savingPromise, {
			loading: "Cuvaju se promene...",
			success: "Promene su sacuvane!",
			error: "Greska, proveri internet konekciju",
		});

		if (response.ok) {
			toast("Podaci su uspesno sacuvani!");
		}
	};

	useEffect(() => {
		if (session.data?.user?.name) {
			setName(session.data.user.name);
			setImage(session.data.user.image);
			fetch("/api/profile/").then((response) => {
				response.json().then((data) => {
					setPhone(data.phone);
					setCity(data.city);
					setPostalCode(data.postalCode);
					setCountry(data.country);
					setStreetAddress(data.streetAddress);
					setIsAdmin(data.admin);
					setProfileFetched(true);
				});
			});
		}
	}, [session]);

	if (status === "loading" || !profileFetched) {
		return "Loading...";
	}
	if (status === "unauthenticated") {
		return redirect("/login");
	}

	return (
		<section className="mt-8">
			{" "}
			<UserTabs isAdmin={isAdmin} />
			<div className="max-w-md mx-auto ">
				<div className="flex gap-4">
					<div>
						<div className=" p-2 rouded-lg relative max-w-[120px]">
							{" "}
							<EditableImage link={image} setLink={setImage} />
						</div>
					</div>
					<form className="grow" onSubmit={response}>
						<label> Ime i prezime</label>
						<input
							type="text"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="Ime i prezime"
						/>
						<label>Mejl</label>
						<input
							type="text"
							value={session.data.user.email}
							disabled
							placeholder="email"
						/>
						<label> Broj telefona</label>
						<input
							type="tel"
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
							placeholder="Broj telefona"
						/>
						<label> Ulica i broj</label>
						<input
							type="text"
							value={streetAddress}
							onChange={(e) => {
								setStreetAddress(e.target.value);
							}}
							placeholder="Ulica"
						/>
						<div className="flex gap-2">
							{" "}
							<div>
								{" "}
								<label> Postanski broj</label>
								<input
									type="text"
									value={postalCode}
									onChange={(e) => {
										setPostalCode(e.target.value);
									}}
									placeholder="Postanski broj"
								/>
							</div>
							<div>
								<label> Grad</label>
								<input
									type="text"
									value={city}
									onChange={(e) => {
										setCity(e.target.value);
									}}
									placeholder="Grad"
								/>
							</div>
						</div>
						<label> Zemlja</label>
						<input
							type="text"
							value={country}
							onChange={(e) => {
								setCountry(e.target.value);
							}}
							placeholder="Zemlja"
						/>
						<button type="submit"> Sacuvaj</button>
					</form>
				</div>
			</div>
		</section>
	);
}
