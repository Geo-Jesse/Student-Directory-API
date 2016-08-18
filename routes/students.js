var express = require('express');
var router = express.Router();
var Student = require('../models/Student')
const _ = require('lodash');

router.use(function (req, res, next) {
  req.body = _.pick(req.body, ['firstName', 'lastName', 'salary', 'bonusPoints'])
  next()
})


router.get('/', function(req, res, next) {
  Student.find({}, function(err, students) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(students)
    }
  })
});

module.exports = router;
