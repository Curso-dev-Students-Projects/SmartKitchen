// tests/integration/api/v1/items/[id]/delete.test.js
import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";
import crypto from "node:crypto";

const BASE_URL = "http://localhost:3000";

// pequena fábrica de item só para estes testes
async function createItem(attributes = {}) {
    const name = attributes.name ?? "Tmp";
    const quantity = attributes.quantity ?? 1;
    const unit = attributes.unit ?? "Un";
    const expiration = attributes.expiration_date ?? null;
    const category = attributes.category_id ?? null;

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
        test("204 and record is removed from the database (hard delete)", async () => {
            const id = await createItem();

            const response = await fetch(`${BASE_URL}/api/v1/items/${id}`, {
                method: "DELETE",
            });
            expect(response.status).toBe(204);

            const check = await database.query({
                text: "SELECT 1 FROM items WHERE id = $1",
                values: [id],
            });
            expect(check.rows.length).toBe(0);
        });

        test("delete twice: second returns 404", async () => {
            const id = await createItem();

            const first = await fetch(`${BASE_URL}/api/v1/items/${id}`, {
                method: "DELETE",
            });
            expect(first.status).toBe(204);

            const second = await fetch(`${BASE_URL}/api/v1/items/${id}`, {
                method: "DELETE",
            });
            expect(second.status).toBe(404);
        });

        test("non-existent UUID: 404", async () => {
            const nonexistent = crypto.randomUUID();
            const response = await fetch(
                `${BASE_URL}/api/v1/items/${nonexistent}`,
                {
                    method: "DELETE",
                },
            );
            expect(response.status).toBe(404);
        });

        test("invalid id (non UUID type): 404", async () => {
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
