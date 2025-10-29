import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import item from "models/item.js";

const router = createRouter();

router.get(getItemsHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getItemsHandler(request, response) {
    const items = await item.list();
    response.status(200).json(items);
}

async function postHandler(request, response) {
    const newItem = await item.create(request.body);
    response.status(201).json(newItem);
}
