exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.text('mobile_number').notNullable();
    table.date('reservation_date').notNullable();
    table.time('reservation_time').notNullable();
    table.integer('people').defaultTo(1).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
