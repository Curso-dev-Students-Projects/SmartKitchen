exports.shorthands = {};

exports.up = (pgm) => {
    pgm.createType(
        "item_category_enum",

        [
            "Laticínios",
            "Temperos",
            "Carnes e Aves",
            "Peixes e Frutos do Mar",
            "Frutas",
            "Legumes e Verduras",
            "Grãos e Cereais",
            "Congelados",
            "Padaria",
            "Bebidas",
            "Outros",
        ],
    );

    pgm.addColumn("items", {
        category: {
            type: "item_category_enum",
            notNull: true,
            default: "Outros",
        },
    });

    pgm.dropColumn("items", "category_id");

    pgm.alterColumn("items", "category", { default: null });
};

exports.down = (pgm) => {
    pgm.addColumn("items", {
        category_id: {
            type: "uuid",
            notNull: false,
        },
    });

    pgm.dropColumn("items", "category");

    pgm.dropType("item_category_enum");
};
