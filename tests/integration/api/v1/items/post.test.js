import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await orchestrator.clearDatabase();
    await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/items", () => {
    describe("Creating items", () => {
        test("With valid data", async () => {
            const response = await fetch(`http://localhost:3000/api/v1/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Tomate",
                    quantity: 5,
                    unit: "kg",
                }),
            });

            expect(response.status).toBe(201);

            const responseBody = await response.json();
            expect(responseBody).toHaveProperty("id");
            expect(responseBody.name).toBe("Tomate");
            expect(responseBody.quantity).toBe(5);
            expect(responseBody.unit).toBe("kg");
        });
    });
});
