"use client";
import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({ onSubmit, menuItem }) {
	const [image, setImage] = useState(menuItem?.image || "");
	const [name, setName] = useState(menuItem?.name || "");
	const [description, setDescription] = useState(menuItem?.description || "");
	const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
	return (
		<form
			onSubmit={(ev) => onSubmit(ev, { image, name, description, basePrice })}
			className="mt-8 max-w-md mx-auto"
		>
			<div
				className="grid items-start  gap-4 "
				style={{ gridTemplateColumns: ".3fr .7fr " }}
			>
				<div className="max-w-[200px]">
					<EditableImage link={image} setLink={setImage} />
				</div>
				<div className="grow ">
					<label> Ime produkta</label>
					<input
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						type="text"
					/>
					<label>Opis</label>
					<input
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						type="text"
					/>
					<label> Startna cena</label>
					<input
						value={basePrice}
						onChange={(e) => {
							setBasePrice(e.target.value);
						}}
						type="text"
					/>
					<button type="submit">Sacuvaj</button>
				</div>
				<div></div>
			</div>
		</form>
	);
}
