import database from "infra/database.js";

async function items(request, response) {
	const allowedMethods = ["GET"];

	if (!allowedMethods.includes(request.method)) {
		return response.status(405).json({
			error: `Method "${request.method}" not allowed.`,
		});
	}

	if (request.method === "GET") {
		const items = await database.query("SELECT * FROM items ORDER BY created_at DESC;");

		return response.status(200).json(items);
	}
}

export default items;
