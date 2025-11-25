import itemRepository from "./item.repository.js";
import { ValidationError } from "infra/errors.js";

async function create(itemData) {
    const validatedData = validateItemData(itemData);
    return await itemRepository.create(validatedData);
}

async function list() {
    return await itemRepository.list();
}

async function remove(requestQuery) {
    const validatedId = validateUUID("id", requestQuery.id);
    return await itemRepository.remove(validatedId);
}

function validateItemData(data) {
    if (!data || typeof data !== "object") {
        throw new ValidationError({
            message: '"body" must be an Object.',
        });
    }

    if (!data.name) {
        throw new ValidationError({
            message: '"name" is required.',
        });
    }

    if (typeof data.name !== "string") {
        throw new ValidationError({
            message: '"name" must be a String.',
        });
    }

    const trimmedName = data.name.trim();

    if (trimmedName.length === 0) {
        throw new ValidationError({
            message: '"name" cannot be blank.',
        });
    }

    if (trimmedName.length > 100) {
        throw new ValidationError({
            message: '"name" must be at most 100 characters.',
        });
    }

    if (data.quantity === undefined || data.quantity === null) {
        throw new ValidationError({
            message: '"quantity" is required.',
        });
    }

    if (typeof data.quantity !== "number" || !Number.isInteger(data.quantity)) {
        throw new ValidationError({
            message: '"quantity" must be an Integer.',
        });
    }

    if (data.quantity < 0) {
        throw new ValidationError({
            message: '"quantity" must be a positive number.',
        });
    }

    if (!data.unit) {
        throw new ValidationError({
            message: '"unit" is required.',
        });
    }

    if (typeof data.unit !== "string") {
        throw new ValidationError({
            message: '"unit" must be a String.',
        });
    }

    const trimmedUnit = data.unit.trim();

    if (trimmedUnit.length === 0) {
        throw new ValidationError({
            message: '"unit" cannot be blank.',
        });
    }

    if (trimmedUnit.length > 50) {
        throw new ValidationError({
            message: '"unit" must be at most 50 characters.',
        });
    }

    if (data.expiration_date !== undefined && data.expiration_date !== null) {
        if (typeof data.expiration_date !== "string") {
            throw new ValidationError({
                message: '"expiration_date" must be a String.',
            });
        }

        const date = new Date(data.expiration_date);
        if (isNaN(date.getTime())) {
            throw new ValidationError({
                message: '"expiration_date" must be a valid ISO 8601 date.',
            });
        }
    }

    if (data.category_id !== undefined && data.category_id !== null) {
        if (typeof data.category_id !== "string") {
            throw new ValidationError({
                message: '"category_id" must be a String.',
            });
        }

        validateUUID("category_id", data.category_id);
    }

    return {
        name: trimmedName,
        quantity: data.quantity,
        unit: trimmedUnit,
        expiration_date: data.expiration_date || null,
        category_id: data.category_id || null,
    };
}

function validateUUID(atributeName, id) {
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
        throw new ValidationError({
            message: `"${atributeName}" must be a valid UUID.`,
            action: "Insira um UUID válido.",
        });
    }

    return id;
}

const item = {
    create,
    remove,
    list,
};

export default item;