import database from "infra/database.js";

export default async function handler(req, res) {
	if (req.method !== "DELETE") {
		return res.status(405).json({ error: `Method "${req.method}" not allowed.` });
	}

	const { id } = req.query;

	try {
		const rows = await database.query({
			text: `
        UPDATE items
        SET deleted_at = NOW()
        WHERE id = $1
          AND deleted_at IS NULL
        RETURNING id;
      `,
			values: [id],
		});

		if (rows.length === 0) {
			return res.status(404).json({ error: "Item not found." });
		}

		return res.status(204).send();
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "Internal server error." });
	}
}
