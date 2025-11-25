import database from "infra/database.js";
import { NotFoundError, ServiceError } from "infra/errors.js";

async function create(validatedItemData) {
    const query = {
        text: `
            INSERT INTO items (name, quantity, unit, expiration_date, category_id)
            VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
        `,
        values: [
            validatedItemData.name,
            validatedItemData.quantity,
            validatedItemData.unit,
            validatedItemData.expiration_date || null,
            validatedItemData.category_id || null,
        ],
    };

    const result = await database.query(query);
    return result.rows[0];
}

async function list() {
    try {
        const query = {
            text: `
                SELECT
                    id,
                    name,
                    quantity,
                    unit,
                    expiration_date,
                    category_id,
                    created_at,
                    updated_at
                FROM
                    items
                ORDER BY
                    created_at DESC;
            `,
        };

        const result = await database.query(query);
        return result.rows;
    } catch (error) {
        throw new ServiceError({
            message: "Erro ao buscar lista de itens.",
            cause: error,
        });
    }
}

async function remove(id) {
    const query = {
        text: `DELETE
               FROM items
               WHERE id = $1`,
        values: [id],
    };

    const result = await database.query(query);

    if (result.rowCount === 0) {
        throw new NotFoundError({
            message: `Item with id ${result.rowCount} not found`,
        });
    }

    return true;
}

const itemReository = {
    create,
    list,
    remove,
};

export default itemReository;
