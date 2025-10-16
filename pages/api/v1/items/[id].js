import { createRouter } from "next-connect";
import controller from "infra/controller";
import { remove } from "models/item";
const router = createRouter();

export default router.handler(controller.errorHandlers);

router.delete(deleteHandler);

async function deleteHandler(request, response) {
    await remove(request.query);
    response.status(204).end();
}
