import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
	async function hanldePhotoChange(ev) {
		const files = ev.target.files;
		if (files?.length === 1) {
			const data = new FormData();
			data.set("files", files[0]);

			const uploadPromise = new Promise(async (resolve, reject) => {
				const response = await fetch("/api/upload", {
					method: "POST",
					body: data,
				});

				if (response.ok) {
					const link = await response.json();
					setLink(link);
					resolve();
				} else {
					reject();
				}
			});
			await toast.promise(uploadPromise, {
				loading: "Ubacijemo sliku u bazu...",
				success: "Slika je ubacena!",
				error: "Doslo je do greske. Molimo vas pokusajte kasnije.",
			});
		}
	}
	return (
		<>
			{link ? (
				<Image
					className="rounded-lg w-full h-full mb-1"
					src={link}
					alt="slika korisnika"
					width={350}
					height={350}
				/>
			) : (
				<div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center">
					No image
				</div>
			)}
			<label className="cursor-pointer block border p-1 border-gray-300 text-center rounded-lg">
				{" "}
				<input
					type="file"
					className="hidden"
					onChange={hanldePhotoChange}
				/>{" "}
				Promeni
			</label>
		</>
	);
}
