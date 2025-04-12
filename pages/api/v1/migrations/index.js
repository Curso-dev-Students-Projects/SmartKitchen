import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";
import {join} from "node:path";
import {Console} from "node:console";

export default async function migrations(request, response) {
	const allowedHosts = ["GET", "POST"];

	if (!allowedHosts.includes(request.method)) {
		return response.status(405).json({
			error: `Method "${request.method}" not allowed.`,
		});
	}

	let dbClient;

	try {
		dbClient = await database.getNewClient();

		const defaultMigrationOptions = {
			dbClient: dbClient,
			dryRun: true,
			dir: join("infra", "migrations"),
			direction: "up",
			verbose: true,
			migrationsTable: "pgmigrations",
		};

		if (request.method === "GET") {
			const pendingMigrations = await migrationRunner(defaultMigrationOptions);
			return response.status(200).json(pendingMigrations);
		}

		if (request.method === "POST") {
			const migratedMigrations = await migrationRunner({...defaultMigrationOptions, dryRun: false});

			if (migratedMigrations.length > 0) {
				return response.status(201).json(migratedMigrations);
			}

			return response.status(200).json(migratedMigrations);
		}
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await dbClient.end();
	}
}
