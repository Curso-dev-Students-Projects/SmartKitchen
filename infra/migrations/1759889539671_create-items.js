exports.up = (pgm) => {
    pgm.createTable("items", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        //In Postgres, varchar(X) does not define memory. 100 characters just as a commom sense check constraint.
        name: {
            type: "varchar(100)",
            notNull: true,
        },

        quantity: {
            type: "integer",
            notNull: true,
        },

        unit: {
            type: "varchar(50)",
            notNull: true,
        },

        expiration_date: {
            type: "timestamptz",
            notNull: false,
        },

        //The foreign key constraint will be added in a future migration,
        //after the 'categories' table is created.
        category_id: {
            type: "uuid",
            notNull: false,
        },

        //Why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("timezone('utc', now())"),
        },

        updated_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("timezone('utc', now())"),
        },
    });
};

exports.down = false;
