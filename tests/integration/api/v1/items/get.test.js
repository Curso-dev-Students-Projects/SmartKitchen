import orchestrator from "tests/orchestrator.js";
import database from "infra/database.js";

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.clearDatabase();
	// Executa as migrations após limpar o banco de dados
	const { execSync } = require("child_process");
	execSync("npm run migrations:up", { stdio: "inherit" });
}, 120000);

describe("GET api/v1/items", () => {
	describe("Anonymous user", () => {
		test("Deve retornar uma lista vazia quando não houver itens", async () => {
			const response = await fetch("http://localhost:3000/api/v1/items");
			expect(response.status).toBe(200);

			const responseBody = await response.json();
			expect(Array.isArray(responseBody)).toBe(true);
			expect(responseBody.length).toBe(0);
		});

		test("Deve retornar todos os itens quando existirem", async () => {
			// Insert test items
			await database.query({
				text: `
					INSERT INTO items (name, quantity, unit, expiration_date, category_id)
					VALUES 
						('Leite Integral UHT', 6, 'caixas', '2025-10-15T00:00:00.000Z', 1),
						('Tomate Italiano', 500, 'g', '2025-09-30T00:00:00.000Z', 3)
				`,
			});

			const response = await fetch("http://localhost:3000/api/v1/items");
			expect(response.status).toBe(200);

			const responseBody = await response.json();
			expect(Array.isArray(responseBody)).toBe(true);
			expect(responseBody.length).toBe(2);

			// Checando estrutura dos itens
			responseBody.forEach((item) => {
				expect(item).toHaveProperty("id");
				expect(item).toHaveProperty("name");
				expect(item).toHaveProperty("quantity");
				expect(item).toHaveProperty("unit");
				expect(item).toHaveProperty("expiration_date");
				expect(item).toHaveProperty("category_id");
				expect(item).toHaveProperty("created_at");
				expect(item).toHaveProperty("updated_at");
				expect(item).toHaveProperty("deleted_at");
			});

			// Checando se os itens específicos estão presentes
			const itemNames = responseBody.map((item) => item.name);
			expect(itemNames).toContain("Leite Integral UHT");
			expect(itemNames).toContain("Tomate Italiano");

			// Checando valores específicos
			const leiteItem = responseBody.find((item) => item.name === "Leite Integral UHT");
			expect(leiteItem.quantity).toBe(6);
			expect(leiteItem.unit).toBe("caixas");
			expect(leiteItem.expiration_date).toMatch(/2025-10-15T\d{2}:00:00\.000Z/);
			expect(leiteItem.category_id).toBe(1);

			const tomateItem = responseBody.find((item) => item.name === "Tomate Italiano");
			expect(tomateItem.quantity).toBe(500);
			expect(tomateItem.unit).toBe("g");
			expect(tomateItem.expiration_date).toMatch(/2025-09-30T\d{2}:00:00\.000Z/);
			expect(tomateItem.category_id).toBe(3);
		});

		test("Deve retornar 405 para métodos não suportados", async () => {
			const response = await fetch("http://localhost:3000/api/v1/items", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});

			expect(response.status).toBe(405);

			const responseBody = await response.json();
			expect(responseBody.error).toBe('Method "POST" not allowed.');
		});
	});
});
