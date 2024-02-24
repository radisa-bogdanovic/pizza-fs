"use client";

import UserTabs from "../../../components/layouts/profileTabs";
import { useProfile } from "../../../components/UseProfiles";

import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "../../../components/layouts/menuItemForm";

export default function NewMenuItemsPage() {
	const { loading, data } = useProfile();
	const [redirectToItem, setRedirectToItem] = useState(false);

	async function handleFormSubmit(ev, data) {
		ev.preventDefault();

		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/menu-items", {
				method: "POST",
				body: JSON.stringify({ data }),
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});
		await toast.promise(savingPromise, {
			loading: "Cuva se kreirana picaa",
			success: "Sacuvano",
			error: "Greska! ",
		});

		setRedirectToItem(true);
	}

	if (redirectToItem) {
		redirect("/menu-items/");
	}
	if (loading) {
		return "Loading user info...";
	}
	if (!data.admin) {
		return "Not an admin.";
	}
	return (
		<section className="mt-8">
			<UserTabs isAdmin={data.admin} />
			<div className="max-w-md mx-auto mt-8">
				<Link href={"/menu-items/"} className="button">
					<span> Vidi sve produkte</span>
					<Left />
				</Link>
			</div>
			<MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
		</section>
	);
}
