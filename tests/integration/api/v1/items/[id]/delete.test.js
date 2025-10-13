// tests/integration/api/v1/items/[id]/delete.test.js
import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";
import crypto from "node:crypto";

const BASE_URL = "http://localhost:3000";

// pequena fábrica de item só pra estes testes
async function createItem(attrs = {}) {
    const name = attrs.name ?? "Tmp";
    const quantity = attrs.quantity ?? 1;
    const unit = attrs.unit ?? "Un";
    const expiration = attrs.expiration_date ?? null;
    const category = attrs.category_id ?? null;

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

describe("DELETE /api/v1/items/:id (hard delete)", () => {
    test("204 and record is removed from the database (hard delete)", async () => {
        const id = await createItem();

        const res = await fetch(`${BASE_URL}/api/v1/items/${id}`, {
            method: "DELETE",
        });
        expect(res.status).toBe(204);

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
        const res = await fetch(`${BASE_URL}/api/v1/items/${nonexistent}`, {
            method: "DELETE",
        });
        expect(res.status).toBe(404);
    });
});
