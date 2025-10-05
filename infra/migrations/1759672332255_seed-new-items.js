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
	// Executa só se a tabela existir (defesa contra ordem errada)
	pgm.sql(`
        DO $$
        BEGIN
        IF EXISTS (
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'items'
        ) THEN
            INSERT INTO items (name, quantity, unit, expiration_date, category_id, deleted_at)
            VALUES
            ('Arroz Integral 1kg', 2, 'pacote', '2025-06-01 00:00:00', 1, '2025-09-20 15:30:00'),
            ('Leite Desnatado 1L', 6, 'caixa',  '2025-05-10 00:00:00', 2, '2025-09-25 09:00:00'),
            ('Feijão Carioca 1kg', 3, 'pacote', '2025-08-20 00:00:00', 1, '2025-09-27 18:10:00'),
            ('Macarrão Parafuso 500g', 4, 'pacote', '2025-07-15 00:00:00', 1, '2025-09-28 12:05:00'),
            ('Óleo de Soja 900ml', 2, 'garrafa','2026-01-10 00:00:00', 3, '2025-09-29 08:45:00'),
            ('Açúcar Cristal 1kg', 1, 'pacote', '2026-03-05 00:00:00', 1, '2025-10-01 10:20:00'),
            ('Sal Refinado 1kg', 2, 'pacote', '2026-04-01 00:00:00', 1, '2025-10-01 11:05:00'),
            ('Café Torrado 500g', 2, 'pacote', '2025-12-01 00:00:00', 4, '2025-10-02 09:40:00'),
            ('Molho de Tomate 340g', 5, 'un', '2025-11-15 00:00:00', 5, '2025-10-02 14:32:00'),
            ('Farinha de Trigo 1kg', 2, 'pacote', '2025-12-20 00:00:00', 1, '2025-10-03 16:55:00'),
            ('Atum em Lata 170g', 3, 'lata', '2026-02-10 00:00:00', 6, '2025-10-03 21:10:00'),
            ('Biscoito Cream Cracker', 6, 'pacote', '2025-10-30 00:00:00', 7, '2025-10-04 07:25:00');
        END IF;
        END;
        $$;
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	// Remove apenas os registros inseridos por esta seed
	pgm.sql(`
    DELETE FROM items
    WHERE (name, quantity, unit, expiration_date, category_id, deleted_at) IN (
      ('Arroz Integral 1kg',      2, 'pacote', '2025-06-01 00:00:00', 1, '2025-09-20 15:30:00'),
      ('Leite Desnatado 1L',      6, 'caixa',  '2025-05-10 00:00:00', 2, '2025-09-25 09:00:00'),
      ('Feijão Carioca 1kg',      3, 'pacote', '2025-08-20 00:00:00', 1, '2025-09-27 18:10:00'),
      ('Macarrão Parafuso 500g',  4, 'pacote', '2025-07-15 00:00:00', 1, '2025-09-28 12:05:00'),
      ('Óleo de Soja 900ml',      2, 'garrafa','2026-01-10 00:00:00', 3, '2025-09-29 08:45:00'),
      ('Açúcar Cristal 1kg',      1, 'pacote', '2026-03-05 00:00:00', 1, '2025-10-01 10:20:00'),
      ('Sal Refinado 1kg',        2, 'pacote', '2026-04-01 00:00:00', 1, '2025-10-01 11:05:00'),
      ('Café Torrado 500g',       2, 'pacote', '2025-12-01 00:00:00', 4, '2025-10-02 09:40:00'),
      ('Molho de Tomate 340g',    5, 'un',     '2025-11-15 00:00:00', 5, '2025-10-02 14:32:00'),
      ('Farinha de Trigo 1kg',    2, 'pacote', '2025-12-20 00:00:00', 1, '2025-10-03 16:55:00'),
      ('Atum em Lata 170g',       3, 'lata',   '2026-02-10 00:00:00', 6, '2025-10-03 21:10:00'),
      ('Biscoito Cream Cracker',  6, 'pacote', '2025-10-30 00:00:00', 7, '2025-10-04 07:25:00')
    );
  `);
};
