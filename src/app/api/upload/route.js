import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
	const data = await req.formData();
	console.log(data);
	if (data.get("files")) {
		const file = data.get("files");

		const s3 = new S3Client({
			region: "eu-north-1",
			credentials: {
				accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCES_KEY,
				secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
			},
		});
		const ext = file.name.split(".").slice(-1)[0];
		const newFileName = uniqid() + "." + ext;
		const chunks = [];
		console.log(s3);
		for await (const chunk of file.stream()) {
			chunks.push(chunk);
		}
		const buffer = Buffer.concat(chunks);
		await s3.send(
			new PutObjectCommand({
				Bucket: "ppicerija",
				Key: newFileName,
				ACL: "public-read ",
				ContentType: file.type,
				Body: buffer,
			})
		);
		return Response.json("https://ppicerija.s3.amazonaws.com/" + newFileName);
	}
	return Response.json(true);
}
