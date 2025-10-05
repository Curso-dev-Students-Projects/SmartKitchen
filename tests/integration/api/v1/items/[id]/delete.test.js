import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.clearDatabase();

	const { execSync } = require("child_process");
	execSync("npm run migrations:up", { stdio: "inherit" });

	// força inserção e log pra depurar
	const rows = await database.query(`
    INSERT INTO items (name, quantity, unit, expiration_date, category_id)
    VALUES ('Teste Delete', 1, 'un', NOW() + interval '30 days', 1)
    RETURNING id;
  `);

	console.log("rows retornado:", rows); // 👈 vai aparecer no log do jest
	if (!rows || rows.length === 0) throw new Error("Nenhum item foi inserido!");

	global.itemId = rows[0].id;
}, 120000);

describe("DELETE api/v1/items/:id", () => {
	test("Should mark item as deleted and return 204", async () => {
		const itemId = global.itemId;

		const response = await fetch(`http://localhost:3000/api/v1/items/${itemId}`, {
			method: "DELETE",
		});

		expect(response.status).toBe(204);
	});

	test("Should return 404 when item does not exist", async () => {
		const response = await fetch("http://localhost:3000/api/v1/items/999999", {
			method: "DELETE",
		});

		expect(response.status).toBe(404);
	});
});
