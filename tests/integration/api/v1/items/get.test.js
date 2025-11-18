import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await orchestrator.clearDatabase();
    await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/items", () => {
    describe("Listing all items", () => {
        test("Should return empty array when no items exist", async () => {
            const response = await fetch(`http://localhost:3000/api/v1/items`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            expect(response.status).toBe(200);

            const responseBody = await response.json();
            expect(Array.isArray(responseBody)).toBe(true);
            expect(responseBody).toHaveLength(0);
        });

        test("Should return all items when items exist", async () => {
            // Criar alguns itens primeiro
            const firstItemData = {
                name: "Leite Integral UHT",
                quantity: 6,
                unit: "l",
                expiration_date: "2025-10-15T00:00:00.000Z",
                category: "550e8400-e29b-41d4-a716-446655440001",
            };

            const secondItemData = {
                name: "Tomate Italiano",
                quantity: 500,
                unit: "g",
                expiration_date: "2025-09-30T00:00:00.000Z",
                category: "550e8400-e29b-41d4-a716-446655440003",
            };

            // Criar os itens
            await fetch(`http://localhost:3000/api/v1/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(firstItemData),
            });

            await fetch(`http://localhost:3000/api/v1/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(secondItemData),
            });

            // Buscar todos os itens
            const response = await fetch(`http://localhost:3000/api/v1/items`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            expect(response.status).toBe(200);

            const responseBody = await response.json();
            expect(Array.isArray(responseBody)).toBe(true);
            expect(responseBody).toHaveLength(2);

            // Verificar estrutura dos itens retornados
            const firstReturnedItem = responseBody[0];
            expect(firstReturnedItem).toHaveProperty("id");
            expect(firstReturnedItem).toHaveProperty("name");
            expect(firstReturnedItem).toHaveProperty("quantity");
            expect(firstReturnedItem).toHaveProperty("unit");
            expect(firstReturnedItem).toHaveProperty("expiration_date");
            expect(firstReturnedItem).toHaveProperty("category_id");
            expect(firstReturnedItem).toHaveProperty("created_at");

            // Verificar tipos dos campos
            expect(typeof firstReturnedItem.id).toBe("string");
            expect(typeof firstReturnedItem.name).toBe("string");
            expect(typeof firstReturnedItem.quantity).toBe("number");
            expect(typeof firstReturnedItem.unit).toBe("string");
            expect(typeof firstReturnedItem.created_at).toBe("string");
        });

        test("Should return items ordered by created_at DESC", async () => {
            // Limpar banco antes do teste
            await orchestrator.clearDatabase();
            await orchestrator.runPendingMigrations();

            // Criar primeiro item
            const firstItemData = {
                name: "Primeiro Item",
                quantity: 1,
                unit: "unidade",
            };

            await fetch(`http://localhost:3000/api/v1/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(firstItemData),
            });

            // Criar segundo item
            const secondItemData = {
                name: "Segundo Item",
                quantity: 2,
                unit: "unidade",
            };

            await fetch(`http://localhost:3000/api/v1/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(secondItemData),
            });

            // Buscar todos os itens
            const response = await fetch(`http://localhost:3000/api/v1/items`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            expect(response.status).toBe(200);

            const responseBody = await response.json();
            expect(responseBody).toHaveLength(2);

            // Verificar se está ordenado por created_at DESC (mais recente primeiro)
            const firstReturnedItem = responseBody[0];
            const secondReturnedItem = responseBody[1];

            expect(firstReturnedItem.name).toBe("Segundo Item");
            expect(secondReturnedItem.name).toBe("Primeiro Item");

            // Verificar se as datas estão em ordem decrescente
            const firstItemDate = new Date(firstReturnedItem.created_at);
            const secondItemDate = new Date(secondReturnedItem.created_at);
            expect(firstItemDate.getTime()).toBeGreaterThanOrEqual(
                secondItemDate.getTime(),
            );
        });
    });
});
