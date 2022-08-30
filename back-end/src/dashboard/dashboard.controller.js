const { as } = require("../db/connection");

const service = require("./dashboard.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/*
REQUEST HANDLERS
*/
//GET /Dashboard
async function list(req, res, _next) {
    const {date} = req.query;
    console.log(date);
    if (date) {
      // GET /dashoboard?date=YYYY-MM-DD
      const data = await service.getReservationOnDate(date);
      return res.json({ data });
    }
    // GET /dashboard
    const data = await service.list();
    res.json({ data });
  }

  module.exports = {list: asyncErrorBoundary(list),}

  