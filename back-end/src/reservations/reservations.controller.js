/**
 * List handler for reservation resources
 */
const service = require("./reservation.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require('../errors/hasProperties');
const requestHasRequiredProperties = hasProperties(["first_name","last_name",
                                                        "mobile_number", "people", 
                                                        "reservation_date","reservation_time"]);


/*
ROUTE HANDLERS



//GET /:reservation_id
function read(req, res, next){
  service.read(res.locals.reservation.reservation_id)
}

//PUT /:reservation_id
function update(req, res, next) {
  const updatedResrvation = {
    ...req.body.data,
    resrvation_id: res.locals.resrvation.resrvation_id,
  };
  service
    .update(updatedReservation)
    .then((data) => res.json({ data }))
    .catch(next);
}

//DELETE /:reservation_id
function destroy(_req, res, _next) {
  const { reservation_id } = res.locals.reservation;
  service.delete(reservation_id).then(res.sendStatus(204));
}


VALIDATION MIDDLEWARE BELOW

function reservationExists(req, res, next) {
  service
    .read(req.params.reservation_id)
    .then((reservation) => {
      if (reservation) {
        res.locals.reservation = reservation;
        return next();
      }
      next({ status: 404, message: `Reservation cannot be found.` });
    })
    .catch(next);
}
*/



//POST/reservation
async function create(req, res) {
  const data = await service.create(res.locals.reservation);
  res.status(201).json({ data });
}
// GET /reservation
async function list(req, res) {
  const {date} = req.query;
  if (date) {
    console.log(date);
    // GET /dashoboard?date=YYYY-MM-DD
    const data = await service.getReservationOnDate(date);
    console.log(data);
    return res.json({data });
  }
  // GET /dashboard
  const data = await service.list();
  res.json({data });
}

/*
MIDDLEWARE
*/

function hasValidProperties(req, res, next){
  const {reservation_date, people, reservation_time} = req.body.data;
  const reservationday = new Date(reservation_date);
    try{
      if(!(typeof people === "number")){
        const partyTypeError = new Error(`The property 'people' is not of type 'Number'!`);
        partyTypeError.status = 400;
        throw partyTypeError;
      }
      if(!/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(reservation_time)){
        const timeTypeError = new Error(`The property 'reservation_time' is not of type 'Time'!`);
        timeTypeError.status = 400;
        throw timeTypeError;
      }
      if(reservationday === 'Invalid Date' || isNaN(reservationday)){
        const dateTypeError = new Error(`The property 'reservation_date' is not of type 'Date'!`);
        dateTypeError.status = 400;
        throw dateTypeError;
      }else{
        res.locals.reservation = req.body.data;
        res.locals.reservation.reservation_date = reservationday.toISOString();
        next();
      }
  }catch(error){
    next(error);
  }
}

module.exports = {
  create: [requestHasRequiredProperties, hasValidProperties, asyncErrorBoundary(create)],
  list:asyncErrorBoundary(list),
  
};
