import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import itemValidator from "models/item/itemValidator.js";

const router = createRouter();

router.delete(deleteHandler);

export default router.handler(controller.errorHandlers);

async function deleteHandler(request, response) {
    await itemValidator.remove(request.query);
    response.status(204).end();
}
