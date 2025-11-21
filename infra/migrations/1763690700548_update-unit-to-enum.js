/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    // 1. Criar o ENUM
    pgm.createType("unit_enum", [
        "unidades",
        "gramas",
        "kg",
        "ml",
        "litros",
        "pacotes",
        "caixas",
        "latas",
    ]);

    // 2. Alterar a coluna unit para usar o ENUM
    pgm.alterColumn("items", "unit", {
        type: "unit_enum",
        using: "unit::unit_enum",
    });
};
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    // rollback (voltar atrás), caso precise desfazer

    // 1. Alterar de volta para VARCHAR
    pgm.alterColumn("items", "unit", {
        type: "varchar(50)",
    });

    // 2. Remover o ENUM
    pgm.dropType("unit_enum");
};
