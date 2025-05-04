import database from "infra/database.js";

async function status(request, response) {
	const updatedAt = new Date().toISOString();

	const databaseVersionResult = await database.query("SHOW server_version;");
	const databaseVersionValue = databaseVersionResult[0].server_version;

	const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
	const databaseMaxConnectionsValue = databaseMaxConnectionsResult[0].max_connections;

	const databaseName = process.env.POSTGRES_DB;
	const openedConnectionsResult = await database.query({
		text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
		values: [databaseName],
	});
	const openedConnectionsValue = openedConnectionsResult[0].count;

	response.status(200).json({
		updated_at: updatedAt,
		dependencies: {
			database: {
				max_connections: parseInt(databaseMaxConnectionsValue),
				opened_connections: openedConnectionsValue,
				version: databaseVersionValue,
			},
		},
	});
}

export default status;
