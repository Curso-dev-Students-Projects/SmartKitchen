import database from "infra/database";
import retry from "async-retry";
import migrator from "models/migrator.js";

async function waitForAllServices() {
    await waitForWebServer();

    async function waitForWebServer() {
        return retry(fetchStatusPage, {
            retries: 100,
            maxTimeout: 1000,
        });

        async function fetchStatusPage() {
            const response = await fetch("http://localhost:3000/api/v1/status");

            if (response.status !== 200) {
                throw Error();
            }
        }
    }
}

async function clearDatabase() {
    await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

async function runPendingMigrations() {
    await migrator.runPendingMigrations();
}

async function createItem(
    name = "teste-item",
    quantity = 1,
    unit = "unidades",
    expiration_date = "2025-01-01",
    category = "Outros",
) {
    const { rows } = await database.query({
        text: `
            INSERT INTO items (name, quantity, unit, expiration_date, category)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `,
        values: [name, quantity, unit, expiration_date, category],
    });

    return rows[0].id;
}

const orchestrator = {
    waitForAllServices,
    clearDatabase,
    runPendingMigrations,
    createItem,
};
export default orchestrator;
