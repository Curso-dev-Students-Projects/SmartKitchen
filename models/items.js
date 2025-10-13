import database from "../infra/database";

/**
 * Deleta um item, através do ID
 * @param {string} id
 * @return {Promise<boolean>} true se deletou corretamente, false se não encontrou
 */
export async function removeItemById(id) {
    const queryObj = {
        text: "DELETE FROM items WHERE id=$1",
        values: [id],
    };

    const result = await database.query(queryObj);
    return result.rowCount > 0;
}
