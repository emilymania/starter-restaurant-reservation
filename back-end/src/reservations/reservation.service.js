const { select, first } = require('../db/connection');
const knex = require('../db/connection');
const reservationsTable = knex("reservations");

/*
//GET /:reservation_id
function read(reservation_id){
  return knex(reservationTable)
  .returning('*')
  .where({resevation_id})
  .first();
}
//PUT /:resevation_id
function update(updatedReservation){
  return knex(reservationTable)
  .select('*')
  .where({reservation_id:updatedReservation.id})
  .update(updatedReservation, '*');
}
//DELETE /:reservation_id
function destroy(reservation_id){
  return knex(reservationTable)
  .where({reservation_id})
  .del();
}
*/
//POST /reservations
function create(reservation){
  return reservationsTable
  .insert(reservation)
  .returning('*')
  .then((createdRecords) => {
    return createdRecords[0];
  }).catch(console.log);
}

/*//GET /reservations
function list() {
  return reservationTable
  .select("*")
  .then(console.log);
}
//GET /dashboard?date='YYYY-MM-DD'
function getReservationOnDate(reservation_date) {
  console.log(reservation_date)
  const reservationDate = new Date(reservation_date).toISOString();
  console.log(reservationDate)
  return reservationTable
  .select('*')
  .then(console.log)*/

// GET /dashboard
function list() {
  return reservationsTable
    .select('*')
}
//GET /dashboard?date='YYYY-MM-DD'
function getReservationOnDate(reservation_date) {
return reservationsTable
    .select('*')
    .where({reservation_date})
    .first();
}
module.exports = {
  create,
  list,
  getReservationOnDate
}