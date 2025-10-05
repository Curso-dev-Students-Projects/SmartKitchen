import orchestrator from "tests/orchestrator.js";
import database from "infra/database.js";

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.clearDatabase();
	const { execSync } = require("child_process");
	execSync("npm run migrations:up", { stdio: "inherit" });
}, 120000);

describe("DELETE api/v1/items/:id", () => {
	test("Should mark item as deleted and return 204", async () => {
		const { rows } = await database.query({
			text: `
                INSERT INTO items (name, quantity, unit, expiration_date, category_id)
                VALUES ('Cereal Matinal', 1, 'caixa', '2025-11-10', 1)
                RETURNING id;
            `,
		});
		const itemId = rows[0].id;

		const response = await fetch(`http://localhost:3000/api/v1/items/${itemId}`, {
			method: "DELETE",
		});

		expect(response.status).toBe(204);

		const { rows: check } = await database.query({
			text: "SELECT deleted_at FROM items WHERE id = $1",
			values: [itemId],
		});

		expect(check[0].deleted_at).not.toBeNull();
	});

	test("Should return 404 when item does not exist", async () => {
		const response = await fetch("http://localhost:3000/api/v1/items/9999", {
			method: "DELETE",
		});
		expect(response.status).toBe(404);
	});
});
