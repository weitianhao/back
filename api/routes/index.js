var express = require('express');
var router = express.Router();
const query = require('../config/db_connect')
/* GET home page. */
router.get('/', function(req, res, next) {
  const sql = 'select * from apilist'
  query(sql).then((rows) => {
    res.send(rows)
  })
});

module.exports = router;
