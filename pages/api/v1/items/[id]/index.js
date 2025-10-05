export default function handler(req, res) {
	if (req.method === "DELETE") {
		res.status(501).json({ error: "Not implemented yet." });
		return;
	}
	res.status(405).json({ error: `Method \"${req.method}\" not allowed.` });
}
