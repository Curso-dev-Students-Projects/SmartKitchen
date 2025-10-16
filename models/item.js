import database from "infra/database";
import { NotFoundError, ValidationError } from "infra/errors";

/**
 * Deleta um item, através do ID
 * @return {Promise<boolean>} true se deletou corretamente, false se não encontrou
 * @param requestQuery
 */
export async function remove(requestQuery) {
    const validatedId = validateId(requestQuery.id);

    const query = {
        text: `DELETE
               FROM items
               WHERE id = $1`,
        values: [validatedId],
    };

    const result = await database.query(query);

    if (result.rowCount === 0) {
        throw new NotFoundError({
            message: `Item with id ${result.rowCount} not found`,
        });
    }

    return true;
}

function validateId(id) {
    // Não entra nunca nessa validação, por isso tiramos
    // if (!id) {
    //     throw new ValidationError({
    //         message: 'id is required',
    //     });
    // }

    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
        throw new ValidationError({
            message: "invalid item id format (expected UUID)",
            action: "Insira um ID válido no formato UUID",
        });
    }

    return id;
}
