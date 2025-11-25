import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import itemValidator from "models/item/itemValidator.js";

const router = createRouter();

router.get(getItemsHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getItemsHandler(request, response) {
    const items = await itemValidator.list();
    response.status(200).json(items);
}

async function postHandler(request, response) {
    const newItem = await itemValidator.create(request.body);
    response.status(201).json(newItem);
}
