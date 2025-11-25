import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import item from "models/item.validator.js";

const router = createRouter();

router.delete(deleteHandler);

export default router.handler(controller.errorHandlers);

async function deleteHandler(request, response) {
    await item.remove(request.query);
    response.status(204).end();
}
