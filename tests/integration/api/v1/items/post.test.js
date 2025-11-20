import orchestrator from "tests/orchestrator.js";

const BASE_URL = "http://localhost:3000";

beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await orchestrator.clearDatabase();
    await orchestrator.runPendingMigrations();
}, 120000);

describe("POST /api/v1/items", () => {
    describe("Creating items", () => {
        test("With valid data", async () => {
            const payload = {
                name: "Tomate",
                quantity: 5,
                unit: "kg",
                category: "Legumes e Verduras",
            };

            const response = await fetch(`${BASE_URL}/api/v1/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            expect(response.status).toBe(201);

            const responseBody = await response.json();

            expect(responseBody).toHaveProperty("id");
            expect(responseBody.name).toBe(payload.name);
            expect(responseBody.quantity).toBe(payload.quantity);
            expect(responseBody.unit).toBe(payload.unit);
            expect(responseBody.category).toBe(payload.category);
        });
    });
});
