import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
	await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

test("GET to api/v1/migrations should return 200", async () => {
	const response = await fetch("http://localhost:3000/api/v1/migrations");
	expect(response.status).toBe(200);

	const responseBody = await response.json();
	expect(Array.isArray(responseBody)).toBe(true);
	expect(responseBody.length).toBeGreaterThan(0);
});
