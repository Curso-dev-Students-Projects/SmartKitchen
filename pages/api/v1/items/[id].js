import { removeItemById } from "../../../../models/items";

async function handleDELETE(req, res) {
    // Le o id da rota (recebe os parâmetros da rota dinâmica)
    // Ex.: para /api/v1/items/abc, req.query.id === 'abc';
    // mas para /api/v1/items/a/b, id vem como string[ ]
    // Por isso, precisa fazer uma normalização
    const id = req.query;

    // Normaliza o valor, garantindo q o array seja sempre uma
    // string ou undefined
    const item = Array.isArray(id) ? id[0] : id;

    // Verificar a presença de um id (se n foi undefined/null/string vazia)
    if (!item.id) {
        return res.status(400).json({ error: "Item Id is required" });
    }

    try {
        // Chama o modelo para fazer a exclusão, passando o id
        // true se tiver deletado ok, false se nao encontrou esse id
        const deleteResult = await removeItemById(item.id);

        // Se for not found, erro:
        if (!deleteResult) {
            return res.status(404).json({ error: "Item not found" });
        }

        // Achei desnecessário uma mensagem aqui, pq só deletamos.
        // return res.status(200).json({ message: "Item deleted successfully" });
        return res.status(204).end();
    } catch (error) {
        // Para pegar algum erro inesperado
        console.error("DELETE /api/v1/items/:id error", error);
        return res.status(500).json({ error: "Something went wrong..." });
    }
}

export default async function handler(req, res) {
    // Verifica se o verbo HTTP é delete
    if (req.method == "DELETE") {
        return handleDELETE(req, res);
    } else {
        // garante que não saia daqui (não faça mais nada)
        res.setHeader("Allow", "DELETE");
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}
