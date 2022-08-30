const knex = require('../db/connection');
const reservationTable = "reservations";

// GET /dashboard
function list() {
    return knex(reservationTable).select('*');
}
//GET /dashboard?date='YYYY-MM-DD'
function getReservationOnDate(reservation_date) {
  return knex(reservationTable)
      .select('*')
      .where({reservation_date})
      .groupBy('reservation_date');
}
module.exports ={
    list,
    getReservationOnDate,
}