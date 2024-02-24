"use client";

import UserTabs from "../../components/layouts/profileTabs";
import { useProfile } from "../../components/UseProfiles";
import Right from "../../components/icons/Right";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MenuItemsPage() {
	const { loading, data } = useProfile();
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		fetch("/api/menu-items").then((res) => {
			res.json().then((menuItems) => {
				setMenuItems(menuItems);
			});
		});
	}, []);
	if (loading) {
		return "Loading user info...";
	}
	if (!data.admin) {
		return "Not an admin.";
	}
	return (
		<section className="mt-8 max-w-md mx-auto">
			<UserTabs isAdmin={data.admin} />
			<div className="mt-8">
				<Link className="button" href={"/menu-items/new/"}>
					Kreiraj novu piccu <Right />
				</Link>
			</div>
			<h2 className="text-sm text-gray-500 mt-8">
				<div className="grid grid-cols-3 gap-2">
					{menuItems.length > 0 &&
						menuItems.map((item, id) => {
							return (
								<Link
									key={id}
									className="bg-gray-200 rounded-lg p-4"
									href={"/menu-items/edit/" + item._id}
								>
									<div className="relative">
										<Image
											src={item.image}
											alt={item.name + "image"}
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
									<div className="text-center"></div>
									{item.name}
								</Link>
							);
						})}
				</div>
			</h2>
		</section>
	);
}
