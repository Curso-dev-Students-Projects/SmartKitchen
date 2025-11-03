// tests/integration/api/v1/items/[id]/delete.test.js
import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";
import crypto from "node:crypto";

const BASE_URL = "http://localhost:3000";

async function createItem(itemData = {}) {
    const name = itemData.name ?? "Tmp";
    const quantity = itemData.quantity ?? 1;
    const unit = itemData.unit ?? "Un";
    const expiration = itemData.expiration_date ?? null;
    const category = itemData.category_id ?? null;

    const { rows } = await database.query({
        text: `
        INSERT INTO items (name, quantity, unit, expiration_date, category_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
    `,
        values: [name, quantity, unit, expiration, category],
    });

    return rows[0].id;
}

beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await orchestrator.clearDatabase();

    const { execSync } = await import("node:child_process");
    execSync("npm run migrations:up", { stdio: "inherit" });
}, 120000);

afterAll(async () => {
    await database.end?.();
});

describe("DELETE /api/v1/items/:id", () => {
    describe("Removing items", () => {
        test("Record is removed from the database: 204", async () => {
            const itemId = await createItem();

            const response = await fetch(`${BASE_URL}/api/v1/items/${itemId}`, {
                method: "DELETE",
            });
            expect(response.status).toBe(204);

            const checkQueryResult = await database.query({
                text: "SELECT 1 FROM items WHERE id = $1",
                values: [itemId],
            });
            expect(checkQueryResult.rows.length).toBe(0);
        });

        test("delete twice: 404", async () => {
            const itemId = await createItem();

            const firstRequestResult = await fetch(
                `${BASE_URL}/api/v1/items/${itemId}`,
                {
                    method: "DELETE",
                },
            );
            expect(firstRequestResult.status).toBe(204);

            const secondRequestResult = await fetch(
                `${BASE_URL}/api/v1/items/${itemId}`,
                {
                    method: "DELETE",
                },
            );
            expect(secondRequestResult.status).toBe(404);
        });

        test("non-existent UUID: 404", async () => {
            const nonExistentId = crypto.randomUUID();
            const response = await fetch(
                `${BASE_URL}/api/v1/items/${nonExistentId}`,
                {
                    method: "DELETE",
                },
            );
            expect(response.status).toBe(404);
        });

        test("invalid id (non UUID type): 400", async () => {
            const invalidUUID = `13`;
            const response = await fetch(
                `${BASE_URL}/api/v1/items/${invalidUUID}`,
                {
                    method: "DELETE",
                },
            );
            expect(response.status).toBe(400);
        });
    });
});
