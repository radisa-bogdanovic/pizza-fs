"use client";
import toast from "react-hot-toast";
import UserTabs from "../../components/layouts/profileTabs";
import { useProfile } from "../../components/UseProfiles";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
	const [categoryName, setCategoryName] = useState("");
	const [categories, setCategories] = useState([]);
	const { loading: profileLoading, data: profileData } = useProfile();
	const [editedCategory, setEditedCategory] = useState(null);

	useEffect(() => {
		fetch("/api/categories/").then((res) => {
			res.json().then((categories) => {
				setCategories(categories);
			});
		});
	}, []);

	useEffect(() => {
		fetchCategories();
	}, []);

	function fetchCategories() {
		fetch("/api/categories").then((res) => {
			res.json().then((categories) => {
				setCategories(categories);
			});
		});
	}

	async function handleCategorySubmit(e) {
		e.preventDefault();
		const creationPromise = new Promise(async (resolve, reject) => {
			const data = { name: categoryName };
			if (editedCategory) {
				data._id = editedCategory._id;
			}
			const response = await fetch("/api/categories", {
				method: editedCategory ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			setCategoryName("");
			fetchCategories();
			setEditedCategory(null);
			if (response.ok) {
				resolve();
			} else {
				reject();
			}
		});
		toast.promise(creationPromise, {
			success: "Kategorija je " + editedCategory ? "azurirana!" : "dodana!",
			loading: "Kategorija se" + !editedCategory ? " kreira..." : "azurira...",
			error: "Doslo je do greske, pokusajte kasnije",
		});
	}

	if (profileLoading) {
		return "Loading user info...";
	}
	if (!profileData.admin) {
		return "Not an admin";
	}

	return (
		<section className="mt-8 max-w-lg mx-auto">
			<UserTabs isAdmin={profileData.admin} />
			<form className="mt-8" onSubmit={handleCategorySubmit}>
				<div className="flex gap-2 items-end">
					<div className="grow">
						<label>
							{editedCategory ? "Azuriranje kategorije" : "Ime nove kategorije"}
							{editedCategory && (
								<>
									:<b>{editedCategory.name}</b>
								</>
							)}
						</label>
						<input
							type="text"
							value={categoryName}
							onChange={(e) => {
								setCategoryName(e.target.value);
							}}
						/>
					</div>
					<div className="pb-2">
						<button type="submit" className="border border-primary">
							{editedCategory ? "Azuriraj" : "Kreiraj"}
						</button>
					</div>{" "}
				</div>
			</form>
			<div className=" flex gap-2  flex-col">
				{" "}
				<h2 className="mt-8 text-sm text-gray-500 "> Izmeni kategoriju</h2>
				{categories?.length > 0 &&
					categories.map((category, id) => {
						return (
							<button
								key={id}
								onClick={() => {
									setEditedCategory(category);
									setCategoryName(category.name);
								}}
								className="flex gap-1  rounded-xl p-2 px-4 cursor-pointer"
							>
								<span>{category.name}</span>
							</button>
						);
					})}
			</div>
		</section>
	);
}
